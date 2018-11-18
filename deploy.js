const gh = require('gh-pages');
const path = require('path');
const ora = require('ora')
const chalk = require('chalk')

process.env.NODE_ENV = 'production'

const spinner = ora('push dist folder to gh-pages branch...')
spinner.start()

gh.publish(path.join(process.cwd(), 'dist', 'docs'), () => {
  spinner.stop()
  console.log(chalk.cyan('  Push complete.\n'))
});
