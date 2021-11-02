const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode:"production",
    entry: './src/js/app.js',  
    output: {
        filename: './src/js/app_bundle.js',
        path: __dirname,
    },

    plugins: [new MiniCssExtractPlugin({
        filename: "./src/css/css_bundle.css"
        }
    )],

    module: {
        rules: [
        {
            test: /\.scss$/i,
            use: [
            // could replace the next line with "style-loader" here for inline css
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            // according to the docs, sass-loader should be at the bottom, which
            // loads it first to avoid prefixes in your sourcemaps and other issues.
            "sass-loader",
            ],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
            // without additional settings, this will reference .babelrc
            loader: "babel-loader",
            },
        },
        ],
    },


};
