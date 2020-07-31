#!/usr/bin/env bash

APK_PATH=android/app/build/outputs/apk/release/app-release.apk

# cleanup
if [[ -f "$APK_PATH" ]]; then
  rm $APK_PATH
fi

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

# weird workaround for build errors
rm -rf android/app/src/main/res/drawable-*
rm -rf android/app/src/main/res/raw/*

cd android
./gradlew assembleRelease
cd ..

echo -e ''
if [[ -f "$APK_PATH" ]]; then
  echo -e 'Release APK is here:'
  echo -e "$APK_PATH"
else
  echo "Something went wrong, no APK was built..."
fi
echo -e ''
