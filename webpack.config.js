const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    resolve: {
      "crypto": false,
    }
    resolve.fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
    }
  }
};
