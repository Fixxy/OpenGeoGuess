import '../style.css';

import Spinner from './Elements/Spinner';
import Controls from './Elements/Controls';
import GuessMap from './Elements/Map';
import Panorama from './Elements/Panorama';

export function initPano() {
	// init elements
	const loading = new Spinner();
	const pano = new Panorama();
	const map = new GuessMap();
	const controls = new Controls();
	// set events
	controls.setEvents({
		onNext: () => {
			loading.show();
			map.resetElements();
			pano.getRandomPanorama(() => {
				loading.hide();
			});
		},
		onGuess: () => {
			map.showRealPlace(pano.getPanoCoordinates());
		}
	})
}
window.initPano = initPano;