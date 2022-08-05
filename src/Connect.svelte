<script lang="ts">
    import { ethers } from "ethers";
    import Web3Modal from "web3modal";
    import WalletConnectProvider from "@walletconnect/web3-provider";
    import * as Sentry from "@sentry/browser";

    const web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    rpc: {
                        137: import.meta.env.VITE_JSON_RPC_PROVIDER,
                    },
                    infuraId: import.meta.env.VITE_INFURA_ID
                }
            }
        },
        disableInjectedProvider: false
    });

    export let provider;
    export let signer;
    
    let connectButtonText = 'Connect';

    async function connect() {
        const instance = await web3Modal.connect();

        if (instance.chainId !== '0x89') {
            try {
                await instance.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x89' }]
                });
            } catch (e) {
                connectButtonText = 'Please switch to Polygon Mainnet, then connect again';
                return;
            }
        }

        provider = new ethers.providers.Web3Provider(instance);
        signer = provider.getSigner();

        Sentry.setUser({address: await signer.getAddress()});
    }
</script>

{#if signer !== undefined}
    <slot></slot>
{:else}
    <button class="btn btn-outline-primary" on:click={connect}>{connectButtonText}</button>
{/if}