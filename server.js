process.env.NODE_ENV      = 'development';

var chalk                 = require('chalk');

var webpack               = require('webpack');
var WebpackDevServer      = require('webpack-dev-server');
var historyApiFallback    = require('connect-history-api-fallback');
var httpProxyMiddleware   = require('http-proxy-middleware');
var detect                = require('detect-port');
var clearConsole          = require('react-dev-utils/clearConsole');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
var getProcessForPort     = require('react-dev-utils/getProcessForPort');
var openBrowser           = require('react-dev-utils/openBrowser');
var prompt                = require('react-dev-utils/prompt');
var pathExists            = require('path-exists');

var config                = require('./config/webpack.config.dev');
var paths                 = require('./config/paths');
var DEFAULT_PORT          = paths.defaultPort;
process.env.HOST          = paths.defaultHost;
config.entry.unshift("webpack-dev-server/client?"+paths.target + ':' + DEFAULT_PORT,"webpack/hot/dev-server");

//判断是否在终端(terminal)终端环境中执行,在命令行输入node -p -e "Boolean(process.stdout.isTTY)"
var isInteractive         = process.stdout.isTTY;
var compiler;
var handleCompile;

function setupCompiler(host, port, protocol) {
  compiler = webpack(config, handleCompile);
  compiler.plugin('invalid', function() {
    if (isInteractive) {
      clearConsole();
    }
    console.log('编译中...');
  });

  var isFirstCompile = true;//第一次编译

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', function(stats) {
    if (isInteractive) {
      clearConsole();
    }

    var messages = formatWebpackMessages(stats.toJson({}, true));
    var isSuccessful = !messages.errors.length && !messages.warnings.length;
    var showInstructions = isSuccessful && (isInteractive || isFirstCompile);

    if (isSuccessful) {
      console.log(chalk.green('编译成功!'));
    }

    if (showInstructions) {
      console.log();
      console.log('在浏览器中自动打开以下地址:');
      console.log();
      console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'));
      console.log();
      console.log('提示：开发环境中没有进行构建优化');
      console.log('构建生产环境： ' + chalk.cyan('npm run build') + '.');
      console.log();
      isFirstCompile = false;
    }

    // 错误异常
    if (messages.errors.length) {
      console.log(chalk.red('编译失败.'));
      console.log();
      messages.errors.forEach(message => {
        console.log(message);
        console.log();
      });
      return;
    }

    // 警告异常
    if (messages.warnings.length) {
      console.log(chalk.yellow('警告.'));
      console.log();
      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });
      // Teach some ESLint tricks.
      console.log('You may use special comments to disable some warnings.');
      console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
      console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
    }
  });
}
function onProxyError(proxy) {
  return function(err, req, res){
    var host = req.headers && req.headers.host;
    console.log(
      chalk.red('Proxy error:') + ' Could not proxy request ' + chalk.cyan(req.url) +
      ' from ' + chalk.cyan(host) + ' to ' + chalk.cyan(proxy) + '.'
    );
    console.log(
      'See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (' +
      chalk.cyan(err.code) + ').'
    );
    console.log();

    // Otherwise, the request will eventually timeout with ERR_EMPTY_RESPONSE on the client side.
    if (res.writeHead && !res.headersSent) {
        res.writeHead(500);
    }
    res.end('Proxy error: Could not proxy request ' + req.url + ' from ' +
      host + ' to ' + proxy + ' (' + err.code + ').'
    );
  }
}
function addMiddleware(devServer) {
  var proxy = paths.proxyTarget;
  devServer.use(historyApiFallback({
    disableDotRule: true,
    htmlAcceptHeaders: proxy ?
      ['application/json'] :
      ['text/html', '*/*']
  }));

  var mayProxy = paths.proxyPath;
  var hpm = httpProxyMiddleware({
    target: proxy,
    logLevel: 'silent',
    onProxyReq: function(proxyReq, req, res) {
      // Browers may send Origin headers even with same-origin
      // requests. To prevent CORS issues, we have to change
      // the Origin to match the target URL.
      if (proxyReq.getHeader('origin')) {
        proxyReq.setHeader('origin', proxy);
      }
    },
    onError: onProxyError(proxy),
    secure: false,
    changeOrigin: true,
    ws: true
  });
  devServer.use(mayProxy, hpm);
  devServer.use(devServer.middleware);
}

function runDevServer(host, port, protocol) {
  var devServer = new WebpackDevServer(compiler, {
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
    https: protocol === "https",
    host: host,
  });

  // Our custom middleware proxies requests to /index.html or a remote API.
  addMiddleware(devServer);

  // 启动Webpack Server.
  devServer.listen(port, (err, result) => {
    if (err) {
      return console.log(err);
    }

    if (isInteractive) {
      clearConsole();
    }
    console.log(chalk.cyan('本地服务启动中...'));
    console.log();

    if (isInteractive) {
      openBrowser(protocol + '://' + host + ':' + port + '/');
    }
  });
}

function run(port) {
  var protocol = process.env.HTTPS === 'true' ? "https" : "http";
  var host = process.env.HOST || 'localhost';
  setupCompiler(host, port, protocol);
  runDevServer(host, port, protocol);
}

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `detect()` Promise resolves to the next free port.
detect(DEFAULT_PORT).then(port => {
  if (port === DEFAULT_PORT) {
    run(port);
    return;
  }

  if (isInteractive) {
    clearConsole();
    var existingProcess = getProcessForPort(DEFAULT_PORT);
    var question =
      chalk.yellow('端口 ' + DEFAULT_PORT + '已被占用.' +
        ((existingProcess) ? ' Probably:\n  ' + existingProcess : '')) +
        '\n\n使用另一个端口号替代?';

    prompt(question, true).then(shouldChangePort => {
      if (shouldChangePort) {
        run(port);
      }
    });
  } else {
    console.log(chalk.red('端口 ' + DEFAULT_PORT + '已被占用.'));
  }
});
