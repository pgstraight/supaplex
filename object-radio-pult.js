function RadioPult() {
	this.setupDomElement = function($e) {
		$e.addClass('radio-pult');
	}
	
	this.press = function() {
		for(var y=23; y>=0; y--) {
			for(var x=0; x<60; x++) {
				o = map.get(x,y);
				if (o) {
					o.radioExplode();
				}
			}
		}
	}
}

RadioPult.prototype = SupaplexObject.prototype;

