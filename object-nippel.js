// 9  - r
// 10 - d
// 11 - l
// 12 - u
// 21 - ud
// 22 - lr
// 23 - all

function Nippel() {
	
	this.setupDomElement = function($e) {
		$e.addClass('nippel').addClass('nippel'+this.getId());
	}
	
	this.isNippel = function() {
		return true;
	}
	
	this.canNippel = function(dx, dy) {
		var id = this.getId();
		if (dx == -1 && dy == 0 && (id == 11 || id == 22)) return true;
		if (dx == 1 && dy == 0 && (id == 9 || id == 22)) return true;
		if (dx == 0 && dy == 1 && (id == 10 || id == 21)) return true;
		if (dx == 0 && dy == -1 && (id == 12 || id == 21)) return true;
		if (id == 23) return true;
		return false;
	}
}

Nippel.prototype = SupaplexObject.prototype;

