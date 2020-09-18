import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectBug extends BaseObject
{
	constructor()
	{
		super();
		
		this.status = 0;
		this.pos = 0;
		this.time = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
	}
	
	modifyClass(c)
	{
		this.element.addClass('c-object-bug--' + c);
		
		if (c != 'default') {
			this.element.removeClass('c-object-bug--default');
		}
		if (c != 'bug1') {
			this.element.removeClass('c-object-bug--bug1');
		}
		if (c != 'bug2') {
			this.element.removeClass('c-object-bug--bug2');
		}
		if (c != 'bug3') {
			this.element.removeClass('c-object-bug--bug3');
		}
	}
	
	modifyElement()
	{
		if (this.status == 0) {
			this.modifyClass('default');
		} else {
			this.modifyClass('bug' + this.pos);
		}
	}
	
	mainClass() {
		return 'c-object-bug';
	}
	
	eatable()
	{
		return true;
	}
	
	idle()
	{
		this.idleEat();
		
		if (this.status == 0) {
			this.time--;
			if (this.time < 1) {
				this.status = 1;
				this.time = 20;
				this.pos = 0;
			}
		}
		
		if (this.status == 1) {
		
			this.pos++;
			
			if (this.pos > 3) {
				this.pos = 1;
			}
			
			if (this.job != 0) {
				Supaplex.hero.explode(Supaplex.hero.x, Supaplex.hero.y);
			}
			
			this.time--;
			
			if (this.time < 2) {
				this.status = 0;
				this.time = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
				this.pos = 1;
			}
		}
		this.posElement();
	}
}

export default ObjectBug;
