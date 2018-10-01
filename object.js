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
	this.yy = y;
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
	if (this.explodable()) this.idleExplode();
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

SupaplexObject.prototype.isEmptyOrHero = function(direction) {
	var d = this.dd(direction);
	var o = map.get(this.x + d.x, this.y + d.y);
	if (!o) return true;
	if (o.id == 3 && o.job != direction) return true;
	return false;
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
	var e1 = this.isEmptyOrHero(1);
	var e2 = this.isEmptyOrHero(2);
	var e3 = this.isEmptyOrHero(3);
	var e4 = this.isEmptyOrHero(4);
	var e6 = this.isEmptyOrHero(6);
	var e7 = this.isEmptyOrHero(7);
	var e8 = this.isEmptyOrHero(8);
	var e9 = this.isEmptyOrHero(9);
	
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
	
	var o = this.near(this.direction);
	if (o.id == 3) {
		this.explode(this.x, this.y);
	}
}

SupaplexObject.prototype.superIdle = function() {
	//this.view(this.x+':'+this.xx);
	//var o = map.get(heroObject.x, heroObject.y);
	//if (o) this.view(o.id); else this.view('?');
}

SupaplexObject.prototype.newCoord = function() {
	map.set(this.x, this.y, false);
	this.x = this.xx;
	this.y = this.yy;
	map.set(this.x, this.y, this);
	this.posElement();
}

SupaplexObject.prototype.addRollClass = function() {
}

SupaplexObject.prototype.removeRollClass = function() {
}

SupaplexObject.prototype.idleRoll = function() {
	if (this.job == 94 || this.job == 96 || this.job == 98 || this.job == 92) {
		var direction = this.job - 90;
		var d = this.dd(direction);
		this.removeRollClass();
		this.move++;
		if (this.move > 7){
			this.x = this.xx;
			this.y = this.yy;
			this.move = 0;
			this.job = 0;
			this.dx = 0;
			this.dy = 0;
			map.set(this.x, this.y, this);
		} else {
			this.addRollClass();
			this.dx += d.x*5;
			this.dy += d.y*5;
		}
		this.posElement();
	}
}

SupaplexObject.prototype.idleFall = function() {//this.view(this.job);
	if (this.job == 0) {
		if (this.isEmpty(2)) {
			this.job = 2;
			this.move = 0;
			this.xx = this.x;
			this.yy = this.y + 1;
			map.set(this.xx, this.yy, this);
		}
		else {
			var o = map.get(this.x, this.y+1);
			if (typeof(o)=='object') {
				if (o.job != 0) {
					this.job = 5;
					this.move = 0;
				} else if (this.isSpheric() && o.isSpheric()) {
					if (this.isEmpty(1) && this.isEmpty(4)) {
						this.job = 1;
						this.move = 0;
						this.xx = this.x-1;
						this.yy = this.y+1;
						map.set(this.xx, this.yy, this);
					}
					else if (this.isEmpty(3) && this.isEmpty(6)) {
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
			if (o) {
				if (o.explodable()) o.explode(this.x, this.y+1);
				else if (this.explodable()) this.explode(this.x, this.y);
			}
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
			o = this.near(2);
			if (o) {
				if (o.explodable()) o.explode(this.x, this.y+1);
				else if (this.explodable()) this.explode(this.x, this.y+1);
			}
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
			if (o) {
				if (o.explodable()) o.explode(this.x, this.y+1);
				else if (this.explodable()) this.explode(this.x, this.y+1);
			}
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

SupaplexObject.prototype.isNippel = function() {
	return false;
}

SupaplexObject.prototype.rollable = function() {
	return false;
}

SupaplexObject.prototype.solid = function() {
	return false;
}

SupaplexObject.prototype.afterEat = function() {
}

SupaplexObject.prototype.explodable = function() {
	return false;
}

SupaplexObject.prototype.afterEat = function() {
}

SupaplexObject.prototype.radioExplode = function() {
}

SupaplexObject.prototype.press = function() {
}

SupaplexObject.prototype.remove = function() {
	this.domElement.remove();
	var o = map.get(this.x, this.y);
	if (o && o.index == this.index) {
		map.set(this.x, this.y, false);
	}
	objects[this.index] = false;
}

SupaplexObject.prototype.rollTo = function(direction) {
	var d = this.dd(direction);
	this.job = 90 + direction;
	this.move = 0;
	this.xx = this.x + d.x;
	this.yy = this.y + d.y;
	map.set(this.xx, this.yy, this);
}

SupaplexObject.prototype.waitExplode = function() {
	if (this.explodable()) {
		this.job = 98;
		this.move = 0;
	}
}

SupaplexObject.prototype.afterExplode = function() {
	this.remove();
}

SupaplexObject.prototype.idleExplode = function() {
	if (this.job == 99) {
		if (this.move > 0) {
			this.domElement.removeClass('explode-'+(this.move-1));
		}
		this.move++;
		if (this.move > 5) {
			this.job = 0;
			this.move = 0;
			this.afterExplode();
		} else {
			this.domElement.addClass('explode-'+this.move);
			this.posElement();
		}
	}
	
	else if (this.job == 98) {
		this.move++;
		if (this.move > 7) {
			this.explode(this.x, this.y);
		}
	}
}

SupaplexObject.prototype.explode = function(ex, ey) {
	this.view(this.y);
	this.job = 99;
	this.move = 0;
	this.dx = 0;
	this.dy = 0;
	map.set(this.x, this.y, false);
	map.set(this.xx, this.yy, false);
	map.set(ex, ey, this);
	this.x = ex;
	this.y = ey;
	this.xx = ex;
	this.yy = ey;
	this.posElement();
	
	for (var y = -1; y<2; y++) {
		for (var x = -1; x<2; x++) {
			if (x != 0 || y != 0) {
				o = map.get(this.x + x, this.y + y);
				if (o && !o.solid()) {
					this.view(o.solid());
					if (o.explodable()) {
						o.waitExplode();
					} else {
						o.remove();
						o = new Explosion();
						o.init(51, this.x + x, this.y + y);
						map.set(this.x + x, this.y + y, o);
						o.job = 99;
					}
				}
				else if (!o) {
					o = new Explosion();
					o.init(51, this.x + x, this.y + y);
					map.set(this.x + x, this.y + y, o);
					o.job = 99;
				}
			}
		}
	}
}

SupaplexObject.prototype.fillFood = function() {
	var xx = this.x;
	var yy = this.y;
	this.remove();
	for (var y = yy-1; y<yy+2; y++) {
		for (var x = xx-1; x<xx+2; x++) {
			o = map.get(x, y);
			if (o && o.id == 51) {
				o.remove();
				o = false;
			}
			if (!o) {
				o = new Food();
				o.init(4, x, y);
				map.set(x, y, o);
				o.posElement();
			}
		}
	}
}


SupaplexObject.prototype.idleEat = function() {
	//this.view(this.job);
	if (this.job == 52 || this.job == 58 || this.job == 54 || this.job == 56) {
		this.domElement.css('border', '1px solid red');
		if (this.move < 4) {
			this.domElement.removeClass('eat'+this.move);
			this.move++;
			this.domElement.addClass('eat'+this.move);
		}
		else if (this.move < 8) {
			this.move++;
		}
		else {
			this.afterEat();
			this.remove();
		}
	}
}


