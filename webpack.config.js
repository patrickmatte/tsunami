const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function pageTemplate(config) {
  return `
  <!DOCTYPE html>
  <html lang="en" class="${config.class}">
    <head>
      <title>${config.title}</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/>
      ${config.head}
    </head>
    <body>
        ${config.body}
    </body>
    </html>
  `;
}

module.exports = (env, argv) => {
  const isDev = argv.mode == 'development';

  let entry = {
    bundle: ['./js/main.js', './css/main.pcss'],
  };

  const plugins = [new MiniCssExtractPlugin()];

  const htmlFiles = [
    {
      template: pageTemplate,
      title: 'sandbox',
      filename: 'sandbox.html',
      class: 'sandbox',
      head: ``,
      oldhead: `<link href="./assets/fonts/fonts.css" rel="stylesheet">`,
      body: `
        <script>
          window.Sandbox();
        </script>
      `,
    },
  ];

  let links = '<ul>';
  htmlFiles.forEach((htmlFile) => {
    links += `<li><a href="${htmlFile.filename}">${htmlFile.title}</a></li>`;
  });
  links += '</ul>';

  htmlFiles.push({
    template: pageTemplate,
    title: 'index',
    filename: 'index.html',
    class: 'index',
    head: '',
    body: links,
  });

  htmlFiles.forEach((htmlFile) => {
    plugins.push(
      new HtmlWebpackPlugin({
        templateContent: htmlFile.template(htmlFile),
        filename: htmlFile.filename,
        env: argv.mode,
        inject: 'head',
        scriptLoading: 'blocking',
      })
    );
  });

  if (isDev) {
    plugins.push(new webpack.SourceMapDevToolPlugin());
  }

  return {
    entry,
    context: path.resolve(__dirname, 'src'),
    target: 'web',
    devtool: false,
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
      publicPath: './',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(sa|sc|pc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: './',
              },
            },
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
        },
        {
          test: /\.(xml|svg|txt|md|hbs|mustache|glsl)$/,
          use: 'raw-loader',
        },
        {
          test: /\.(woff2?|ttf|eot)(\?.*)?$/i,
          use: 'file-loader?name=fonts/[name].[ext]',
        },
        {
          test: /\.(svg|jpe?g|png|gif)(\?.*)?$/i,
          use: 'file-loader?name=img/[name].[ext]',
        },
      ],
    },
    plugins: plugins,
    stats: { colors: true },
    devServer: {
      port: process.env.PORT || 8888,
      host: process.env.HOST || '0.0.0.0',
      static: {
        directory: path.join(__dirname, 'build'),
      },
      devMiddleware: {
        publicPath: '/',
      },
      // https: true,
    },
  };
};
