const path = require('path');
const webpack = require('webpack');
const DllPlugin = require('webpack/lib/DllPlugin');
module.exports = {

    entry: {
        vendor: ['react', 'react-dom', 'react-router', "redux", 'react-redux']
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, '../node_modules/react/cjs/react.production.min.js'),
            'react-dom': path.resolve(__dirname, '../node_modules/react-dom/cjs/react-dom.production.min.js'),
            'react-router': path.resolve(__dirname, '../node_modules/react-router/umd/react-router.min.js'),
            'redux': path.resolve(__dirname, '../node_modules/redux/dist/redux.min.js'),
        }
    },
    output: {
        path: path.resolve(__dirname, '../public/static/dll'),
        filename: '[name].js',
        library: '[name]'
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new DllPlugin({
            filename: '[name].js',
            name: '[name]',
            path: path.resolve(__dirname, '../public/static/dll', '[name].manifest.json'), //描述生成的manifest文件
        }),
        new webpack
            .optimize
            .UglifyJsPlugin({
                compress: {
                    warnings: false, //删除无用代码时不输出警告
                    drop_console: true, //删除所有console语句，可以兼容IE
                    collapse_vars: true, //内嵌已定义但只使用一次的变量
                    reduce_vars: true, //提取使用多次但没定义的静态值到变量
                },
                output: {
                    beautify: false, //最紧凑的输出，不保留空格和制表符
                    comments: false, //删除所有注释
                }
            })
    ]
}
