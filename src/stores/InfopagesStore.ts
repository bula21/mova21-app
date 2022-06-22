import {IPage} from '../components/infos/IPage';
import languageManager from '../helpers/LanguageManager';
import {Subject} from 'rxjs';
import LanguageManager from '../helpers/LanguageManager';
import {BackendProxy} from '../helpers/BackendProxy';
import { ActivitiesStore } from './ActivitiesStore';

const subject = new Subject();

let pages: IPage[] = [];

async function loadPages(): Promise<void> {
	return BackendProxy.fetchJson('items/pages?filter[language]=' + (await languageManager.getCurrentLanguageAsync()))
		.then((json) => {
			pages = json ? json.data : [];
			subject.next(pages);

			// reload activities after reloading pages
			ActivitiesStore.reload();
		})
		.catch((error) => {
			console.error(error);
		});
}

LanguageManager.onChange.subscribe(() => loadPages());
BackendProxy.subscribe(loadPages);

export const InfopagesStore = {
	get: () => pages,
	subscribe: (setState: any) => subject.subscribe(setState),
	reload: () => {
		return loadPages();
	},
	getPage: (id: number): IPage|null => {
		const filteredPages = pages.filter(page => page.id === id);
		return filteredPages.length > 0 ? filteredPages[0] : null;
	}
}

