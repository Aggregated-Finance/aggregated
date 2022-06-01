const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    resolve: {
      "crypto": false,//require.resolve("crypto-browserify"),
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,//require.resolve("stream-http"),
      "https": false,
      "stream": false,
    },
    resolve.fallback: {
      "crypto": false,//require.resolve("crypto-browserify"),
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,//require.resolve("stream-http"),
      "https": false,
      "stream": false,
    }
  }
};
