import Vue from 'vue';
import Vuex from 'vuex';
import { getParsedNftAccountsByOwner } from '@nfteyez/sol-rayz';
import axios from 'axios';
import { host } from '@/config';
import { PublicKey } from '@solana/web3.js';

Vue.use(Vuex);

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: ({
        onlyIfTrusted,
      }?: {
        onlyIfTrusted: boolean;
      }) => Promise<{
        publicKey: {
          toString: () => string;
        };
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
      discordID: '',
      publicKey: '',
    },
    wallet: {
      publicKey: '',
      nfts: [] as Array<{
        name: string;
        symbol: string;
        mint: string;
        updateAuthority: string;
        arweaveURI: string;
        image: string;
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
  },
  actions: {
    async connectWalletEager({ commit }) {
      if (!window.solana) return;

      try {
        const resp = await window.solana.connect({ onlyIfTrusted: true });

        const nftArray = await getParsedNftAccountsByOwner({
          publicAddress: resp.publicKey.toString(),
        });

        const arweave = (
          await Promise.all(nftArray.map((nft) => axios.get(nft.data.uri)))
        ).map(({ data }) => data);

        commit('setWallet', {
          publicKey: resp.publicKey.toString(),
          nfts: nftArray.map((nft) => ({
            name: nft.data.name,
            symbol: nft.data.symbol,
            mint: nft.mint,
            updateAuthority: nft.updateAuthority,
            arweaveURI: nft.data.uri,
            image: arweave.find((ar) => ar.name === nft.data.name)?.image,
          })),
        });
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
          nfts: nftArray.map((nft) => ({
            name: nft.data.name,
            symbol: nft.data.symbol,
            mint: nft.mint,
            updateAuthority: nft.updateAuthority,
            arweaveURI: nft.data.uri,
            image: arweave.find((ar) => ar.name === nft.data.name)?.image,
          })),
        });
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
