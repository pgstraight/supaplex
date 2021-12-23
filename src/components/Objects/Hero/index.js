import $ from "jquery";
import Supaplex from '../../../supaplex';
import kb from '../../KB';
import BaseObject from '../Base';

import './index.scss';

class ObjectHero extends BaseObject
{
	constructor()
	{
		super();
		this.waitTime = 0;
		this.status = 'default';
		this.spaceTime = 0;
	}
	
	mainClass()
	{
		return 'c-object-hero c-object-hero--default';
	}
	
	blockContent()
	{
		return '';
	}
	
	explodable()
	{
		return true;
	}
	
	idle()
	{
		this.idleExplode();
		if (this.job == 0 && Supaplex.handBombs > 0 && !Supaplex.handBomb) {
			if (kb.space()) {
				this.spaceTime++;
				if (this.spaceTime > 30) {
					this.setStatus('bomb1');
				}
				if (this.spaceTime > 35) {
					this.setStatus('bomb2');
				}
				if (this.spaceTime > 40) {
					this.setStatus('bomb3');
				}
				if (this.spaceTime > 50) {
					this.setStatus('default');
					Supaplex.level.spawnBomb(this.x, this.y);
					Supaplex.handBombs--;
				}
			} else {
				this.spaceTime = 0;
				this.setStatus('default');
			}
		}
	}
	
	setStatus(status)
	{
		if (this.status != status) {
			this.element.removeClass('c-object-hero--' + this.status);
		}
		this.status = status;
		this.element.addClass('c-object-hero--' + this.status);
	}
	
	idleHero() {
		if (this.job == 98 || this.job == 99) {
			return;
		}
		let mx = this.x * 40 + 20 + this.dx - Supaplex.board.element.width() / 2;
		let my = this.y * 40 + 20 + this.dy - Supaplex.board.element.height() / 2;

		Supaplex.board.element.scrollLeft(mx);
		Supaplex.board.element.scrollTop(my);
		
		if (this.job == 0) {
			this.waitTime++;
		} else {
			this.waitTime = 0;
		}
		
		if (this.waitTime > 5 && this.status != 'default') {
			this.setStatus('default');
		}
		
		this.whatToDo();
	}
	
	jobTo(direction) {
		if (this.isEmpty(direction)) {
			this.moveTo(direction);
		}
		else {
			let o = this.near(direction);
			if (o && o.painfull()) {
				this.explode(this.x, this.y);
			} else if (o && o.eatable()) {
				if (o.job > 0) {
					this.explode(this.x, this.y);
				} else {
					o.beforeEat();
					o.job = 50 + direction;
					o.move = 0;
					this.moveTo(direction);
				}
			} else if (Supaplex.isNippel(this.x, this.y, direction)) {
				this.nippelTo(direction);
			} else if (o.rollable(direction)) {
				if (this.job == 0) {
					this.job = 80 + direction;
					this.move = 0;
				} else if (this.job == 80 + direction) {
					let d = this.dd(direction);
				}
			} else {
				o.press();
			}
		}
	}
	
	eatTo(direction) {
		if (this.isEmpty2(direction)) {
			return;
		}
		else {
			let o = this.near(direction);
			if (o && o.eatable()) {
				this.setStatus('eat-to-' + direction);
				this.job = 5;
				this.move = 0;
				o.beforeEat();
				o.job = 50 + direction;
				o.move = 0;
			}
		}
	}
	
	moveTo(direction) {
		let d = this.dd(direction);
		this.job = direction;
		this.xx = this.x + d.x;
		this.yy = this.y + d.y;
		this.move = 0;
		this.dx = 0;
		this.dy = 0;
		Supaplex.set(this.xx, this.yy, this);
	}
	
	nippelTo(direction) {
		this.near(direction).handle();
		let d = this.dd(direction);
		this.job = 70 + direction;
		this.xx = this.x + d.x*2;
		this.yy = this.y + d.y*2;
		this.move = 0;
		this.dx = 0;
		this.dy = 0;
		Supaplex.set(this.xx, this.yy, this);
	}
	
