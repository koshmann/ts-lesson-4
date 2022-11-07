import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/tsapi': {
				target: 'http://faceprog.ru/',
				changeOrigin: true,
			},
		}
	}
})
