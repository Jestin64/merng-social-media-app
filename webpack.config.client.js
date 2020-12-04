const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    devtool: false,
    entry: path.join(__dirname, "/client/index.js"),
    output: {
        path: path.join(__dirname, "/dist/"),
        filename: "bundle.js",
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "/client/index.html"),
            filename: 'index.html' 
        })
    ],
    devServer:{
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        hot: true, 
        watchContentBase: true,
        compress:true
    }
}