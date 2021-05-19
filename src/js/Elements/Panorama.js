import * as turf from '@turf/turf'

/** google street view */
class Panorama {
	constructor() {
		// vars 
		this.realCoordinates = [];
		this.panoRadius = 100000; //100km;
		// dom
		this.panoramaDOM = document.getElementById('pano');
		// google maps service
		this.svService = new google.maps.StreetViewService();
		
		// create initial panorama element
		// set default properties
		this.panorama = new google.maps.StreetViewPanorama(this.panoramaDOM, {
			addressControl: false,
			linksControl: false,
			panControl: false,
			enableCloseButton: false,
		});
	}

	/** get the coordinates of the current panorama */
	getPanoCoordinates() {
		return this.realCoordinates;
	}

	/** request random panorama from google */
	getRandomPanorama(cbSuccess) {
		// pick random coordinates using turfJS
		let point = turf.randomPosition([-180, -90, 180, 90]);
		let coords = { lat: point[1], lng: point[0]};

		// find a new panorama in a 50km radius around random point
		this.svService.getPanorama({
			location: coords,
			radius: this.panoRadius,
			source: 'outdoor'
		}, (data, status) => {
			if (status === "OK") {
				const location = data.location;
				this.realCoordinates = [location.latLng.lat(), location.latLng.lng()];

				this.panorama.setPano(location.pano);
				this.panorama.setPov({
					heading: 270,
					pitch: 0,
				});
				this.panorama.setVisible(true);
				
				cbSuccess();
			} else {
				// no panorama nearby, do it again
				console.log('not found, retrying in 1s');
				setTimeout(() => {
					this.getRandomPanorama(cbSuccess);
				}, 1200);
			}
		});
	}
}

export default Panorama;