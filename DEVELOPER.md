# Setup Native Project

## Prerequisites
- Have an Expo.io account
- Have an Expo client installed on an android device.
- Have Genymotion installed

## Node Project
- Run `$ npm init --yes`

## Expo and React-Native
- Add to `.gitignore` the line `.expo/*`
- Add to `.babelrc` presets `babel-preset-expo`
- Run `$ npm install -g exp react-native-cli`
- make sure package.json has: (as 'dependencies', not as 'devDependencies' and then react-native version should be same as expo sdk version; check latest npm expo version available)
```javascript
"expo": "26.0.0",
"react-native": "https://github.com/expo/react-native/archive/sdk-26.0.0.tar.gz"
```
- Run `$ npm install --save expo react-native` (important! expo should be saved under 'dependencies' and not under 'devDependencies')
- and app.json has (same sdk as in the package.json; and the name is the one given at AppRegistry.registerComponent (otherwise expo will search for the app called "main" by default):
```json
{
  "expo": {
    "name": "Croppy",
    "sdkVersion": "26.0.0"
  }
}
```
- Have `package.json` main point to `src/index.js`
- Run `$ exp login`
- Run on Cloud9: `$ exp start --tunnel` (tunnel to be able to reach it through the internet, and will start bundler itself; wait until it said "dependency graph loaded", then scan the qr code with the Expo client on an android device).
- Run on laptop: `$ exp start`, start Genymotion device, then `$ exp android`.

## Google Authentication
- In console.developers.google.com, choose at the top the correct app (already added there via creation in firebase). Choose create credentials > OAuth > Android > Run in the project 'openssl rand -base64 32 | openssl sha1 -c', use 'host.exp.exponent' as packagename, and the result, give it to 'androidClientId'.
- npm install --save-dev babel-preset-expo and add to .babelrc
- import Expo from 'expo'; Expo.Google.logInAsync(options);

## Bluetooth


### Common problems
- when loading firebase while using react-native, you might get the error "undefined self.fetch". This problem is in the fetch module, and can be solved by opening the from the Dev menu on the device the Remote JS debugger
- Install the latest version of XDE https://github.com/expo/xde/releases. If you don’t update, you will see an error similar to: `Error: Cannot find module 'exponent/tools/hashAssetFiles'...` (actually, it is because of expo should be under 'dependencies' in the package.json)
