import {IPage} from '../components/infos/IPage';
import languageManager from '../helpers/LanguageManager';
import {Subject} from 'rxjs';
import LanguageManager from '../helpers/LanguageManager';
import {BackendProxy} from '../helpers/BackendProxy';
import { ActivitiesStore } from './ActivitiesStore';
import { BikeAvailabilityStore } from './BikeAvailabilityStore';

const subject = new Subject();

let pages: IPage[] = [];

async function loadPages(showNoInternet: boolean = false): Promise<void> {
	return BackendProxy.fetchJson('items/pages?limit=-1&filter[language]=' + (await languageManager.getCurrentLanguageAsync()), showNoInternet)
		.then((json) => {
			pages = json ? json.data : [];
			subject.next(pages);

			// reload activities and bike after reloading pages
			ActivitiesStore.reload();
			BikeAvailabilityStore.reload();
		})
		.catch((error) => {
			console.error(error);
		});
}

LanguageManager.onChange.subscribe(() => loadPages(false));
BackendProxy.subscribe(loadPages);

export const InfopagesStore = {
	get: () => pages,
	subscribe: (setState: any) => subject.subscribe(setState),
	reload: (showNoInternet: boolean = false) => {
		return loadPages(showNoInternet);
	},
	getPage: (id: number): IPage|null => {
		const filteredPages = pages.filter(page => page.id === id);
		return filteredPages.length > 0 ? filteredPages[0] : null;
	}
}

