function HandBomb() {
	this.setupDomElement = function($e) {
		$e.addClass('hand-bomb');
	}
	
	this.explodable = function() {
		return true;
	}
	
	this.idle = function() {
		this.idleExplode();
	}
}

HandBomb.prototype = SupaplexObject.prototype;

