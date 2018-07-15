# Setup Native Project

## Prerequisites
- Have NodeJS v8 installed
- Have Android Studio installed
- Have Genymotion installed with a Google Nexus API 23 device

## Node React-Native Project
- Run `$ npm install -g exp react-native-cli`
- Run `$ react-native init PlantyNative`
- Rename the created folder to `planty-native`
- Modify `package.json` name to `planty-native`, add the script `"start": "node node_modules/react-native/local-cli/cli.js start"`, let main point to `src/index.js`, and move the files `index.js` and `App.js` to a new folder `src`.
- Run `$ git init` then `$ git remote add origin https://github.com/rbergenl/planty-native.git` and `$ git checkout -b develop`
- Run `$ echo -e "# planty-native\nApplication to manage automation of growing plants" >> README.md`
- Run `$ git add .` and `$ git commit -m "initial commit"` and `$  git push --set-upstream origin develop`


## Expo and React-Native
- Check https://github.com/expo/react-native/ the `package.json` for peerDependency react version, add this one to your package.json.
- Make sure package.json has: (as 'dependencies', not as 'devDependencies' and then react-native version should be same as expo sdk version; check latest npm expo version available)
```javascript
"expo": "28.0.0",
"react": "16.2.0",
"react-native": "https://github.com/expo/react-native/archive/sdk-28.0.0.tar.gz"
```
- Run `$ npm install --save expo react react-native` (important! expo should be saved under 'dependencies' and not under 'devDependencies')
- and app.json has (same sdk as in the package.json; and the name is the one given at AppRegistry.registerComponent (otherwise expo will search for the app called "main" by default):
```json
{
  "expo": {
    "name": "Planty",
    "sdkVersion": "28.0.0"
  }
}
```
- Run on Cloud9: `$ exp login`, then `$ exp start --tunnel` (tunnel to be able to reach it through the internet, and will start bundler itself; wait until it said "dependency graph loaded", then scan the qr code with the Expo client on an android device).
- Run on laptop: `$ exp start`, start Genymotion device, then `$ exp android`.

- Add to `.gitignore` the line `.expo/*`
- Add to `.babelrc` presets `babel-preset-expo`

## Bluetooth
- Make sure the `app.json` is according the instructions:
```json
name:
version:
icon:
android: {
	"package": "com.example.planty"
}
```
- Run `$ exp detach` (make sure to uninstall the app from the device if it was installed before;
- Do (re)start the device
- Since the project is detached, run `$ cd android && sh run.sh` (which executes ./gradlew installDevDebug)
- Run `$ exp start` in one terminal and `$ exp android` in another terminal.


## Google Authentication
- In console.developers.google.com, choose at the top the correct app (already added there via creation in firebase). Choose create credentials > OAuth > Android > Run in the project 'openssl rand -base64 32 | openssl sha1 -c', use 'host.exp.exponent' as packagename, and the result, give it to 'androidClientId'.
- npm install --save-dev babel-preset-expo and add to .babelrc
- import Expo from 'expo'; Expo.Google.logInAsync(options);


### Common problems
- when loading firebase while using react-native, you might get the error "undefined self.fetch". This problem is in the fetch module, and can be solved by opening the from the Dev menu on the device the Remote JS debugger
- Install the latest version of XDE https://github.com/expo/xde/releases. If you don’t update, you will see an error similar to: `Error: Cannot find module 'exponent/tools/hashAssetFiles'...` (actually, it is because of expo should be under 'dependencies' in the package.json)
