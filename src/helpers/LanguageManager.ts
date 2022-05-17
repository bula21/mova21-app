import i18n from 'i18next';
import {Platform, NativeModules} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Subject} from 'rxjs';

class LanguageManager {
  private _currentLanguage: string = 'de';
  public onChange: Subject<string> = new Subject();

  public async changeLanguageTo(language: string): Promise<void> {
    language = this.sanitizeLanguage(language);
    this._currentLanguage = language;
    await AsyncStorage.setItem('language', language);
    this.applyLanguage(language);
    console.log('set language to ' + language);
  }

  get currentLanguage(): string {
    return this._currentLanguage;
  }

  public async getCurrentLanguageAsync(): Promise<string> {
    let storedLanguage = await AsyncStorage.getItem('language');
    storedLanguage = storedLanguage == null ? this.getDeviceLanguage() : storedLanguage;
    this._currentLanguage = storedLanguage || 'de';
    return this._currentLanguage;
  }

  public async applyLanguageFromStorageOrDevice(): Promise<void> {
    let currentLanguage = await this.getCurrentLanguageAsync();
    this.applyLanguage(this.sanitizeLanguage(currentLanguage));
  }

  private applyLanguage(language: string): void {
    this.onChange.next(language);
    i18n.changeLanguage(language, () =>
      console.log('Changed language to ' + language),
    );
  }

  private sanitizeLanguage(language: string) {
    if (!language) {
      return 'de';
    }
    language = language.toLowerCase();
    if (language.length > 2) {
      language = language.substring(0, 2);
    }
    if (['de', 'fr', 'it', 'en'].indexOf(language) === -1) {
      return 'de';
    }
    return language;
  }

  private getDeviceLanguage(): string {
    let deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;
    let detectedLanguage = this.sanitizeLanguage(deviceLanguage);
    if (detectedLanguage === 'en') {
      detectedLanguage = 'de'; // do not choose EN automatically
    }
    return detectedLanguage;
  }
}

let languageManager = new LanguageManager();

export default languageManager;
