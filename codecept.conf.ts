import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './tests',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://playwright.dev',
      show: false
    }
  },
  include: {
    I: './steps_file'
  },
  name: 'yqnimoxqko.github'
}