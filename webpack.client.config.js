const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    devtool: false,
    entry: path.join(__dirname, "/client/index.js"),
    output: {
        path: path.join(__dirname, "/dist/"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader",
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            },

            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.otf(\?.*)?$/,
                use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "/client/index.html"),
            filename: 'index.html'
        })
    ],
    devServer: {
        historyApiFallback: true,  //! this line makes the manual url insertion work 
        // https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually?page=1&tab=votes#tab-top
        contentBase: path.join(__dirname, 'dist'),
        port: 4000,
        hot: true,
        watchContentBase: true,
        compress: true,
        publicPath: '/',
    }
}