import {IPage} from "../components/infos/IPage";
import appConfig from "../appConfig";
import languageManager from "../helpers/LanguageManager";
import { Subject } from 'rxjs'
import {RxEmitter} from "rxemitter";

const subject = new Subject();

let pages: IPage[] = [];

async function loadPages(): Promise<void> {
	fetch(appConfig.backendUrl + '/data/items/pages?filter[language]=' + (await languageManager.getCurrentLanguage()))
		.then((response) => response.json())
		.then((json) => {
			pages = json.data;
			subject.next(pages);
		})
		.catch((error) => {
			console.error(error);
		});
}

RxEmitter.on('Language_Changed').subscribe(() => loadPages());

export const InfopagesStore = {
	get: () => pages,
	subscribe: (setState: any) => subject.subscribe(setState),
	reload: () => {
		return loadPages();
	}
}

