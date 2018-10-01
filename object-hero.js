function Hero() {

	this.currentClass = 'hero';
	this.waitTime = 0;

	this.setupDomElement = function($e) {
		$e.addClass('hero');
	}
	
	this.explodable = function() {
		return true;
	}
	
	this.idle = function() {
		this.idleExplode();
	}
	
	this.idleHero = function() {
		//this.view(this.x+':'+this.xx);
		if (this.job == 98 || this.job == 99) return;
		var mx = this.x*40+20+this.dx-mapElement.width()/2;
		var my = this.y*40+20+this.dy-mapElement.height()/2;
		mapElement.scrollLeft(mx);
		mapElement.scrollTop(my);
		
		if (this.job == 0) {
			this.waitTime++;
		} else {
			this.waitTime = 0;
		}
		
		if (this.waitTime>5 && this.currentClass != 'hero') {
			this.domClass('hero');
		}
		
		this.whatToDo();
		
		//this.view(this.job);
		displayDebug();
	}
	
	this.whatToDo = function() {
		if (this.job == 888) {
			if (kbMoveLeft()) {
				this.jobTo(4);
			}
			else if (kbMoveRight()) {
				this.jobTo(6);
			}
		}
		else if (this.job == 0) {
			//this.view(this.job);
			if (kbMoveLeft()) {
				this.jobTo(4);
			}
			else if (kbMoveRight()) {
				this.jobTo(6);
			}
			else if (kbMoveUp()) {
				this.jobTo(8);
			}
			else if (kbMoveDown()) {
				this.jobTo(2);
			}
			else if (kbEatUp()) {
				this.eatTo(8);
			}
			else if (kbEatDown()) {
				this.eatTo(2);
			}
			else if (kbEatLeft()) {
				this.eatTo(4);
			}
			else if (kbEatRight()) {
				this.eatTo(6);
			}
		}
		
		else if (this.job == 8) {
			this.handleMove(8);
		}
		
		else if (this.job == 2) {
			this.handleMove(2);
		}
		
		else if (this.job == 4) {
			this.handleMove(4);
		}
		
		else if (this.job == 6) {
			this.handleMove(6);
		}
		
		else if (this.job == 68) {
			this.handleRoll(8);
		}
		
		else if (this.job == 62) {
			this.handleRoll(2);
		}
		
		else if (this.job == 64) {
			this.handleRoll(4);
		}
		
		else if (this.job == 66) {
			this.handleRoll(6);
		}
		
		else if (this.job == 78) {
			this.handleNippel(8);
		}
		
		else if (this.job == 72) {
			this.handleNippel(2);
		}
		
		else if (this.job == 74) {
			this.handleNippel(4);
		}
		
		else if (this.job == 76) {
			this.handleNippel(6);
		}
		
		else if (this.job == 84 || this.job == 86 || this.job == 88 || this.job == 82) {
			var direction = this.job - 80;
			this.domClass('roll-to-'+direction);
			this.move++;
			if (this.move == 8) {
				var direction = this.job - 80;
				var o = this.near(direction);
				if (o && o.rollable(direction) && kbMove(direction)) {
					var d = this.dd(direction);
					this.move = 0;
					this.job = 60 + direction;
					this.xx = this.x + d.x;
					this.yy = this.y + d.y;
					this.dx = 0;
					this.dy = 0;
					o.rollTo(direction);
				}
			}
			else if (this.move > 8) {
				this.job = 0;
				this.move = 0;
				this.domClass('hero');
			}
		}
		
		else if (this.job == 5) {
			this.move++;
			if (this.move >= 4) {
				this.move = 0;
				this.job = 0;
				this.domClass('hero');
			}
		}
	}
	
	this.jobTo = function(direction) {
		if (this.isEmpty(direction)) {
			this.moveTo(direction);
		}
		else {
			var o = this.near(direction);
			if (o && o.eatable()) {
				if (o.job > 0) {
					this.explode(this.x, this.y);
				} else {
					o.job = 50+direction;
					o.move = 0;
					this.moveTo(direction);
				}
			} else if (map.isNippel(this.x, this.y, direction)) {
				this.nippelTo(direction);
			} else if (o.rollable(direction)) {
				if (this.job == 0) {
					this.job = 80 + direction;
					this.move = 0;
				} else if (this.job == 80 + direction) {
					var d = this.dd(direction);
				}
			} else {
				o.press();
			}
		}
	}
	
	this.eatTo = function(direction) {
		if (this.isEmpty2(direction)) {
			return;
		}
		else {
			var o = this.near(direction);
			if (o && o.eatable()) {
				if (o.job > 0) {
					this.explode(this.x, this.y);
				} else {
					this.domClass('eat-to-'+direction);
					this.job = 5;
					this.move = 0;
					o.job = 50+direction;
					o.move = 0;
				}
			}
		}
	}
	
	this.moveTo = function(direction) {
		var d = this.dd(direction);
		this.job = direction;
		this.xx = this.x + d.x;
		this.yy = this.y + d.y;
		this.move = 0;
		this.dx = 0;
		this.dy = 0;
		map.set(this.xx, this.yy, this);
	}
	
	this.nippelTo = function(direction) {
		var d = this.dd(direction);
		this.job = 70+direction;
		this.xx = this.x + d.x*2;
		this.yy = this.y + d.y*2;
		this.move = 0;
		this.dx = 0;
		this.dy = 0;
		map.set(this.xx, this.yy, this);
	}
	
	this.domClass = function(c) {
		this.domElement.removeClass(this.currentClass);
		this.domElement.addClass(c);
		this.currentClass = c;
	}
	
	this.handleMove = function(direction) {
		//this.view(this.x+':'+this.xx);
		var d = this.dd(direction);
		this.move ++;
		this.domClass('hero-move'+direction+this.move)
		this.dx = this.move*d.x*5;
		this.dy = this.move*d.y*5;
		if (this.move >= 8) {
			if (this.job == 8 && gravity) {
				this.job = 888;
			} else {
				this.job = 0;
			}
			this.dx = 0;
			this.dy = 0;
			this.move = 0;
			this.newCoord();
			map.setForce(this.x, this.y, this);
			//$('.debug1').append(this.x+':'+this.y+'/'+map.get(this.x, this.y).id+' ');
			this.whatToDo();
		}
		this.posElement();
	}
	
	this.handleRoll = function(direction) {
		var d = this.dd(direction);
		this.move ++;
		this.dx = this.move*d.x*5;
		this.dy = this.move*d.y*5;
		if (this.move >= 8) {
			this.job = 80 + direction;
			this.dx = 0;
			this.dy = 0;
			this.move = 0;
			this.newCoord();
		}
		this.posElement();
	}
	
	this.handleNippel = function(direction) {
		var d = this.dd(direction);
		this.move ++;
		this.domClass('hero-nippel'+this.move)
		this.dx = d.x*this.move*10;
		this.dy = d.y*this.move*10;
		if (this.move >= 8) {
			this.job = 0;
			this.dx = 0;
			this.dy = 0;
			this.move = 0;
			this.newCoord();
			this.domClass('hero')
			this.whatToDo();
		}
		this.posElement();
	}
}

Hero.prototype = SupaplexObject.prototype;

