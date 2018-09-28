function Explosion() {
	this.setupDomElement = function($e) {
		$e.addClass('explode-0');
	}
	
	this.idle = function() {
		this.idleExplode();
	}
	
	this.solid = function() {
		return true;
	}
}

Explosion.prototype = SupaplexObject.prototype;

