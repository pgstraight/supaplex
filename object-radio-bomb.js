function RadioBomb() {
	this.setupDomElement = function($e) {
		$e.addClass('radio-bomb');
	}
	
	this.radioExplode = function() {
		this.explode(this.x, this.y);
	}
	
	this.explodable = function() {
		return true;
	}
	
	this.idle = function() {
		this.idleExplode();
		if (this.job < 98) {
			this.idleRoll();
		}
	}
	
	this.rollable = function(direction) {
		if (this.job != 0) {
			return false;
		}
		if (direction == 4 || direction == 6 || direction == 8 || direction == 2) {
			return !this.near(direction);
		}
		return false;
	}
}

RadioBomb.prototype = SupaplexObject.prototype;

