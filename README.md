# Draper Rhino React Native App

### Run React Native App

Prerequisites: NodeJS

1. Go into the project folder and install the dependencies:

```
 npm install
```

2. Set the environment variables by running:

```
cp env.dev .env
```

3. Start the Expo server:

```
npm start
```

Metro bundler will open in the browser on your server url and in the terminal.
You will be given a QR code that can be used to run the app on a physical device.

You can also run the application in the browser by typing `w` in the expo terminal.

### Test the React Native App on a phone

When testing on a device with the backend server running locally, you need to change the `API_URL` in the `.env` file as follows: replace `localhost` with the ip address that expo gives you on your network. You can see this address both in the expo terminal and the Metro builder tab.

1. Download `Expo Client` on Play Store / App Store
2. Make sure you are on the same network as the Expo server
3. Open Expo Client and scan the QR code

Once you have scanned the QR code once, the Expo client will save the project info and you will see it in the expo client's dashboard.

### Debugging

To open dev tools on your device shake your phone. Make sure that `Fast Refresh` is enabled. If it is enabled you will see a `Disable Fast Refresh` option. Otherwise, click on `Enable Fast Refresh`. Now the page will reload (on save) as you make edits.

To debug the application in the browser, open dev tools on your phone and click on `Debug Remote JS`. This will slow down the application somewhat, so make sure that this option is disabled in production mode. To disable remote debugging open dev tools and click on `Stop Remote Debugging`.

You can also use an emulator for testing. To test on a virtual android device you need to download Android Studio. There are versions available for Windows, Linux and MacOS. To test on a virtual ios device you need to download Xcode. However, it is not possible to install the iOS Simulator on any operating system except macOS.

Once you have Android Studio/Xcode you can create a virtual device (emulator) and run the application on it.

### Useful links

1. [Expo documentation](https://docs.expo.io/)
2. [React Redux documentation](https://react-redux.js.org/introduction/quick-start)
3. [Redux Toolkit API documentation](https://redux-toolkit.js.org/api/configureStore)
4. [React Navigation documentation](https://reactnavigation.org/docs/getting-started)
5. [NativeBase documentation](https://docs.nativebase.io/Components.html#Components)
6. [Formik documentation](https://formik.org/docs/overview)
7. [Yup documentation](https://github.com/jquense/yup)
