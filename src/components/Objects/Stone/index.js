import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectStone extends BaseObject
{
	mainClass()
	{
		return 'c-object-stone';
	}
	
	isSpheric()
	{
		return true;
	}
	
	modifyElement()
	{
		let deg = 11.25 * this.rotatePos;
		this.element.css('transform', 'rotate(' + deg + 'deg)');
	}
	
	rollable(direction) {
		if (this.job != 0) {
			return false;
		}
		if (direction == 4 || direction == 6) {
			return !this.near(direction);
		}
		return false;
	}
	
	idle() {
		this.idleFall();
		this.idleRoll();
	}
}

export default ObjectStone;
