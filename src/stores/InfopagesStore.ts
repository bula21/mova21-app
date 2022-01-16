import {IPage} from '../components/infos/IPage';
import appConfig from '../appConfig';
import languageManager from '../helpers/LanguageManager';
import {Subject} from 'rxjs';
import LanguageManager from '../helpers/LanguageManager';

const subject = new Subject();

let pages: IPage[] = [];

async function loadPages(): Promise<void> {
	fetch(appConfig.backendUrl + '/data/items/pages?filter[language]=' + (await languageManager.getCurrentLanguageAsync()))
		.then((response) => response.json())
		.then((json) => {
			pages = json.data;
			subject.next(pages);
		})
		.catch((error) => {
			console.error(error);
		});
}

LanguageManager.onChange.subscribe(() => loadPages());

export const InfopagesStore = {
	get: () => pages,
	subscribe: (setState: any) => subject.subscribe(setState),
	reload: () => {
		return loadPages();
	}
}

