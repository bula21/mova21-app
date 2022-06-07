# mova21 App

Android und iOS App für das Bundeslager 2021 der Pfadibewegung Schweiz.

## Development

### Installation

- Node & Yarn installieren
- Dependencies installieren `yarn install`

### Installation (Windows)

- install node python2 and jdk, preferably using [chocolatey](https://chocolatey.org/docs/installation)
- `choco install -y nodejs.install python2 jdk8`
- [Android Studio](https://developer.android.com/studio), Choose a "Custom" setup when prompted to select an installation type. Make sure the boxes next to all of the following are checked: 'Android SDK', 'Android SDK Platform', 'Performance (Intel ® HAXM)' ([See here for AMD](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html)), 'Android Virtual Device'. If the checkboxes are grayed out or miss, you will have a chance to install these components later on at the first start of Android Studio.
- Android SDK: The SDK Manager can be accessed from the "Welcome to Android Studio" screen. Click on "Configure", then select "SDK Manager".
- Configure the `ANDROID_HOME` environment variable: Open the System pane under System and Security in the Windows Control Panel, then click on Change settings.... Open the Advanced tab and click on Environment Variables.... Click on New... to create a new `ANDROID_HOME` user variable that points to the path to your Android SDK (The SDK is installed, by default, at the following location: `c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`)
- Add platform-tools to Path: Open the System pane under System and Security in the Windows Control Panel, then click on Change settings.... Open the Advanced tab and click on Environment Variables.... Select the Path variable, then click Edit. Click New and add the path to platform-tools to the list. The default location for this folder is: `c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools`
- create file `android/local.properties` with content `sdk.dir = C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\sdk` (or your specific path to the android SDK)


### Commands

Dev-Server starten:

    yarn start

### Debug

Das Developer Menü kann man in der App öffnen mit `Alt+D`.

React Dev Tools installieren:

    yarn global add react-devtools@^3

React Dev Tools starten:

    react-devtools

Remote Debugging starten:

    yarn android

## Build

Version erhöhen:

- `android/app/build.gradle:146`
- `package.json`
- `ios/Mova21/Info.plist:22` CFBundleVersion und CFBundleShortVersionString

### Android

Für Android wird das Secrets File `android/app/signing.gradle` und `android/app/mova21app.keystore` benötigt

Android APK builden:

    ./build_android.sh

### iOS

Build muss via XCode gemacht werden.
