import Supaplex from '../../../supaplex';
import $ from "jquery";

import './index.scss';

class ObjectBase
{
	constructor()
	{
		this.id = 0;
		this.x = 0;
		this.y = 0;
		this.xx = 0;
		this.yy = 0;
		this.dx = 0;
		this.dy = 0;
		this.job = 0;
		this.index = 0;
		this.direction = 0;
		this.move = -1;
		this.rotatePos = 0;
		this.explodePos = 0;
		this.eatPos = 0;
		this.pos = 0;
		this.angle = 0;
		this.debugMessage = '';
		this.element = false;
		this.isAlive = true;
		
		this.debugElement = false;
		this.contentElement = false;
	}
	
	init(id, x, y)
	{
		this.id = id;
		this.x = x;
		this.y = y;
		this.xx = x;
		this.yy = y;
	}
	
	createElement()
	{
		this.element = $('<div>').addClass('c-object').addClass(this.mainClass());
		this.debugElement = $('<em>').appendTo(this.element);
		this.contentElement = $('<span>').append(this.blockContent()).appendTo(this.element);
		this.posElement();
		return this.element;
	}
	
	view(message)
	{
		this.debugMessage = message;
		this.debugElement.empty().append(message);
	}
	
	mainClass()
	{
		return 'c-object';
	}
	
	blockContent()
	{
		//return this.id;
		return '';
	}
	
	posElement()
	{
		this.element
			.css('left', this.x * 40 + this.dx + 'px')
			.css('top',  this.y * 40 + this.dy + 'px')
		;
		this.modifyElement();
		this.handleEatElement();
		this.handleExplodeElement();
	}
	
	handleExplodeElement()
	{
		if (this.explodePos > 1) {
			this.element.removeClass('c-explode-' + (this.explodePos - 1));
		}
		if (this.explodePos > 0) {
			this.element.addClass('c-explode-' + this.explodePos);
		}
	}
	
	handleEatElement()
	{
		if (this.job == 52 || this.job == 58 || this.job == 54 || this.job == 56) {
			if (this.eatPos > 1) {
				this.element
					.removeClass('c--eat' + this.job + '-' + (this.eatPos - 1))
					.removeClass('c--eat-' + (this.eatPos - 1))
				;
			}
			if (this.eatPos > 0) {
				this.element
					.addClass('c--eat' + this.job + '-' + this.eatPos)
					.addClass('c--eat-' + this.eatPos)
				;
			}
			if (this.move > 3) {
				this.element.addClass('c--eat-0')
			}
		}
	}
	
	modifyElement()
	{
	}
	
	destroy()
	{
		if (this.element) {
			this.element.remove();
		}
		Supaplex.set(this.x, this.y, false);
		Supaplex.set(this.xx, this.yy, false);
	}

	isStayInPlace()
	{
		return (this.x == this.xx && this.yy == this.yy);
	}

	isSpheric()
	{
		return false;
	}
	
	eatable()
	{
		return false;
	}
	
	dd(d)
	{
		let dx = 0;
		let dy = 0;
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
		return {
			x : dx,
			y : dy
		};
	}
	
	isEmpty(direction)
	{
		let d = this.dd(direction);
		return Supaplex.empty(this.x + d.x, this.y + d.y);
	}
	
	near(direction)
	{
		let d = this.dd(direction);
		return Supaplex.get(this.x + d.x, this.y + d.y);
	}

	isEmpty2(direction)
	{
		let d = this.dd(direction);
		return Supaplex.empty2(this.x + d.x, this.y + d.y);
	}
	
	isEmpty3(direction)
	{
		let d = this.dd(direction);
		return Supaplex.empty3(this.x + d.x, this.y + d.y);
	}
	
	isEmptyOrHero(direction)
	{
		let d = this.dd(direction);
		let o = Supaplex.get(this.x + d.x, this.y + d.y);
		if (!o) {
			return true;
		}
		if (o.id == 3 && o.job != direction) {
			return true;
		}
		return false;
	}
	
