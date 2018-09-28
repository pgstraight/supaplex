function DropBomb() {
	this.setupDomElement = function($e) {
		$e.addClass('drop-bomb');
	}
	
	this.idle = function() {
		this.idleFall();
		this.idleExplode();
	}
	
	this.explodable = function() {
		return true;
	}
	
}

DropBomb.prototype = SupaplexObject.prototype;

