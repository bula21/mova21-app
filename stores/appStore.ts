import {observable, action} from 'mobx';

class AppStore {
	@observable
	language: string = 'de';

	@action
	setLanguage(lang: string) {
		this.language = lang;
	}
}

const appStore = new AppStore();
export default appStore;
