import Vue from 'vue';
import Vuex from 'vuex';
import { getParsedNftAccountsByOwner } from '@nfteyez/sol-rayz';
import axios from 'axios';
import { host } from '@/config';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import {
  GemBankClient,
  GemFarmClient,
  GEM_BANK_PROG_ID,
  GEM_FARM_PROG_ID,
} from '@gemworks/gem-farm-ts';
import bankIdl from '@/assets/gem_bank.json';
import farmIdl from '@/assets/gem_farm.json';
import { createFakeWallet } from '@/utils/wallets';
import { getStakedNFTs } from '@/utils/nfts';

// Init
Vue.use(Vuex);

const connection = new Connection(
  clusterApiUrl('mainnet-beta'),
  'confirmed',
);

// -> Farm IDs
// --> This is temporary - as we get more creators, this will be replaced with a call to backend
const farmIds = ['AuHnvdxt1SkLgRj9yiLVUYiYajk3MjGQpX9WsLEgr3F9'];

const farmClient = new GemFarmClient(
  connection,
  createFakeWallet(),
  // @ts-ignore
  farmIdl,
  GEM_FARM_PROG_ID,
  bankIdl,
  GEM_FARM_PROG_ID,
);

const bankClient = new GemBankClient(
  connection,
  createFakeWallet(),
  // @ts-ignore
  bankIdl,
  GEM_BANK_PROG_ID,
);

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: ({
        onlyIfTrusted,
      }?: {
        onlyIfTrusted: boolean;
      }) => Promise<{
        publicKey: PublicKey;
      }>;
      disconnect: () => Promise<void>;
      signMessage: (
        encodedMessage: Uint8Array,
        encoding: 'utf8' | 'hex' | 'base64',
      ) => Promise<{
        publicKey: PublicKey;
        signature: Uint8Array;
      }>;
    };
  }
}

