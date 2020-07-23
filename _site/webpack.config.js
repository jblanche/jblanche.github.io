module.exports = {
    entry: './_js/main.js',
    output: {
        path: './js',
        filename: 'main.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}