	idleAutoMovement()
	{
		if (this.move == -1) {
			this.findDirection();
			if (this.direction > 0) {
				this.move = 0;
			}
		}
		if (this.move >= 0) {
			let d = this.dd(this.direction);
			if (this.move == 0) {
				this.xx = this.x + d.x;
				this.yy = this.y + d.y;
				Supaplex.set(this.xx, this.yy, this);
			}
			this.move += 5;
			this.dx = d.x * this.move;
			this.dy = d.y * this.move;
			this.posElement();
			if (this.move >= 40) {
				this.move = -1;
				Supaplex.set(this.x, this.y, false);
				this.x = this.xx;
				this.y = this.yy;
				this.dx = 0;
				this.dy = 0;
			}
		}
	}
	
	findDirection()
	{
		let e1 = this.isEmptyOrHero(1);
		let e2 = this.isEmptyOrHero(2);
		let e3 = this.isEmptyOrHero(3);
		let e4 = this.isEmptyOrHero(4);
		let e6 = this.isEmptyOrHero(6);
		let e7 = this.isEmptyOrHero(7);
		let e8 = this.isEmptyOrHero(8);
		let e9 = this.isEmptyOrHero(9);
		
		if (!e2 && !e4 && !e6 && !e8) {
			this.direction = 0;
			return;
		}
		
		if (this.direction == 4 && e2 && e3 && !e8) {
			this.direction = 0;
		}
		else if (this.direction == 6 && e8 && e7 && !e2) {
			this.direction = 0;
		}
		else if (this.direction == 8 && e4 && e1 && !e6) {
			this.direction = 0;
		}
		else if (this.direction == 2 && e6 && e9 && !e4) {
			this.direction = 0;
		}
		
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
		
		let o = this.near(this.direction);
		if (o.id == 3) {
			this.explode(this.x, this.y);
		}
	}
	
	newCoord()
	{
		Supaplex.set(this.x, this.y, false);
		this.x = this.xx;
		this.y = this.yy;
		Supaplex.set(this.x, this.y, this);
		this.posElement();
	}
	
	idleRoll()
	{
		//this.view(this.job);
		if (this.job == 44 || this.job == 46 || this.job == 48 || this.job == 42) {
			let direction = this.job - 40;
			let d = this.dd(direction);
			this.move++;
			if (this.move > 7) {
				this.x = this.xx;
				this.y = this.yy;
				this.move = 0;
				this.job = 0;
				this.dx = 0;
				this.dy = 0;
				this.rotatePos = 0;
				Supaplex.set(this.x, this.y, this);
			} else {
				this.dx += d.x*5;
				this.dy += d.y*5;
				if (this.job == 44) {
					this.rotatePos = - this.move * 2;
				}
				else if (this.job == 46) {
					this.rotatePos = this.move * 2;
				}
			}
			this.posElement();
		}
	}
	
