import i18n from 'i18next';
import {Platform, NativeModules} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LanguageManager {
  public async changeLanguageTo(language: string): Promise<void> {
    await AsyncStorage.setItem('language', language);
    this.applyLanguage(language);
    console.log('set langauge to ' + language);
  }

  public async getCurrentLanguage(): Promise<string> {
    var storedLanguage = await AsyncStorage.getItem('language');
    return storedLanguage == null ? this.getDeviceLanguage() : storedLanguage;
  }

  public async applyLanguageFromStorageOrDevice(): Promise<void> {
    var currentLanguage = await this.getCurrentLanguage();
    this.applyLanguage(currentLanguage);
  }

  private applyLanguage(language: string): void {
    i18n.changeLanguage(language.split('_')[0], () =>
      console.log('Changed language to ' + language),
    );
  }

  private getDeviceLanguage(): string {
    let deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;
    return deviceLanguage;
  }
}

let languageManager = new LanguageManager();

export default languageManager;
