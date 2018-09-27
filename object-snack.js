function Snack() {
	this.pos = 1;
	this.angle = 0;
	
	this.setupDomElement = function($e) {
		$e.addClass('snack1');
	}
	
	this.idle = function() {
		this.domElement.removeClass('snack'+this.pos);
		this.pos++;
		if (this.pos>6) this.pos = 1;
		this.domElement.addClass('snack'+Math.floor(this.pos/2));
		this.idleAutoMovement();
		
		var a = 0;
		if (this.direction == 6) a = 100;
		else if (this.direction == 2) a = 200;
		if (this.direction == 4) a = -100;
		
		if (this.angle > 200) {
			this.angle -= 400;
		}
		
		if (this.angle <= -200) {
			this.angle += 400;
		}
		
		if (this.angle != a) {
			if (a == 0) {
				if (this.angle > 0) this.angle -= 25; else this.angle += 25;
			}
			if (a == 200) {
				if (this.angle > 0) this.angle += 25; else this.angle -= 25;
			}
			if (a == 100) {
				if (this.angle > -100 && this.angle < 100 ) this.angle += 25; else this.angle -= 25;
			}
			if (a == -100) {
				if (this.angle > -100 && this.angle < 100) this.angle -= 25; else this.angle += 25;
			}
		}
		this.domElement.css({transform: 'rotate('+this.angle+'grad)'})
	}
}

Snack.prototype = SupaplexObject.prototype;

