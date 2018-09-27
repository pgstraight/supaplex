function SupaplexObject() {
}

SupaplexObject.prototype.getId = function() {
	return this.id;
}

SupaplexObject.prototype.init = function(id, x, y) {
	this.alive = true;
	this.id = id;
	this.x = x;
	this.y = y;
	this.xx = x;
	this.xy = y;
	this.dx = 0;
	this.dy = 0;
	this.job = 0;
	this.direction = 0;
	this.move = -1;
	this.setup();
	this.domElement = this.createDomElement().appendTo(mapElement);
	this.index = objects.length;
	objects[this.index] = this;
}

SupaplexObject.prototype.createDomElement = function() {
	var $e = $('<div>').addClass('object');
	this.setupDomElement($e);
	return $e.offset({left: this.x * 40, top: this.y * 40});
}

SupaplexObject.prototype.posElement = function() {//this.view(this.dx);
	this.domElement.css('left', this.x*40+this.dx+'px').css('top', this.y*40+this.dy+'px');
}

SupaplexObject.prototype.destroy = function() {
	this.domElement.remove();
	map.set(x, y, false);
	map.set(xx, yy, false);
	objects[this.index] = false;
}

SupaplexObject.prototype.isStayInPlace = function() {
	return (this.x == this.xx && this.yy == this.yy);
}

SupaplexObject.prototype.isSpheric = function() {
	return false;
}

SupaplexObject.prototype.canMove = function(dx, dy) {
	var o = map.empty(this.x + dx, this.y + dy);
}

SupaplexObject.prototype.setup = function() {
}

SupaplexObject.prototype.setupDomElement = function($e) {
}

SupaplexObject.prototype.eatable = function() {
	return false;
}

SupaplexObject.prototype.idle = function() {
}

SupaplexObject.prototype.whereToGo = function() {
	return 0;
}

SupaplexObject.prototype.view = function(text) {
	this.domElement.empty().html(text);
}

SupaplexObject.prototype.dd = function(d) {
	var dx = 0;
	var dy = 0;
	if (d == 7 || d == 8 || d == 9) {
		dy = -1;
	}
	if (d == 1 || d == 2 || d == 3) {
		dy = 1;
	}
	if (d == 1 || d == 4 || d == 7) {
		dx = -1;
	}
	if (d == 3 || d == 6 || d == 9) {
		dx = 1;
	}
	return {x : dx, y : dy};
}

SupaplexObject.prototype.isEmpty = function(direction) {
	var d = this.dd(direction);
	return map.empty(this.x + d.x, this.y + d.y);
}

SupaplexObject.prototype.near = function(direction) {
	var d = this.dd(direction);
	return map.get(this.x + d.x, this.y + d.y);
}

SupaplexObject.prototype.isEmpty2 = function(direction) {
	var d = this.dd(direction);
	return map.empty2(this.x + d.x, this.y + d.y);
}

SupaplexObject.prototype.idleAutoMovement = function() {
	if (this.move == -1) {
		//this.view(this.direction+' '+this.move);
		this.findDirection();
		if (this.direction > 0) {
			this.move = 0;
		}
	}
	if (this.move >= 0) {
		var d = this.dd(this.direction);
		if (this.move == 0) {
			this.xx = this.x + d.x;
			this.yy = this.y + d.y;
			map.set(this.xx, this.yy, this);
		}
		this.move += 5;
		this.dx = d.x * this.move;
		this.dy = d.y * this.move;
		this.posElement();
		if (this.move >= 40) {
			this.move = -1;
			map.set(this.x, this.y, false);
			this.x = this.xx;
			this.y = this.yy;
			this.dx = 0;
			this.dy = 0;
		}
	}
}

SupaplexObject.prototype.findDirection = function() {
	var e1 = this.isEmpty(1);
	var e2 = this.isEmpty(2);
	var e3 = this.isEmpty(3);
	var e4 = this.isEmpty(4);
	var e6 = this.isEmpty(6);
	var e7 = this.isEmpty(7);
	var e8 = this.isEmpty(8);
	var e9 = this.isEmpty(9);
	
	if (!e2 && !e4 && !e6 && !e8) {
		this.direction = 0;
		return;
	}
	
	if (this.direction == 4 && e2 && e3 && !e8) this.direction = 0;
	else if (this.direction == 6 && e8 && e7 && !e2) this.direction = 0;
	else if (this.direction == 8 && e4 && e1 && !e6) this.direction = 0;
	else if (this.direction == 2 && e6 && e9 && !e4) this.direction = 0;
	
	if (this.direction == 0) {
		if (e4  && ( !e1 || !e2 )) {
			this.direction = 4;
		}
		else if (e8  && (!e7 || !e4)) {
			this.direction = 8;
		}
		else if (e6  && (!e9 || !e8)) {
			this.direction = 6;
		}
		else if (e2  && (!e6 || !e3)) {
			this.direction = 2;
		}
		else if (e4) {
			this.direction = 4;
		}
		else if (e8) {
			this.direction = 8;
		}
		else if (e6) {
			this.direction = 6;
		}
		else if (e2) {
			this.direction = 2;
		}
	}
	
	if (this.direction == 2) {
		if (e6 && !e9) this.direction = 6;
		else if (!e2) {
			if (e4) this.direction = 4;
			else if (e8) this.direction = 8;
		}
	}
	
	else if (this.direction == 4) {
		if (e2 && !e3) this.direction = 2;
		else if (!e4) {
			if (e8) this.direction = 8;
			else if (e6) this.direction = 6;
		}
	}
	
	else if (this.direction == 8) {
		if (e4 && !e1) this.direction = 4;
		else if (!e8) {
			if (e6) this.direction = 6;
			else if (e2) this.direction = 2;
		}
	}
	
	else if (this.direction == 6) {
		if (e8 && !e7) this.direction = 8;
		else if (!e6) {
			if (e2) this.direction = 2;
			else if (e4) this.direction = 4;
		}
	}
}

