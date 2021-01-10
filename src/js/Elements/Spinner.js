/* spinner loader thingy */
class Spinner {
	constructor() {
		this.block = document.getElementById('spinner');
	}
	show() {
		this.block.style.display = 'block';
	}
	hide() {
		this.block.style.display = 'none';
	}
}

export default Spinner;