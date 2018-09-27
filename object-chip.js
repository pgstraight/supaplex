function Chip() {
	
	this.setupDomElement = function($e) {
		$e.addClass('chip').addClass('chip'+this.getId());
	}
	
	this.isSpheric = function() {
		return true;
	}
}

Chip.prototype = SupaplexObject.prototype;

