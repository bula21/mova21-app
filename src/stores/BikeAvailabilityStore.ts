import {IPage} from '../components/infos/IPage';
import {Subject} from 'rxjs';
import {BackendProxy} from '../helpers/BackendProxy';
import { IBikeAvailability } from '../components/infos/pages/IBikeAvailability';

const subject = new Subject();

let bikeAvailability: IBikeAvailability;

async function loadBikeAvailability(): Promise<void> {
	return BackendProxy.fetchJson('items/Bike')
		.then((json) => {
			bikeAvailability = json ? json.data : {};
			subject.next(bikeAvailability);
		})
		.catch((error) => {
			console.error(error);
		});
}

BackendProxy.subscribe(loadBikeAvailability);

export const BikeAvailabilityStore = {
	get: () => bikeAvailability,
	subscribe: (setState: any) => subject.subscribe(setState),
	reload: () => {
		return loadBikeAvailability();
	}
}

