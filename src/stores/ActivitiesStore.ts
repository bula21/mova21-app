import appConfig from '../appConfig';
import {Subject} from 'rxjs';
import LanguageManager from '../helpers/LanguageManager';
import {IActivity} from "../components/infos/pages/IActivity";

const subject = new Subject();

let activities: IActivity[] = [];

async function loadActivities(): Promise<void> {
	fetch(appConfig.backendUrl + '/items/activities')
		.then((response) => response.json())
		.then((json) => {
			activities = json.data;
			subject.next(activities);
		})
		.catch((error) => {
			console.error(error);
		});
}

LanguageManager.onChange.subscribe(() => loadActivities());

export const ActivitiesStore = {
	getAll: () => activities,
	getPermanent: () => activities.filter(a => a.is_permanent),
	getNonPermanent: () => activities.filter(a => !a.is_permanent),
	subscribe: (setState: any) => subject.subscribe(setState),
	reload: () => {
		return loadActivities();
	},
	getActivity: (id: number): IActivity|null => {
		const filteredActivities = activities.filter(activity => activity.id === id);
		return filteredActivities.length > 0 ? filteredActivities[0] : null;
	}
}
