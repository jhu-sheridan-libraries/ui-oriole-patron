[![Build Status](https://travis-ci.org/jhu-sheridan-libraries/ui-oriole-patron.svg?branch=master)](https://travis-ci.org/jhu-sheridan-libraries/ui-oriole-patron)
[![Maintainability](https://api.codeclimate.com/v1/badges/caf089112f829329a4f6/maintainability)](https://codeclimate.com/github/jhu-sheridan-libraries/ui-oriole-patron/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/caf089112f829329a4f6/test_coverage)](https://codeclimate.com/github/jhu-sheridan-libraries/ui-oriole-patron/test_coverage)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

To deploy to the test server, for example, remove all files from `oriole-test:/opt/ui_patron`, and then copy the content in `build` to `oriole-test:/opt/ui_patron`. 

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run storybook`

Runs storybook at [http://localhost:6006](http://localhost:6006)

### `yarn run build-widgets`

It creates a minified file at `build/oriole-widgets.js`. It can be used on a third-party site such as libguides. 

### `To use the widget code`

<p><script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-is@16/umd/react-is.production.min.js"></script>
<script crossorigin src="https://bespoke.mse.jhu.edu/oriole/widgets.js">​</script></p>

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
