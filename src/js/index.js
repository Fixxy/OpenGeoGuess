import '../style.css';

window.onload = function() {
	console.log('google API');


	const panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
		position: { lat: 42.345573, lng: -71.098326 },
		addressControl: false,
		linksControl: false,
		panControl: false,
		enableCloseButton: false,
	});



}