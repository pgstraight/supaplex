function Food() {
	this.rotateClass = 'stone-rotate';
	
	this.setupDomElement = function($e) {
		$e.addClass('food');
	}
	
	this.idle = function() {
		this.idleFall();
		this.idleEat();
	}

	this.isSpheric = function() {
		return true;
	}
	
	this.eatable = function() {
		return true;
	}
	
	this.afterEat = function() {
		targetEat++;
		$('.target').html(targetEat + '/' + targetAll);
	}
}

Food.prototype = SupaplexObject.prototype;

