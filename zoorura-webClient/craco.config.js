module.exports = {

  // webpack: { 
  //   headers: {
  //     "Cross-Origin-Opener-Policy": "same-origin",
  //    "Cross-Origin-Embedder-Policy": "require-corp"
  //   }
  // },

  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//      next();
//   });
// };


