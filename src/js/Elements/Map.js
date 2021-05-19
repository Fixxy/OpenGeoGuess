import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/** import leaflet and fix webpack+leaflet compatibility issues */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

/** leaflet map for guessing */
class GuessMap {
	constructor() {
		// create a slippy map and show the basemap
		this.mapDOM = document.getElementById('map');
		this.map = new L.map(this.mapDOM).setView([0, 0], 2)
		this.basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
		this.basemap.addTo(this.map);
		
		// default functions
		this.addMarker();
	}

	/** add movable marker to the map */
	addMarker() {
		// add user marker
		this.userMarker = L.marker(this.map.getCenter(), {draggable: true});
		this.userMarker.addTo(this.map);
		
		// move marker on map click
		this.map.on('click', (e) => {
			this.userMarker.setLatLng([e.latlng.lat, e.latlng.lng]);
		});
	}

	/** show real place */
	showRealPlace(coordinates) {
		// reset old guess
		this.resetElements();

		// add circle marker
		this.realMarker = L.circleMarker(coordinates, {
			"radius": 5,
			"fillColor": "#03a9f4",
			"fillOpacity": 0.8,
			"color": "#03a9f4",
			"weight": 1,
			"opacity": 1
		}).addTo(this.map);

		// show polyline between your guess and the real place
		let polylineCoords = [this.realMarker.getLatLng(), this.userMarker.getLatLng()];
		this.polyline = L.polyline(polylineCoords, {color: 'red'}).addTo(this.map);
		this.map.fitBounds(this.polyline.getBounds());
	}

	/** reset guessed elements on the map */
	resetElements() {
		// remove real marker
		if (this.map.hasLayer(this.realMarker)) this.realMarker.removeFrom(this.map);
		// remove polyline
		if (this.map.hasLayer(this.polyline)) this.polyline.removeFrom(this.map);
	}
}

export default GuessMap;