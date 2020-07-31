# mova21 App

Android und iOS App für das Bundeslager 2021 der Pfadibewegung Schweiz.

## Development

### Installation

- Node & Yarn installieren
- Dependencies installieren `yarn install`

### Commands

Dev-Server starten:

    yarn start

### Debug

Das Developer Menü kann man in der App öffnen mit `Alt+D`.

React Dev Tools installieren:

    yarn global add react-devtools@^3

React Dev Tools starten:

    react-devtools

## Build


### Android

Für Android wird das Secrets File `android/app/signing.gradle` benötigt

Android APK builden:

    ./build_android.sh

### iOS

Build muss via XCode gemacht werden.
