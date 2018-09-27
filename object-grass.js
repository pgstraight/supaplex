function Grass() {
	
	this.setupDomElement = function($e) {
		$e.addClass('grass');
	}
	
	this.eatable = function() {
		return true;
	}
	
	this.idle = function() {
		this.idleEat();
	}
}

Grass.prototype = SupaplexObject.prototype;

