import { register } from 'node:module';

// Chain the asset-stub loader ahead of tsx's TS handling.
register('./asset-stub-loader.mjs', import.meta.url);
