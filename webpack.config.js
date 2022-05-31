const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      "crypto": require.resolve('crypto'),
    }
  }
};
