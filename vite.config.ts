import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import nodePolyfills from "rollup-plugin-polyfill-node"
import { splitVendorChunkPlugin } from 'vite'
import * as path from "path";

const production = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [
        splitVendorChunkPlugin(),
        // ↓ Needed for development mode
        !production &&
        nodePolyfills({
            include: ["node_modules/**/*.js", new RegExp("node_modules/.vite/.*js")]
        }),
        svelte()
    ],
    build: {
        rollupOptions: {
            plugins: [
                // ↓ Needed for build
                nodePolyfills()
            ]
        },
        // ↓ Needed for build if using WalletConnect and other providers
        commonjsOptions: {
            transformMixedEsModules: true
        }
    },
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            /** browserify for web3 components */
            stream: 'stream-browserify',
            http: 'http-browserify',
            https: 'http-browserify',
            timers: 'timers-browserify',
            process: 'process',
            util: 'util'
        },
    },
})
