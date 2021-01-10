import '../style.css';

import Spinner from './Elements/Spinner';
import ControlPanel from './Elements/ControlPanel';
import GuessMap from './Elements/Map';
import Panorama from './Elements/Panorama';

export function initPano() {
	let loading = new Spinner();
	let pano = new Panorama();
	let map = new GuessMap();
	let controls = new ControlPanel();
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