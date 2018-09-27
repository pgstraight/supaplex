function UUU() {
	this.setupDomElement = function($e) {
		$e.addClass('uuu').html(this.id);
	}
}

UUU.prototype = SupaplexObject.prototype;

