var levelNumber = getLevelNumber();
var levelTitle = '';
var objects = [];
var map;
var mapElement;
var targetAll = 0;
var targetEat = 0;
var gravity = false;

var keySpace = false;
var keyLeft = false;
var keyRight = false;
var keyUp = false;
var keyDown = false;

var heroObject;


function LevelMap(src)
{
	this.data = [];
	for(var y=0; y<24; y++) {
		this.data[y] = [];
		for(var x=0; x<60; x++) {
			var itemId = src[y][x];
			var object = createObject(itemId, x, y);
			this.data[y][x] = {
				object: object
			};
		}
	}
}

LevelMap.prototype.idle = function() {
	var o;
	heroObject.superIdle();
	heroObject.idleHero();
	for(var y=23; y>=0; y--) {
		for(var x=0; x<60; x++) {
			o = this.data[y][x].object;
			if (typeof(o) == 'object') {
				if (o.x == x && o.y == y) {
					o.superIdle();
					o.idle();
				}
			}
		}
	}
	//heroObject.view(heroObject.x);
	//map.set(heroObject.x, heroObject.y, heroObject);
}

LevelMap.prototype.get = function(x, y) {
	return this.data[y][x].object;
};

LevelMap.prototype.set = function(x, y, object) {
	if (object && !this.empty(x, y)) return;
	this.data[y][x].object = object;
};

LevelMap.prototype.setForce = function(x, y, object) {
	var o = this.get(x, y);
	if (o && o.id != 3) o.remove();
	this.data[y][x].object = object;
};

LevelMap.prototype.empty = function(x, y) {
	if (x<0 || x>=60 || y<0 || y>=24) return false;
	var o = this.data[y][x].object;
	if (typeof(o) != 'object') return true;
	return false;
};

LevelMap.prototype.empty2 = function(x, y) {
	if (x<0 || x>=60 || y<0 || y>=24) return false;
	var o = this.data[y][x].object;
	if (typeof(o) != 'object') return true;
	if (o.x != x || o.y != y) {
		if (o.move < 1 ) {
			return false;
		}
	}
	return false;
};

LevelMap.prototype.isNippel = function(x, y, n) {
	var dx = 0;
	var dy = 0;
	if (n == 2) dy = 1;
	if (n == 8) dy = -1;
	if (n == 4) dx = -1;
	if (n == 6) dx = 1;
	var x1 = x + dx;
	var y1 = y + dy;
	var x2 = x + dx*2;
	var y2 = y + dy*2;
	
	if (x<0 || x>=60 || y<0 || y>=24) return false;
	if (x1<0 || x1>=60 || y1<0 || y1>=24) return false;
	if (x2<0 || x2>=60 || y2<0 || y2>=24) return false;

	if (!this.empty(x2, y2)) return false;
	
	var o = this.data[y1][x1].object;
	if (typeof(o) != 'object') return false;
	
	return o.isNippel() && o.canNippel(dx, dy);
};

function getLevelNumber()
{
	var p = window.location.search;
	p = p.replace('?', '');
	return p;
}

function loadLevel(number)
{
	var src = levels[number-1];
	levelTitle = src.title;
	gravity = src.gravity;
	targetAll = src.target;
	targetEat = 0;
	$('.title').html(levelTitle);
	$('.target').html(targetEat + '/' + targetAll);
	map = new LevelMap(src.map);
	var $menu = $('.menu .levels');
	for(var i = 0; i < levels.length; i++) {
		var $a = $('<a>').attr('href', 'level.html?'+(i+1)).text(levels[i].title);
		if (number == i+1) $a.addClass('current');
		$menu.append($a);
	}
}

function createObject(id, x, y)
{
	var o = false;
	if (id==14) id=10;
	if (id==15) id=11;
	if (id==16) id=12;

	switch(id) {
		case 1:
			o = new Stone();
			break;
		case 2:
			o = new Grass();
			break;
		case 3:
			o = new Hero();
			heroObject = o;
			break;
		case 4:
			o = new Food();
			break;
		case 5: case 26: case 27: case 38: case 39:
			o = new Chip();
			break;
		case 6: case 28: case 29: case 30: case 31: case 32: case 33: case 34: case 35: case 36: case 37:
			o = new HardBlock();
			break;
		case 7:
			o = new Finish();
			break;
		case 8:
			o = new DropBomb();
			break;
		case 9: case 10: case 11: case 12: case 21: case 22: case 23:
			o = new Nippel();
			break;
		case 17:
			o = new Snack();
			break;
		case 18:
			o = new RadioBomb();
			break;
		case 19:
			o = new RadioPult();
			break;
		case 20:
			o = new HandBomb();
			break;
		case 24:
			o = new Bnya();
			break;
		case 25:
			o = new Bug();
			break;
	}

	if (!o && id>0) {
		o = new UUU();
	}
	if (o) {
		o.init(id, x, y);
	}
	return o;
}

$(function() {
	$(window).keydown(function(e) {
		switch(e.keyCode) {
			case 32: keySpace = true; break;
			case 37: keyLeft = true; break;
			case 39: keyRight = true; break;
			case 38: keyUp = true; break;
			case 40: keyDown = true; break;
		}
	});
	$(window).keyup(function(e) {
		switch(e.keyCode) {
			case 32: keySpace = false; break;
			case 37: keyLeft = false; break;
			case 39: keyRight = false; break;
			case 38: keyUp = false; break;
			case 40: keyDown = false; break;
		}
	});
});

function displayDebug() {
	var s = '[';
	if (keySpace) s += 'S';
	if (keyUp) s += 'U';
	if (keyDown) s += 'D';
	if (keyLeft) s += 'L';
	if (keyRight) s += 'R';
	s +=']';
	$('.debug').empty().html(s);
}

function kbMoveUp() {
	return keyUp && !keySpace && !keyDown && !keyLeft && !keyRight;
}

function kbMoveDown() {
	return keyDown && !keySpace && !keyUp && !keyLeft && !keyRight;
}

function kbMoveLeft() {
	return keyLeft && !keySpace && !keyUp && !keyDown && !keyRight;
}

function kbMoveRight() {
	return keyRight && !keySpace && !keyUp && !keyDown && !keyLeft;
}

function kbMove(direction) {
	if (direction == 8) return kbMoveUp();
	if (direction == 2) return kbMoveDown();
	if (direction == 4) return kbMoveLeft();
	if (direction == 6) return kbMoveRight();
	return false;
}

function kbEatUp() {
	return keyUp && keySpace && !keyDown && !keyLeft && !keyRight;
}

function kbEatDown() {
	return keyDown && keySpace && !keyUp && !keyLeft && !keyRight;
}

function kbEatLeft() {
	return keyLeft && keySpace && !keyUp && !keyDown && !keyRight;
}

function kbEatRight() {
	return keyRight && keySpace && !keyUp && !keyDown && !keyLeft;
}
