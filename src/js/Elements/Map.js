import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* import leaflet and fix webpack+leaflet compatibility issues */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

/* leaflet map for guessing*/
class GuessMap {
	constructor() {
		//vars
		this.mapSize = 0;
		// create a slippy map and show the basemap
		this.mapDOM = document.getElementById('map');
		this.map = new L.map(this.mapDOM).setView([0, 0], 2)
		this.basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
		this.basemap.addTo(this.map);
		
		// default functions
		this.addMarker();
		this.initControls();
	}

	initControls() {
		// button to enlarge the map
		const sizeButton = L.Control.extend({
		options: { position: 'topright' },
		onAdd: () => {
			let button = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-custom-button leaflet-big-btn');
			L.DomEvent.disableClickPropagation(button); // so you can't click through
			button.onclick = () => {
			this.toggleSize();
			}
			return button;
		}
		});
		this.map.addControl(new sizeButton);
	}

	toggleSize() {
		
		if (this.mapSize !== 0) {
		this.mapSize = 0;
		this.mapDOM.style.width = '250px';
		this.mapDOM.style.height = '150px';
		setTimeout(()=>{ this.map.invalidateSize()}, 400);
		} else {
		this.mapSize = 1;
		this.mapDOM.style.width = '100%';
		this.mapDOM.style.height = '400px';
		setTimeout(()=>{ this.map.invalidateSize()}, 400);
		}
	}

	addMarker() {
		// add user marker
		this.userMarker = L.marker(this.map.getCenter(), {draggable: true});
			this.userMarker.addTo(this.map);
		
		// move marker on map click
		this.map.on('click', (e) => {
			this.userMarker.setLatLng([e.latlng.lat, e.latlng.lng]);
		});
	}

	showRealPlace(coordinates) {
		// show real place
		this.realMarker = L.circleMarker(coordinates, {
		"radius": 5,
		"fillColor": "#03a9f4",
		"fillOpacity": 0.8,
		"color": "#03a9f4",
		"weight": 1,
		"opacity": 1
		}).addTo(this.map);

		// show polyline between your guess and a real place
		let polylineCoords = [this.realMarker.getLatLng(), this.userMarker.getLatLng()];
		this.polyline = L.polyline(polylineCoords, {color: 'red'}).addTo(this.map);
		this.map.fitBounds(this.polyline.getBounds());
	}

	resetElements() {
		// remove real marker
		if (this.map.hasLayer(this.realMarker)) this.realMarker.removeFrom(this.map);
		// remove polyline
		if (this.map.hasLayer(this.polyline)) this.polyline.removeFrom(this.map);
	}
}

export default GuessMap;