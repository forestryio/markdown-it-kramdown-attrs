import webpack from "webpack"
import path from "path"

// --

let envConfig
if (process.env.NODE_ENV == "production") {
  envConfig = {
    watch: false,
    plugins: [
      new webpack.DefinePlugin({
        env: {
          development: false,
        },

        process: {
          env: {
            NODE_ENV: JSON.stringify(
              "production"
            )
          }
        }
      }),

      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.DedupePlugin(),

      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        mangle: true,
        compress: {
          warnings: false, unused: true,
        }
      })
    ]
  }
}

else {
  envConfig = {
    devtool: "#inline-source-map",
    plugins: [
      new webpack.DefinePlugin({
        env: {
          development: true,
        },

        process: {
          env: {
            NODE_ENV: JSON.stringify(
              "development"
            )
          }
        }
      })
    ]
  }
}

// --

let webpackConfig
export default webpackConfig = {
  ...envConfig,
  target: "web",

  entry: {
    "markdown-it/kramdown-attrs": "./src/markdown-it/kramdown-attrs.js"
  },

  output: {
    umdNamedDefine: true,
    filename: "[name].web.js",
    path: path.join(path.resolve(__dirname), "lib"),
    libraryTarget: "umd",
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel"
      },

      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },

  resolve: {
    extensions: ["", ".js", ".jsx"],
    modulesDirectories: [
      "node_modules"
    ]
  }
}
