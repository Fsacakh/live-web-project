require('./check-versions')()
var program = require('commander')

program
    .version('0.0.1')
    .description('a test cli program')
    .option('-n, --name <name>', 'your name', 'GK')
    .option('-a, --age <age>', 'your age', '22')
    .option('-e, --enjoy [enjoy]')
    
program.parse(process.argv)

if (process.argv[3] !== 'sit' && process.argv[3] !== 'pre' && process.argv[3] !== 'prod') {
    console.log('只支持 sit pre prod 三个打包环境')
    return
}
let startTime = Date.parse(new Date());
console.log('构建开始时间(秒)：' + startTime/1000);
process.env.NODE_ENV = process.argv[3];

//process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...' + process.env.NODE_ENV)
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    let endTime = Date.parse(new Date());
    console.log('本次构建总耗时(秒):'+ (endTime - startTime)/1000);
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
