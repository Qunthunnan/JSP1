const path = require('path');

module.exports = function devServer () {
    return {
        static: {
            directory: path.join(__dirname, './src'),
        },
        compress: true,
        port: 9000,
    }
}