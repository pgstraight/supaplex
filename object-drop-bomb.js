function DropBomb() {
	this.setupDomElement = function($e) {
		$e.addClass('drop-bomb');
	}
	
	this.idle = function() {
		this.idleExplode();
		if (this.job < 98) {
			this.idleFall();
			this.idleRoll();
		}
	}
	
	this.explodable = function() {
		return true;
	}
	
	this.rollable = function(direction) {
		if (this.job != 0) {
			return false;
		}
		if (direction == 4 || direction == 6) {
			return !this.near(direction);
		}
		return false;
	}
	
}

DropBomb.prototype = SupaplexObject.prototype;

