import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    root: '.',
    // Base path : en production les assets seront servis depuis /miniapps/imu-games/
    base: process.env.NODE_ENV === 'production' ? '/miniapps/imu-games/' : '/',
    build: {
        outDir: 'dist',
        target: 'es2022',
        minify: true,
        sourcemap: true,
        rollupOptions: {
            input: 'index.html',
        },
    },
    server: {
        port: 3200,
        open: false,
    },
});
