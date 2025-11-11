import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    supportFile: 'cypress/support/component.ts',
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              use: {
                loader: 'ts-loader',
              },
            },
          ],
        },
        devtool: 'inline-source-map',
      },
    },
  },
  e2e: {
    baseUrl: 'http://localhost:8081',
    supportFile: false,
    viewportWidth: 390,
    viewportHeight: 844,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
  projectId: 'konektinda-app',
});
