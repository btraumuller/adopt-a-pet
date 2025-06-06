import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {app} from './api/app.js';

const proxy = {
    '/api': {},
};

export default defineConfig({
    plugins: [
        vue(),
        {
            name: 'api',
            config() {
                return {
                    server: {
                        proxy,
                        port: 3002,
                    },
                    preview: {
                        proxy,
                    },
                };
            },
            configureServer(server) {
                server.middlewares.use(app);
            },
        },
    ],
    test: {
        globals: true,
        mockReset: true,
    },
});
