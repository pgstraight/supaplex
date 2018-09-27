function Bnya() {
	this.pos = 1;
	
	this.setupDomElement = function($e) {
		$e.addClass('bnya1');
	}
	
	this.idle = function() {
		this.domElement.removeClass('bnya'+this.pos);
		this.pos++;
		if (this.pos>5) this.pos = 1;
		this.domElement.addClass('bnya'+this.pos);
		this.idleAutoMovement();
	}
	
	this.whereToGo = function() {
	}
}

Bnya.prototype = SupaplexObject.prototype;

