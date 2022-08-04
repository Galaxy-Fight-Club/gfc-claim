<script lang="ts">
    import { Contract } from "ethers";

    export let provider;
    export let signer;

    const proofUrl: string = import.meta.env.VITE_PROOF_URL;

    let error: string = '';

    async function claim(address: string) {
        try {
            const proofResponse = await fetch(proofUrl + address);
            const proofData = await proofResponse.json();

            if (proofData.hasOwnProperty('totalBalance') === false) {
                error = 'Could not load claimable GCOIN';

                return;
            }

            const contract = new Contract(import.meta.env.VITE_CONTRACT, ['function claim(uint256 totalBalance, bytes32[] calldata proof) external'], signer);

            await contract.claim(proofData.totalBalance, proofData.proof);
        } catch (e) {
            if (
                (e.hasOwnProperty('message') && e.message.includes('User denied transaction signature')) ||
                e.includes('User rejected the transaction')
            ) {
                return;
            }

            console.error(e);
            error = 'Could not load claimable GCOIN';
        }
    }
</script>

{#await signer.getAddress()}
    <button>Waiting...</button>
{:then address}
    {#if error !== ''}
        <button class="btn btn-outline-danger">{error}</button>
    {:else}
        <button class="btn btn-outline-primary" on:click={claim(address)}>Claim</button>
    {/if}
{/await}