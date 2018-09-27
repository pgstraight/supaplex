function Stone() {
	
	this.rotateClass = 'stone-rotate';
	
	this.setupDomElement = function($e) {
		$e.addClass('stone');
	}
	
	this.idle = function() {
		this.idleFall();
	}
	
	this.isSpheric = function() {
		return true;
	}
}

Stone.prototype = SupaplexObject.prototype;