SupaplexObject.prototype.newCoord = function() {
	map.set(this.x, this.y, false);
	this.x = this.xx;
	this.y = this.yy;
	map.set(this.x, this.y, this);
	this.posElement();
}


SupaplexObject.prototype.idleFall = function() {//this.view(this.x);
	if (this.job == 0) {
		if (this.isEmpty(2)) {
			this.job = 2;
			this.move = 0;
			this.xx = this.x;
			this.yy = this.y+1;
			map.set(this.xx, this.yy, this);
		}
		else {
			var o = map.get(this.x, this.y+1);
			if (typeof(o)=='object') {
				if (o.job != 0) {
					this.job = 5;
					this.move = 0;
				} else if (o.isSpheric()) {
					if (this.isEmpty(1) && this.isEmpty2(4)) {
						this.job = 1;
						this.move = 0;
						this.xx = this.x-1;
						this.yy = this.y+1;
						map.set(this.xx, this.yy, this);
					}
					else if (this.isEmpty(3) && this.isEmpty2(6)) {
						this.job = 3;
						this.move = 0;
						this.xx = this.x+1;
						this.yy = this.y+1;
						map.set(this.xx, this.yy, this);
					}
				}
			}
		}
	}
	
	var o = false;
	
	if (this.job == 2) {
		this.move += 4;
		this.dx = 0;
		this.dy = this.move;
		this.posElement();
		if (this.move >=40) {
			this.job = 0;
			this.dy = 0;
			this.newCoord();
			this.move = 0;
			o = this.near(2);
			if (o) o.huyak();
		}
	}
	
	else if (this.job == 1) {
		var cp = this.rotateClass;
		var c1 = cp+'-m'+this.move;
		var c2 = cp+'-m'+(this.move+1);
		this.move += 1;
		this.dx = 0;
		this.dy = 0;
		this.domElement.removeClass(c1).addClass(c2);
		
		this.dx = -Math.floor(this.move*2.5);
		this.dy = 40 - Math.floor(2.5*Math.sqrt(256 - this.move*this.move));
		this.posElement();
		
		if (this.move >= 16) {
			this.dx = 0;
			this.dy = 0;
			this.domElement.removeClass(c2);
			this.newCoord();
			this.job = 0;
			this.move = 0;
		}
	}
	
	else if (this.job == 3) {
		var cp = this.rotateClass;
		var c1 = cp+'-'+this.move;
		var c2 = cp+'-'+(this.move+1);
		this.move += 1;
		this.dx = 0;
		this.dy = 0;
		this.domElement.removeClass(c1).addClass(c2);
		
		this.dx = Math.floor(this.move*2.5);
		this.dy = 40 - Math.floor(2.5*Math.sqrt(256 - this.move*this.move));
		this.posElement();
		
		if (this.move >= 16) {
			this.dx = 0;
			this.dy = 0;
			this.domElement.removeClass(c2);
			this.newCoord();
			this.job = 0;
			this.move = 0;
		}
	}
	
	else if (this.job == 5) {
		this.move += 1;
		if (this.move >= 8) {
			this.job = 0;
			this.move = 0;
		}
	}
}

SupaplexObject.prototype.huyak = function() {
}


SupaplexObject.prototype.isNippel = function() {
	return false;
}

SupaplexObject.prototype.afterEat = function() {
}


SupaplexObject.prototype.idleEat = function() {
	if (this.job == 52 || this.job == 58 || this.job == 54 || this.job == 56) {
		this.domElement.removeClass('eat'+this.move);
		this.move++;
		this.domElement.addClass('eat'+this.move);
		//if (this.job == 54 || this.job == 56) {
		//	this.domElement.width(40-this.move*5);
		//}
		//else if (this.job == 58 || this.job == 52) {
		//	this.domElement.height(40-this.move*5);
		//}
		if (this.move >=4 ) {
			this.afterEat();
			this.move = 0;
			this.job = 0;
			this.domElement.remove();
			objects[this.index] = false;
		}
	}
}


