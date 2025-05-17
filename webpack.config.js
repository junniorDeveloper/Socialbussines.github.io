module.exports = {
  entry: {
    main: './javascript/product.js',
    cart: './javascript/cart-ordered.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
  }
};
