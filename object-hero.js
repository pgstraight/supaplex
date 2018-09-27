function Hero() {

	this.currentClass = 'hero';
	this.waitTime = 0;

	this.setupDomElement = function($e) {
		$e.addClass('hero');
	}
	
	this.idle = function() {
	}
	
	this.idleHero = function() {
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
		if (this.job == 0) {
			if (kbMoveUp()) {
				this.jobTo(8);
			}
			else if (kbMoveDown()) {
				this.jobTo(2);
			}
			else if (kbMoveLeft()) {
				this.jobTo(4);
			}
			else if (kbMoveRight()) {
				this.jobTo(6);
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
				o.job = 50+direction;
				o.move = 0;
				this.moveTo(direction);
			} else if (map.isNippel(this.x, this.y, direction)) {
				this.nippelTo(direction);
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
				this.domClass('eat-to-'+direction);
				this.job = 5;
				this.move = 0;
				o.job = 50+direction;
				o.move = 0;
				map.set(o.x, o.y, false);
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
		var d = this.dd(direction);
		this.move ++;
		this.domClass('hero-move'+direction+this.move)
		this.dx = this.move*d.x*5;
		this.dy = this.move*d.y*5;
		if (this.move >= 8) {
			this.job = 0;
			this.dx = 0;
			this.dy = 0;
			this.move = 0;
			this.newCoord();
			this.whatToDo();
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
	
	this.huyak = function() {
		this.view('boom');
	}
	
}

Hero.prototype = SupaplexObject.prototype;

