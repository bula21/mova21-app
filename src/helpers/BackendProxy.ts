import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import appConfig from '../appConfig';

const fetchJson = async (url: string) => {
	const fullUrl = `${appConfig.backendUrl}/${url}`;
	const state = await NetInfo.fetch();
	if (state && state.isConnected) {
		return fetchJsonOnlineOrOffline(fullUrl);
	} else {
		return fetchJsonOffline(fullUrl);
	}
}

const fetchJsonOffline = async (url: string) => AsyncStorage.getItem(url).then(s => {
	if (s) {
		return JSON.parse(s);
	}
	else {
		throw 'No data cached offline';
	}
});

/** Attempt to fetch data online. Fall back to offline storage if reading online fails. */
const fetchJsonOnlineOrOffline = async (url: string) => {
	const response = await fetch(url).catch(
		error => {
			// Ignore error, offline data will be used.
			console.debug(error)
		}
	);
	if (response && response.ok) {
		const json = await response.json();
		// Store in the background
		AsyncStorage.setItem(url, JSON.stringify(json)).catch(
			error => console.error(error)
		);
		// Display data immediately
		return json;
	} else {
		return fetchJsonOffline(url);
	}
};

export const BackendProxy = {
	/** Serve requests for the backend server. Whenever possible, requests are sent
	 * directly to the server. If offline, previously retrieved data is served from
	 * locally persisted storage. */
	fetchJson: async (url: string) => fetchJson(url).catch(
		error => console.error(error)
	),
	/** Subscribe to arrival of new data. */
	subscribe: (f: () => void) => {
		return NetInfo.addEventListener(state => {
			if (state.isConnected) {
				f();
			}
		});
	}
}
