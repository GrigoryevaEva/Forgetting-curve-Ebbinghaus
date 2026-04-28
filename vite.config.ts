import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@app': path.resolve(__dirname, './src/app'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@widgets': path.resolve(__dirname, './src/widgets'),
        },
    },
    plugins: [ vue() ],
});
