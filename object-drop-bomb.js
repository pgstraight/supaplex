function DropBomb() {
	this.setupDomElement = function($e) {
		$e.addClass('drop-bomb');
	}
}

DropBomb.prototype = SupaplexObject.prototype;

