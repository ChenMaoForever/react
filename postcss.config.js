/**
 * Created by dell on 2017/11/2.
 * 加载postcss插件
 */
module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 10 versions','ie>=8','>1% in CN']
        }),
        require('postcss-px2rem')({
            remUnit: 75
        })
    ]
}