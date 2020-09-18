import $ from "jquery";
import Supaplex from '../../supaplex.js';

class KB
{
	constructor()
	{
		this.keySpace = false;
		this.keyLeft = false;
		this.keyRight = false;
		this.keyUp = false;
		this.keyDown = false;
		
		let k = this;
		
		$(window).keydown(function(e) {
			switch(e.keyCode) {
				case 32: k.keySpace = true; break;
				case 37: k.keyLeft = true; break;
				case 39: k.keyRight = true; break;
				case 38: k.keyUp = true; break;
				case 40: k.keyDown = true; break;
			}
		});
		$(window).keyup(function(e) {
			switch(e.keyCode) {
				case 32: k.keySpace = false; break;
				case 37: k.keyLeft = false; break;
				case 39: k.keyRight = false; break;
				case 38: k.keyUp = false; break;
				case 40: k.keyDown = false; break;
			}
		});
	}
	
	space() {
		return this.keySpace && !this.keyUp && !this.keyDown && !this.keyLeft && !this.keyRight;
	}
	
	moveUp() {
		return this.keyUp && !this.keySpace && !this.keyDown && !this.keyLeft && !this.keyRight;
	}

	moveDown() {
		return this.keyDown && !this.keySpace && !this.keyUp && !this.keyLeft && !this.keyRight;
	}

	moveLeft() {
		return this.keyLeft && !this.keySpace && !this.keyUp && !this.keyDown && !this.keyRight;
	}

	moveRight() {
		return this.keyRight && !this.keySpace && !this.keyUp && !this.keyDown && !this.keyLeft;
	}

	move(direction) {
		if (direction == 8) return this.moveUp();
		if (direction == 2) return this.moveDown();
		if (direction == 4) return this.moveLeft();
		if (direction == 6) return this.moveRight();
		return false;
	}

	eatUp() {
		return this.keyUp && this.keySpace && !this.keyDown && !this.keyLeft && !this.keyRight;
	}

	eatDown() {
		return this.keyDown && this.keySpace && !this.keyUp && !this.keyLeft && !this.keyRight;
	}

	eatLeft() {
		return this.keyLeft && this.keySpace && !this.keyUp && !this.keyDown && !this.keyRight;
	}

	eatRight() {
		return this.keyRight && this.keySpace && !this.keyUp && !this.keyDown && !this.keyLeft;
	}
}

let KBObject = new KB();

export default KBObject;
