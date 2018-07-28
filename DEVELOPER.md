# Setup Native Project

## Prerequisites
- Have a GitHub repository for this project
- Have a Macbook to be able to build the iOS app.
- Have an iOS device.
- Have an Android device, or have Genymotion with VirtualBox installed, and a Virtual Device created (using this tool to avoid Android Studio emulator problems, see troubleshooting). Or have VirtualBox installed and an Android ISO downloaded from http://www.android-x86.org/.
- Have Android Studio installed (see React Native getting started for which SDK items should be selected)
- Have NodeJS v8 installed

## Node React-Native Project
- Run `$ npm install -g yarn react-native-cli`
- Run `$ react-native init PlantyNative` (if it is not working, run with the flag `--version="0.55.4"` see npm react-native for latest version, and if it does not work, revert to an older version)
- Rename the created folder to `planty-native` and modify `package.json` name to `planty-native`
- Run `$ git init` then `$ git remote add origin https://github.com/rbergenl/planty-native.git` and `$ git checkout -b develop`
- Run `$ git add .`, then `$ git pull`, then `$ git commit -m "initial commit"` and `$  git push --set-upstream origin develop`
- To serve, connect the Android device with an USB cable or start the Virtual Device in Genymotion. And in Android Studio, import the `android` folder, let it build (do not upgrade Gradle), via the 'terminal' tab run `$ npm start`, then press the play button and select the device.
- To serve via a terminal run `$ adb reverse tcp:8081 tcp:8081` (to connect app to JS development server) then `$ react-native run-android`.
- To reload the application or enable hot loading, shake the device or send via the terminal `$ adb shell input keyevent KEYCODE_MENU`.
- To view the logs from the android device, open a terminal and run `$ react-native log-android`

## The App Shell and Routing
- Run `$ npm install --save react-router-native react-redux redux redux-thunk`.


## Google Authentication
- Run `$ npm install --save react-native-google-signin` and then `$ react-native link react-native-google-signin`
- Follow this guide: https://github.com/react-native-community/react-native-google-signin/blob/master/android-guide.md
- Go to the folder `<user>/.android` and run the command `keytool -exportcert -list -v \ -alias androiddebugkey -keystore debug.keystore` (https://developers.google.com/android/guides/client-auth).
- In console.firebase.com select 'add android app' and copy/paste SHA-1 key from the terminal to the respective field.
- Download the `google-services.json` file and place it to the folder `./android/app`
- Add to `project/build.gradle` the dependency `classpath 'com.google.gms:google-services:4.0.1'` (version 4.0.0 gave a nullpointer on method get())
- Add to `settings.gradle` the lines:
```javascript
include ':react-native-google-signin'
project(':react-native-google-signin').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-google-signin/android')
```

### If using Expo
- In console.developers.google.com, choose at the top the correct app (already added there via creation in firebase). Choose create credentials > OAuth > Android > Run in the project 'openssl rand -base64 32 | openssl sha1 -c', use 'host.exp.exponent' as packagename, and the result, give it to 'androidClientId'.
- npm install --save-dev babel-preset-expo and add to .babelrc
- import Expo from 'expo'; Expo.Google.logInAsync(options);

## Bluetooth

### Configure the peripheral
- characteristic 'notify' to let the peripheral send its 'registered device number'. (the app can use this register the device for IoT).
- characteristic 'write' to let the peripheral receive SSDN and Credentials to write to its WiFi configuration.

### Troubleshooting
- when loading firebase while using react-native, you might get the error "undefined self.fetch". This problem is in the fetch module, and can be solved by opening the from the Dev menu on the device the Remote JS debugger
- Install the latest version of XDE https://github.com/expo/xde/releases. If you don’t update, you will see an error similar to: `Error: Cannot find module 'exponent/tools/hashAssetFiles'...` (actually, it is because of expo should be under 'dependencies' in the package.json)
- when starting metro bundler and get error about 'AccessibilityInfo', restart the computer and run `$ npm start -- --reset-cache`
- Android Studio Virtual Device: try installing or updating Intel Emulator Accelerator (HAXM installer) from SDK Manager and also check if Intel VT-x is enabled in your BIOS settings
- If using Real Device via USB; then install via SDK Manager > SDK Tools the Google USB Driver
- If error "Emulator: glClear:466 GL err 0x502", then do manual install as admin via `Android\sdk\extras\intel\hardware_accelerated_execution_manager`
- If with installing 'HAXM' you get the error 'windows requires a digitally signed driver'; then run Windows security updated; or download haxm v7.1.0 from https://github.com/intel/haxm/releases