	handleGravity(direction) {
		this.move++;
		this.dy = this.move * 5;
		if (this.move >= 8) {
			this.job = 0;
			this.dx = 0;
			this.dy = 0;
			this.move = 0;
			this.newCoord();
			Supaplex.setForce(this.x, this.y, this);
			if (kb.moveLeft() && !this.isEmpty(1)) {
				this.jobTo(4);
			}
			else if (kb.moveRight() && !this.isEmpty(3)) {
				this.jobTo(6);
			}
			else this.job = 0;
			this.whatToDo();
		}
		this.posElement();
	}
	
	handleMove(direction) {
		let d = this.dd(direction);
		this.move ++;
		this.setStatus('move' + direction + Math.ceil(this.move / 2))
		this.dx = this.move * d.x * 5;
		this.dy = this.move * d.y * 5;
		if (this.move >= 8) {
			if (this.job == 8 && Supaplex.gravity) {
				this.job = 888;
			} else {
				this.job = 0;
			}
			this.dx = 0;
			this.dy = 0;
			this.move = 0;
			this.newCoord();
			Supaplex.setForce(this.x, this.y, this);
			this.whatToDo();
		}
		this.posElement();
	}
	
	handleRoll(direction) {
		let d = this.dd(direction);
		this.move ++;
		this.dx = this.move * d.x * 5;
		this.dy = this.move * d.y * 5;
		if (this.move >= 8) {
			this.job = 80 + direction;
			this.dx = 0;
			this.dy = 0;
			this.move = 0;
			this.newCoord();
		}
		this.posElement();
	}
	
	handleNippel(direction) {
		let d = this.dd(direction);
		this.move ++;
		this.setStatus('nippel' + this.move)
		this.dx = d.x * this.move * 10;
		this.dy = d.y * this.move * 10;
		if (this.move >= 8) {
			this.job = 0;
			this.dx = 0;
			this.dy = 0;
			this.move = 0;
			this.newCoord();
			this.setStatus('default')
			this.whatToDo();
		}
		this.posElement();
	}
	
	whatToDo() {
		if (this.job == 888) {
			if (kb.moveLeft() && !this.isEmpty(1)) {
				this.jobTo(4);
			}
			else if (kb.moveRight() && !this.isEmpty(3)) {
				this.jobTo(6);
			}
			else this.job = 0;
			return;
		}
		if (this.job == 222) {
			this.handleGravity();
			return;
		}
		if (this.job == 0) {
			if (Supaplex.gravity && this.isEmpty(2)) {
				this.job = 222;
				this.move = 0;
				this.xx = this.x;
				this.yy = this.y + 1;
				this.dx = 0;
				this.dy = 0;
				Supaplex.set(this.xx, this.yy, this);
			}
			else if (kb.moveLeft()) {
				this.jobTo(4);
			}
			else if (kb.moveRight()) {
				this.jobTo(6);
			}
			else if (kb.moveUp()) {
				this.jobTo(8);
			}
			else if (kb.moveDown()) {
				this.jobTo(2);
			}
			else if (kb.eatUp()) {
				this.eatTo(8);
			}
			else if (kb.eatDown()) {
				this.eatTo(2);
			}
			else if (kb.eatLeft()) {
				this.eatTo(4);
			}
			else if (kb.eatRight()) {
				this.eatTo(6);
			}
			else if (kb.esc()) {
				this.waitExplode();
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
			let direction = this.job - 80;
			this.setStatus('roll-to-'+direction);
			this.move++;
			if (this.move == 8) {
				direction = this.job - 80;
				let o = this.near(direction);
				if (o && o.rollable(direction) && kb.move(direction)) {
					let d = this.dd(direction);
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
				this.setStatus('default');
			}
		}
		
		else if (this.job == 5) {
			this.move++;
			if (this.move >= 4) {
				this.move = 0;
				this.job = 0;
				this.setStatus('default');
			}
		}
	}

	waitExplode() {
		this.explode(this.x, this.y);
		this.afterExplode();
        }

	afterExplode()
	{
		this.destroy();
		$('.message-oops')
			.css('font-size', '150px')
			.css('opacity', '1')
		;
		setTimeout(function() {
			location.href = 'index.html';
		}, 2000);
	}
}

export default ObjectHero;
