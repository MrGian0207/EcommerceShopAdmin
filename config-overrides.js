const { override, useBabelRc, addWebpackResolve } = require('customize-cra');

module.exports = override(
   useBabelRc(),
   addWebpackResolve({
      fallback: {
         path: false, // Sử dụng chuỗi cho key path
         os: false, // Sử dụng chuỗi cho key os
         crypto: false, // Sử dụng chuỗi cho key crypto
      },
   }),
);
