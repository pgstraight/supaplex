import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectFood extends BaseObject
{
	mainClass()
	{
		return 'c-object-food';
	}
	
	isSpheric()
	{
		return true;
	}
	
	modifyElement()
	{
		let deg = 22.5 * this.rotatePos;
		this.element.css('transform', 'rotate(' + deg + 'deg)');
	}
	
	idle()
	{
		this.idleFall();
		this.idleEat();
	}
	
	eatable()
	{
		return true;
	}
	
	beforeEat()
	{
		if (Supaplex.counter > 0) {
			Supaplex.counter--;
		}
	}
}

export default ObjectFood;
