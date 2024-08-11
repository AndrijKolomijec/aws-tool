import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				background: resolve(__dirname, 'src/background.ts'),
				changeCredsContent: resolve(__dirname, 'src/changeCredsContent.ts'),
				refreshRateExceededContent: resolve(
					__dirname,
					'src/refreshRateExceededContent.ts'
				),
				loadMoreContent: resolve(__dirname, 'src/loadMoreContent.ts'),
				popup: resolve(__dirname, 'index.html')
			},
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: 'chunks/[name].js',
				assetFileNames: 'assets/[name].[ext]'
			}
		}
	}
})
