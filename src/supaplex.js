import levels from './levels.js';
import $ from "jquery";

class SupaplexStore
{
	constructor() {
		this.appContainer = $('#app-root-container');
		this.statusbar = false;
		this.board = false;
		this.level = false;
		this.hero = false;
		
		this.levelId = 0;
		this.levelTitle = '';
		
		this.keySpace = false;
		this.keyLeft = false;
		this.keyRight = false;
		this.keyUp = false;
		this.keyDown = false;
		
		this.handBombs = 0;
		this.handBomb = false;
	}

	getStoredLevel()
	{
		let n = localStorage.getItem('storedLevel');
		if (n === undefined || n == null) {
			n = 0;
		}
		return n;
	}
	
	setStoredLevel(n)
	{
		let stored = this.getStoredLevel();
		if (n > stored) {
			localStorage.setItem('storedLevel', n);
		}
	}

	initLevel(id)
	{
		this.levelId = id;
		var data = levels[id];
		
		this.levelTitle = data.title;
		this.mapSource = data.map;
		this.counter = data.target;
		this.mapOptions = data.options;
		this.gravity = data.gravity;
		
		this.map = [];
		for (let y = 0; y < 24; y++) {
			this.map[y] = [];
			for (let x = 0; x < 60; x++) {
				this.map[y][x] = false;
			}
		}
	}
	
	oCount()
	{
		return this.objects.length;
	}
	
	addObject(object)
	{
		this.objects.push(object);
	}
	
	get(x, y)
	{
		if (x<0 || x>=60 || y<0 || y>=24) {
			return false;
		}
		return this.map[y][x];
	}

	set(x, y, object)
	{
		if (x<0 || x>=60 || y<0 || y>=24) {
			return;
		}
		if (object && !this.empty(x, y)) {
			return;
		}
		this.map[y][x] = object;
	}

	setForce(x, y, object)
	{
		let o = this.get(x, y);
		if (o && o.id != 3) {
			o.destroy();
		}
		this.map[y][x] = object;
	}

	empty(x, y)
	{
		if (x<0 || x>=60 || y<0 || y>=24) {
			return false;
		}
		let o = this.map[y][x];
		if (typeof(o) != 'object') {
			return true;
		}
		return false;
	}

	empty2(x, y)
	{
		if (x<0 || x>=60 || y<0 || y>=24) {
			return false;
		}
		let o = this.map[y][x];
		if (typeof(o) != 'object') {
			return true;
		}
		if (o.x != x || o.y != y) {
			if (o.move < 1 ) {
				return false;
			}
		}
		return false;
	}

	empty3(x, y)
	{
		if (x<0 || x>=60 || y<0 || y>=24) {
			return false;
		}
		let o = this.map[y][x];
		if (typeof(o) != 'object') {
			return true;
		}
		if (o.x != x || o.y != y || o.xx != x || o.yy != y) {
			if (o.move < 1 ) {
				return false;
			}
		}
		return false;
	}
	
	isNippel(x, y, n)
	{
		let dx = 0;
		let dy = 0;
		
		if (n == 2) {
			dy = 1;
		}
		
		else if (n == 8) {
			dy = -1;
		}
		
		else if (n == 4) {
			dx = -1;
		}
		
		else if (n == 6) {
			dx = 1;
		}
		
		let x1 = x + dx;
		let y1 = y + dy;
		let x2 = x + dx * 2;
		let y2 = y + dy * 2;
		
		if (x < 0 || x >= 60 || y < 0 || y >= 24) {
			return false;
		}
		
		if (x1 < 0 || x1 >= 60 || y1 < 0 || y1 >= 24) {
			return false;
		}
		
		if (x2 < 0 || x2 >= 60 || y2 < 0 || y2 >= 24) {
			return false;
		}
		
		if (!this.empty(x2, y2)) {
			return false;
		}
		
		let o = this.map[y1][x1];
		if (typeof(o) != 'object') {
			return false;
		}
		//console.log('nip', n, o.isNippel(), o.canNippel(dx, dy));
		return o.isNippel() && o.canNippel(dx, dy);
	}
	
	runTimer()
	{
		let time = 0;
		let Supaplex = this;
		
		(function gameloop(timestamp) {
			if (timestamp > time) {
				Supaplex.idle();
				time = timestamp + 30;
			}
			requestAnimationFrame(gameloop);
		})();
		
	}
	
	idle() {
		this.hero.idleHero();
		for(let y = 23; y >= 0; y--) {
			for(let x = 0; x < 60; x++) {
				let o = this.map[y][x];
				if (typeof(o) == 'object') {
					if (o.x == x && o.y == y) {
						o.idle();
					}
				}
			}
		}
		
		if (this.handBomb) {
			this.handBomb.idleReady();
		}
		
		this.statusbar.setTitle(this.levelTitle);
		this.statusbar.setFoods(this.counter);
		this.statusbar.setBombs(this.handBombs);
	}
}

var Supaplex = new SupaplexStore;

export default Supaplex;
