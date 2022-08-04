<script lang="ts">
    import { ethers } from "ethers";
    import Web3Modal from "web3modal";
    import WalletConnectProvider from "@walletconnect/web3-provider";

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

    async function connect() {
        const instance = await web3Modal.connect();

        if (instance.chainId !== '0x89') {
            await instance.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x89' }]
            });
        }

        provider = new ethers.providers.Web3Provider(instance);
        signer = provider.getSigner();
    }
</script>

{#if signer !== undefined}
    <slot></slot>
{:else}
    <button class="btn btn-outline-primary" on:click={connect}>Connect</button>
{/if}