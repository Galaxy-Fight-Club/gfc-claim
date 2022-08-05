<script lang="ts">
import Connect from "./Connect.svelte";
import Claim from "./Claim.svelte";
import gfcLogo from "./assets/gfc_logo.svg";
import gfcLogoShield from "./assets/gfc_logo_shield.svg";
import githubLogo from "./assets/github_logo.png";
import Sentry from "./Sentry.svelte";

let provider;
let signer;

</script>

<Sentry />

<header class="d-flex mb-4 justify-content-between">
    <a href="https://galaxyfightclub.com" target="_blank">
        <img id="gfc-logo-shield" src="{gfcLogoShield}" alt="Galaxy Fight Club" />
        <img id="gfc-logo" src="{gfcLogo}" alt="Galaxy Fight Club" />
    </a>
    <h1 class="text-white">GCOIN Claim</h1>
</header>

<main class="d-flex justify-content-center py-5">
    <Connect bind:provider={provider} bind:signer={signer}>
        <Claim provider={provider} signer={signer} />
    </Connect>
</main>

<footer class="pb-4 text-white-50">
    <div class="float-start pe-5">
        <p>Made with ♥ by <a href="https://what-the-commit.com/" class="text-white">What The Commit</a> (<a href="https://twitter.com/bavragor94" class="text-white">tony-stark.eth</a>) for the <a href="https://galaxyfightclub.com" target="_blank" class="text-white">Galaxy Fight Club</a> community

        </p>
        <p>
            For supporting my projects and keep them running, feel free to tip <b style="color: white;">tony-stark.eth</b>
        </p>
    </div>
    <div class="float-end">
        <p>
            <a href="https://github.com/What-The-Commit/galaxy-fight-club-gcoin-claim" target="_blank"><img src="{githubLogo}" alt="Github" title="Github" /></a>
        </p>
    </div>
</footer>

<style>
</style>