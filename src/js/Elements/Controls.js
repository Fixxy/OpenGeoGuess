/** controls, button events */
class Controls {
	constructor() {
		this.nextButton = document.getElementById('next');
		this.guessButton = document.getElementById('guess');
	}
	setEvents(props) {
		this.onNext = props.onNext;
		this.onGuess = props.onGuess;
		this.nextButton.addEventListener('click', () => {
			this.onNext();
		})
		this.guessButton.addEventListener('click', () => {
			this.onGuess();
		})
	}
}

export default Controls;