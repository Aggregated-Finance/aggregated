const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    resolve: {
      "crypto": false,
    }
    resolve.fallback: { "crypto": require.resolve("crypto-browserify") }
  }
};
