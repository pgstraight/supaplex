import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectSnack extends BaseObject
{
	constructor()
	{
		super();
		this.pos = 1;
		this.angle = 0;
	}
	
	mainClass()
	{
		return 'c-object-snack';
	}
	
	explodable()
	{
		return true;
	}
	
	painfull()
	{
		return true;
	}

	press()
	{
		this.explode(this.x, this.y);
	}
	
	modifyElement()
	{
		this.element.css('transform', 'rotate(' + this.angle + 'grad)');
		let opos = this.pos - 1;
		if (opos == 0) opos = 6;
		this.element.removeClass('c-object-snack--' + opos);
		this.element.addClass('c-object-snack--' + this.pos);
	}
	
	idle() {
		//this.view(this.job);
		if (this.job == 98 || this.job == 99) {
			this.idleExplode();
		} else {
			this.pos++;
			if (this.pos > 6) {
				this.pos = 1;
			}
			this.idleAutoMovement();
			
			let a = 0;
			if (this.direction == 6) {
				a = 100;
			}
			else if (this.direction == 2) {
				a = 200;
			}
			if (this.direction == 4) {
				a = -100;
			}
			
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
			this.posElement();
		}
	}
}

export default ObjectSnack;