	idleFall()
	{
		let o;
		if (this.job == 0) {
			if (this.isEmpty(2)) {
				this.job = 2;
				this.move = 0;
				this.xx = this.x;
				this.yy = this.y + 1;
				Supaplex.set(this.xx, this.yy, this);
			}
			else {
				o = Supaplex.get(this.x, this.y + 1);
				if (typeof(o)=='object') {
					if ((o.job != 0 && o.job !=1 && o.job != 3) || o.move > 8) {
						this.job = 5;
						this.move = 0;
					} else if (this.isSpheric() && o.isSpheric()) {
						if (this.isEmpty(1) && this.isEmpty3(4)) {
							this.job = 1;
							this.move = 0;
							this.xx = this.x - 1;
							this.yy = this.y + 1;
							Supaplex.set(this.xx, this.yy, this);
						}
						else if (this.isEmpty(3) && this.isEmpty3(6)) {
							this.job = 3;
							this.move = 0;
							this.xx = this.x + 1;
							this.yy = this.y + 1;
							Supaplex.set(this.xx, this.yy, this);
						}
					}
				}
			}
		}
		
		o = false;
		
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
					if (o.explodable()) o.explode(this.x, this.y + 1);
					else if (this.explodable()) this.explode(this.x, this.y);
				}
			}
		}
		
		else if (this.job == 1) {
			this.move += 1;
			this.dx = 0;
			this.dy = 0;
			this.rotatePos = -this.move;
			
			this.dx = -Math.floor(this.move * 2.5);
			this.dy = 40 - Math.floor(2.5 * Math.sqrt(256 - this.move * this.move));
			this.posElement();
			
			if (this.move >= 16) {
				this.dx = 0;
				this.dy = 0;
				this.newCoord();
				this.job = 0;
				this.move = 0;
				this.rotatePos = 0;
				o = this.near(2);
				if (o) {
					if (o.explodable()) o.explode(this.x, this.y + 1);
					else if (this.explodable()) this.explode(this.x, this.y + 1);
				}
			}
		}
		
		else if (this.job == 3) {
			this.move += 1;
			this.dx = 0;
			this.dy = 0;
			this.rotatePos = this.move;
			
			this.dx = Math.floor(this.move * 2.5);
			this.dy = 40 - Math.floor(2.5 * Math.sqrt(256 - this.move * this.move));
			this.posElement();
			
			if (this.move >= 16) {
				this.dx = 0;
				this.dy = 0;
				this.newCoord();
				this.job = 0;
				this.move = 0;
				this.rotatePos = 0;
				if (o) {
					if (o.explodable()) o.explode(this.x, this.y + 1);
					else if (this.explodable()) this.explode(this.x, this.y + 1);
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
	
	isNippel()
	{
		return false;
	}

	rollable()
	{
		return false;
	}

	solid()
	{
		return false;
	}

	beforeEat()
	{
	}

	afterEat()
	{
	}

	explodable()
	{
		return false;
	}
	
	radioExplode()
	{
	}

	press() {
	}
	
	rollTo(direction)
	{
		let d = this.dd(direction);
		this.job = 40 + direction;
		this.move = 0;
		this.xx = this.x + d.x;
		this.yy = this.y + d.y;
		Supaplex.set(this.xx, this.yy, this);
	}

	waitExplode()
	{
		if (this.explodable()) {
			this.job = 98;
			this.move = 0;
		}
	}

	afterExplode()
	{
		this.destroy();
	}
	
	idleExplode()
	{
		if (this.job == 99) {
			this.move++;
			if (this.move > 6) {
				this.job = 0;
				this.move = 0;
				this.afterExplode();
			} else {
				this.explodePos = this.move;
			}
		}
		
		else if (this.job == 98) {
			this.move++;
			if (this.move > 7) {
				this.explode(this.x, this.y);
			}
		}
		this.posElement();
	}
	
	explode(ex, ey)
	{
		//this.view(this.y);
		this.job = 99;
		this.move = 0;
		this.dx = 0;
		this.dy = 0;
		Supaplex.set(this.x, this.y, false);
		Supaplex.set(this.xx, this.yy, false);
		Supaplex.set(ex, ey, this);
		this.x = ex;
		this.y = ey;
		this.xx = ex;
		this.yy = ey;
		this.posElement();
		
		for (let y = -1; y < 2; y++) {
			for (let x = -1; x < 2; x++) {
				if (x != 0 || y != 0) {
					let o = Supaplex.get(this.x + x, this.y + y);
					if (o && !o.solid()) {
						//this.view(o.solid());
						if (o.explodable()) {
							o.waitExplode();
						} else {
							o.destroy();
							o = Supaplex.level.explosion(this.x + x, this.y + y);
							o.job = 99;
						}
					}
					else if (!o) {
						o = Supaplex.level.explosion(this.x + x, this.y + y);
						o.job = 99;
					}
				}
			}
		}
	}
	
	fillFood()
	{
		let xx = this.x;
		let yy = this.y;
		this.destroy();
		for (let y = yy - 1; y < yy + 2; y++) {
			for (let x = xx - 1; x < xx + 2; x++) {
				let o = Supaplex.get(x, y);
				if (o && o.id == 51) {
					o.destroy();
					o = false;
				}
				if (!o) {
					o = Supaplex.level.food(x, y);
					o.posElement();
				}
			}
		}
	}
	
	idleEat()
	{
		//this.view(this.job + ':' + this.eatPos);
		if (this.job == 52 || this.job == 58 || this.job == 54 || this.job == 56) {
			//console.log(this.job + ':' + this.eatPos);
			//console.log(this.move);
			if (this.move < 4) {
				this.move++;
				this.eatPos = this.move;
				this.posElement();
			}
			else if (this.move < 8) {
				this.move++;
			}
			else {
				this.afterEat();
				this.destroy();
			}
		}
	}
	
	idle()
	{
	}
}

export default ObjectBase;
