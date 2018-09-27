function HardBlock() {
	
	this.setupDomElement = function($e) {
		$e.addClass('hardblock').addClass('hardblock'+this.getId());
	}
}

HardBlock.prototype = SupaplexObject.prototype;

