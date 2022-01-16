import i18n from 'i18next';
import {Platform, NativeModules} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Subject} from 'rxjs';

class LanguageManager {
  private _currentLanguage: string = 'de';
  public onChange: Subject<string> = new Subject();

  public async changeLanguageTo(language: string): Promise<void> {
    this._currentLanguage = language;
    await AsyncStorage.setItem('language', language);
    this.applyLanguage(language);
    this.onChange.next(language);
    console.log('set langauge to ' + language);
  }

  get currentLanguage(): string {
    return this._currentLanguage;
  }

  public async getCurrentLanguageAsync(): Promise<string> {
    let storedLanguage = await AsyncStorage.getItem('language');
    this._currentLanguage = storedLanguage || 'de';
    return storedLanguage == null ? this.getDeviceLanguage() : storedLanguage;
  }

  public async applyLanguageFromStorageOrDevice(): Promise<void> {
    let currentLanguage = await this.getCurrentLanguageAsync();
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
