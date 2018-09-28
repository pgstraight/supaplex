function HardBlock() {
	
	this.setupDomElement = function($e) {
		$e.addClass('hardblock').addClass('hardblock'+this.getId());
	}
	
	this.solid = function() {
		return true;
	}
}

HardBlock.prototype = SupaplexObject.prototype;