export default new Vuex.Store({
  state: {
    snackbar: false,
    snackbarMessage: '',
    discordUser: {
      avatar: '',
      banner: '',
      discriminator: '',
      flags: 0,
      id: '',
      locale: '',
      mfa_enabled: false,
      premium_type: 0,
      public_flags: 0,
      username: '',
    },
    user: {
      discordId: '',
      publicKey: '',
    },
    wallet: {
      publicKey: '',
      loading: false,
      nfts: [] as Array<{
        name: string;
        symbol: string;
        mint: string;
        updateAuthority: string;
        arweaveURI: string;
        image: string;
        staked: boolean;
      }>,
    },
  },
  mutations: {
    displaySnackbar(state, payload) {
      if (typeof payload === 'string') {
        state.snackbarMessage = payload;
        state.snackbar = true;
      } else {
        state.snackbarMessage = payload.message;
        state.snackbar = payload.display;
      }
    },
    setDiscordUser(state, payload) {
      state.discordUser = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setWallet(state, payload) {
      state.wallet = payload;
    },
    setWalletLoading(state, loading: boolean) {
      state.wallet.loading = loading;
    },
    addNFTs(state, { nfts }) {
      state.wallet.nfts.push(...nfts);
    },
  },
  actions: {
    async connectWalletEager({ commit }) {
      if (!window.solana) return;

      try {
        const resp = await window.solana.connect({ onlyIfTrusted: true });

        commit('setWalletLoading', true);

        const nftArray = await getParsedNftAccountsByOwner({
          publicAddress: resp.publicKey.toString(),
        });

        const arweave = (
          await Promise.all(nftArray.map((nft) => axios.get(nft.data.uri)))
        ).map(({ data }) => data);

        commit('setWallet', {
          publicKey: resp.publicKey.toString(),
          loading: true,
          nfts: nftArray.map((nft) => ({
            name: nft.data.name,
            symbol: nft.data.symbol,
            mint: nft.mint,
            updateAuthority: nft.updateAuthority,
            arweaveURI: nft.data.uri,
            image: arweave.find((ar) => ar.name === nft.data.name)?.image,
            staked: false,
          })),
        });

        // -> Get staked NFTs
        const stakedNFTs = (
          await Promise.all(
            farmIds.map((f) =>
              getStakedNFTs(
                connection,
                farmClient,
                bankClient,
                new PublicKey(f),
                resp.publicKey,
              ),
            ),
          )
        ).flat();

        console.time('Fetch Arweave Staked NFTS');
        const arweaveStaked = (
          await Promise.all(
            stakedNFTs.map((nft) => axios.get(nft.data.uri)),
          )
        ).map(({ data }) => data);
        console.timeEnd('Fetch Arweave Staked NFTS');

        commit('addNFTs', {
          nfts: stakedNFTs.map((nft) => ({
            name: nft.data.name,
            symbol: nft.data.symbol,
            mint: nft.mint,
            updateAuthority: nft.updateAuthority,
            arweaveURI: nft.data.uri,
            image: arweaveStaked.find((ar) => ar.name === nft.data.name)
              ?.image,
            staked: true,
          })),
        });

        commit('setWalletLoading', false);
      } catch (e) {
        console.error(e);
      }
    },
    async connectWallet({ commit }) {
      // -> If no wallet
      if (!window.solana)
        return window.open('https://phantom.app/', '_blank');

      if (window.solana.isPhantom) {
        const resp = await window.solana.connect();

        const nftArray = await getParsedNftAccountsByOwner({
          publicAddress: resp.publicKey.toString(),
        });

        const arweave = (
          await Promise.all(nftArray.map((nft) => axios.get(nft.data.uri)))
        ).map(({ data }) => data);

        commit('setWallet', {
          publicKey: resp.publicKey.toString(),
          loading: true,
          nfts: nftArray.map((nft) => ({
            name: nft.data.name,
            symbol: nft.data.symbol,
            mint: nft.mint,
            updateAuthority: nft.updateAuthority,
            arweaveURI: nft.data.uri,
            image: arweave.find((ar) => ar.name === nft.data.name)?.image,
          })),
        });

        // -> Get staked NFTs
        const stakedNFTs = (
          await Promise.all(
            farmIds.map((f) =>
              getStakedNFTs(
                connection,
                farmClient,
                bankClient,
                new PublicKey(f),
                resp.publicKey,
              ),
            ),
          )
        ).flat();

        console.time('Fetch Arweave Staked NFTS');
        const arweaveStaked = (
          await Promise.all(
            stakedNFTs.map((nft) => axios.get(nft.data.uri)),
          )
        ).map(({ data }) => data);
        console.timeEnd('Fetch Arweave Staked NFTS');

        commit('addNFTs', {
          nfts: stakedNFTs.map((nft) => ({
            name: nft.data.name,
            symbol: nft.data.symbol,
            mint: nft.mint,
            updateAuthority: nft.updateAuthority,
            arweaveURI: nft.data.uri,
            image: arweaveStaked.find((ar) => ar.name === nft.data.name)
              ?.image,
            staked: true,
          })),
        });

        commit('setWalletLoading', false);
      }
    },
    async disconnectWallet({ commit }) {
      if (!window.solana) return;

      try {
        await window.solana.disconnect();

        commit('setWallet', {
          publicKey: '',
          nfts: [],
        });
      } catch (e) {
        console.error(e);
      }
    },
    async verifyWallet({ commit }) {
      const token = localStorage.getItem('ANIMU_USER_TOKEN');
      if (!window.solana || !token) return;

      try {
        const message = 'Sign below to verify your wallet ≧◡≦';
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await window.solana.signMessage(
          encodedMessage,
          'utf8',
        );

        console.log({ signedMessage });

        try {
          const { data } = await axios.post(
            `${host}/users/verify`,
            {
              publicKey: Array.from(signedMessage.publicKey.toBytes()),
              signature: Array.from(signedMessage.signature),
            },
            {
              headers: {
                'x-access-token': token,
              },
            },
          );

          console.log({ data });

          commit('setUser', data.user);
          commit('displaySnackbar', 'Wallet verified!');
        } catch (e) {
          console.error(e);
          commit('displaySnackbar', 'Invalid signature');
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
  modules: {},
});
