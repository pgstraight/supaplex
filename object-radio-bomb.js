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
	}
}

RadioBomb.prototype = SupaplexObject.prototype;

