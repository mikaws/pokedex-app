const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './index.tsx'
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.[chunkhash].js',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.d.ts']
  },
  module: {
    rules: [
      {
        test: [/\.(ts|js)x?$/, /\.d.ts$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
