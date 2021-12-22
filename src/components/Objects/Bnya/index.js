import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectBnya extends BaseObject
{
	mainClass()
	{
		return 'c-object-bnya';
	}
	
	explodable()
	{
		return true;
	}
	
	painfull()
	{
		return true;
	}

	modifyElement()
	{
		let opos = this.pos - 1;
		if (opos == 0) {
			opos = 5;
		}
		this.element.removeClass('c-object-bnya--' + opos);
		this.element.addClass('c-object-bnya--' + this.pos);
	}
	
	idle()
	{
		if (this.job == 98 || this.job == 99) {
			this.idleExplode();
		} else {
			this.pos++;
			if (this.pos > 5) {
				this.pos = 1;
			}
			this.idleAutoMovement();
		}
	}
	
	afterExplode()
	{
		this.fillFood();
	}
	
	whereToGo()
	{
	}
}

export default ObjectBnya;
