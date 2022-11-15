const { DefinePlugin } = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (async () => {
	const { ENV_OBJ_WITH_JSON_STRINGIFY_VALUE } = await import('./env/env.mjs')

	return {
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.(js|ts)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										useBuiltIns: 'entry',
										corejs: '3.26.1',
									},
								],
								'babel-preset-typescript-vue3',
								'@babel/preset-typescript',
							],
						},
					},
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'webpack project for vue',
				template: 'index.html',
				inject: 'body',
				templateParameters: {
					env: process.env.ENV,
					ioHost: JSON.stringify(process.env.IO_HOST),
				},
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					useShortDoctype: true,
				},
			}),
			new DefinePlugin({
				'import.meta.env': ENV_OBJ_WITH_JSON_STRINGIFY_VALUE,
			}),
		],
		cache: {
			type: 'filesystem',
		},
		performance: {
			maxEntrypointSize: 512000,
			maxAssetSize: 512000,
		},
		optimization: {
			moduleIds: 'deterministic',
			runtimeChunk: {
				name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
			},
			splitChunks: {
				chunks: 'all',
				// minSize: 0,
				minSize: 10000,
				maxSize: 250000,
				// minChunks: 4,

				cacheGroups: {
					vendor: {
						name: 'node_vendors',
						test: /[\\/]node_modules[\\/]/,
						chunks: 'all',
					},

					styles: {
						name(module) {
							const match = module.context.match(/[\\/](.*).css/)

							if (!match) {
								return false
							}

							const moduleName = match[1]

							return moduleName
						},
						test: /\.css$/,
						chunks: 'all',
						enforce: true,
					},
				},
			},

			minimize: true,
			minimizer: [
				new TerserPlugin({
					parallel: true,
				}),
				new CssMinimizerPlugin({
					exclude: /node_modules/,
					parallel: true,
				}),
			],
		},
	}
})()
