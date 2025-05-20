const path = require('path');
const webpack = require('webpack');

module.exports = (env, { mode }) => {
  const isProduction = mode === 'production';
  
  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'index.js',
      libraryTarget: 'commonjs2',
      devtoolModuleFilenameTemplate: '../[resource-path]',
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@user-management/react': path.resolve(__dirname, 'src/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(__dirname, 'tsconfig.json'),
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    stats: 'errors-warnings',
  };
};
