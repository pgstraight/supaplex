function Bug() {
	this.status = 0;
	this.pos = 0;
	this.time = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
	this.setupDomElement = function($e) {
		$e.addClass('bug');
	}
	
	this.idle = function() {
		//this.domElement.empty().html(this.status+'-'+this.time);
		if (status==0) {
			this.time--;
			if (this.time<1) {
				this.status = 1;
				this.time = 20;
				this.pos = 1;
			}
		}
		if (this.status==1) {
			this.domElement.removeClass('bug').removeClass('bug'+this.pos);
			this.pos++;
			if (this.pos>3) {
				this.pos = 1;
			}
			this.domElement.addClass('bug'+this.pos);

			this.time--;
			if (this.time<2) {
				this.status = 0;
				this.time = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
				this.domElement.removeClass('bug'+this.pos).addClass('bug');
				this.pos = 0;
			}

		}
	}
}

Bug.prototype = SupaplexObject.prototype;

