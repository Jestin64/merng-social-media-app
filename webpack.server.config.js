const path = require("path")
const nodeExternals = require("webpack-node-externals")

const config ={
    devtool: false,
    target: "node",
    name: "server",
    entry: path.join(__dirname, "/server/server.js"),
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "server.generated.js",
        libraryTarget: "commonjs2"
    },
    externals: [nodeExternals()],
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    }
}

module.exports = config