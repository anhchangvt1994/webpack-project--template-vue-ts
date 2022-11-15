const { webpack } = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const serverInitial = new WebpackDevServer(
	webpack({
		mode: 'development',
		entry: {},
		output: {},
	}),
	{
		compress: true,
		static: './dist',
	}
)

serverInitial.start(process.env.PORT || 8080)
