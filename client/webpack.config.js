// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackPwaManifest = require('webpack-pwa-manifest');
// const path = require('path');
// const { InjectManifest } = require('workbox-webpack-plugin');

// module.exports = () => {
//   return {
//     mode: 'development',
//     entry: {
//       main: './src/js/index.js',
//       install: './src/js/install.js'
//     },
//     output: {
//       filename: '[name].bundle.js',
//       path: path.resolve(__dirname, 'dist'),
//     },
//     plugins: [
//       new HtmlWebpackPlugin({
//         template: './index.html',
//         title: 'J.A.T.E'
//       }),
//       new InjectManifest({
//         swSrc: './src-sw.js',
//         swDest: 'src-sw.js',
//       }),
//       new WebpackPwaManifest({
//         fingerprints: false,
//         inject: true,
//         name: 'Just Another Text Editor',
//         short_name: 'J.A.T.E',
//         description: 'Takes notes with JavaScript syntax highlighting!',
//         background_color: '#225ca3',
//         theme_color: '#225ca3',
//         start_url: '/',
//         publicPath: '/',
//         icons: [
//           {
//             src: path.resolve('src/images/logo.png'),
//             sizes: [96, 128, 192, 256, 384, 512],
//             destination: path.join('assets', 'icons'),
//           },
//         ],
//       }),
//     ],

//     module: {
//       rules: [
//         {
//           test: /\.css$/i,
//           use: ['style-loader', 'css-loader'],
//         },
//         {
//           test: /\.m?js$/,
//           exclude: /node_modules/,
//           use: {
//             loader: 'babel-loader',
//             options: {
//               presets: ['@babel/preset-env'],
//               plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
//             },
//           },
//         },
//       ],
//     },
//   };
// };

// Import required modules
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

// Define and export the Webpack configuration
module.exports = () => {
  return {
    // Specify the build mode
    mode: 'development',
    
    // Define entry points for JavaScript bundles
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    
    // Specify the output configuration
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    
    // Configure plugins used in the build process
    plugins: [
      // Generate HTML files from templates
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E'
      }),
      
      // Inject the service worker manifest into the build
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      
      // Generate a Web App Manifest for the Progressive Web App (PWA)
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'Takes notes with JavaScript syntax highlighting!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    // Configure module rules for handling CSS and JavaScript
    module: {
      rules: [
        // Define a rule for handling CSS files
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        
        // Define a rule for handling JavaScript files using Babel
        {
          test: /\.m?js$/,
          exclude: /node_modules/, // Exclude node_modules from processing
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};

