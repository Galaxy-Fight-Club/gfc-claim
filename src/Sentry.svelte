<script lang="ts">
    import * as Sentry from "@sentry/browser";
    import { BrowserTracing } from "@sentry/tracing";

    Sentry.init({
        environment: import.meta.env.PROD ? 'prod' : 'dev',
        dsn: import.meta.env.VITE_SENTRY_DSN,

        // Alternatively, use `process.env.npm_package_version` for a dynamic release version
        // if your build tool supports it.
        release: "galaxy-fight-club-gcoin-claim@1.0.0",
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
</script>