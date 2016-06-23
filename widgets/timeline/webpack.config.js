module.exports = {
  entry: './demo.js',
  output: {
    filename: 'bundle.js'
  },
  module:{
    	loaders:[
    		{
    			test:/\.js?$/,
    			loader:'babel',
    			query: {
        			presets: ['es2015','react']
      			}
    		},
			{ test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader" }
    	]
   }
}