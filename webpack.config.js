const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require("./package.json");
const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
    resolve: {
        extensions: [".jsx", ".js", ".json"],
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "public"),
        },
        port: 3001
    },
    output: {
        publicPath: 'http://localhost:3001/'
    },
    entry: "./src/index",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.jsx?$/,
                loader: require.resolve("babel-loader"),
                options: {
                    presets:  ["@babel/preset-env",  ["@babel/preset-react", {"runtime": "automatic"}]],
                },
            },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'adminApp',
            library: {type: 'var', name: 'adminApp'},
            filename: 'export.js',
            exposes: {
                "./App": './src/components/app/App',
                "./adminRu": "./src/i18n/ru/translation",
                "./adminEn": "./src/i18n/en/translation"
            },
            shared: {
                "react-router": {
                    singleton: true,
                    requiredVersion: "6.14.2"
                },
                "react-router-dom": {
                  singleton: true,
                  requiredVersion: "^6.14.2"
                },
                react: {
                    singleton: true,
                    requiredVersion: dependencies["react"],
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                },
                "i18next": {
                    singleton: true,
                    requiredVersion: "21.9.1"
                },
                "i18next-browser-languagedetector": {
                    singleton: true,
                    requiredVersion: "6.1.5"
                },
                "react-i18next": {
                    singleton: true,
                    requiredVersion: "11.18.4"
                }
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new Dotenv({
            path: `./.env`,
            safe: false
        })
    ]
}