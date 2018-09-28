function Bnya() {
	this.pos = 1;
	
	this.setupDomElement = function($e) {
		$e.addClass('bnya1');
	}
	
	this.explodable = function() {
		return true;
	}
	
	this.idle = function() {
		if (this.job == 98 || this.job == 99) {
			this.idleExplode();
		} else {
			this.domElement.removeClass('bnya'+this.pos);
			this.pos++;
			if (this.pos>5) this.pos = 1;
			this.domElement.addClass('bnya'+this.pos);
			this.idleAutoMovement();
		}
	}
	
	this.afterExplode = function() {
		this.fillFood();
	}
	
	this.whereToGo = function() {
	}
}

Bnya.prototype = SupaplexObject.prototype;

