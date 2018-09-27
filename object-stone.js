function Stone() {
	
	this.rotateClass = 'stone-rotate';
	
	this.setupDomElement = function($e) {
		$e.addClass('stone');
	}
	
	this.idle = function() {
		this.idleFall();
		this.idleRoll();
	}
	
	this.isSpheric = function() {
		return true;
	}
	
	this.rollable = function(direction) {
		if (this.job != 0) {
			return false;
		}
		if (direction == 4 || direction == 6) {
			return !this.near(direction);
		}
		return false;
	}
	
	this.addRollClass = function() {
		var m = this.job == 94? 'm' : '';
		m += (this.move*2);
		this.domElement.addClass('stone-rotate-'+m);
	}
	
	this.removeRollClass = function() {
		var m = this.job == 94? 'm' : '';
		m += (this.move*2);
		this.domElement.removeClass('stone-rotate-'+m);
	}
}

Stone.prototype = SupaplexObject.prototype;

