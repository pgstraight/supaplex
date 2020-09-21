import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectBombRadio extends BaseObject
{
	mainClass()
	{
		return 'c-object-bomb-radio';
	}
	
	radioExplode() {
		this.explode(this.x, this.y);
	}
	
	explodable() {
		return false;
	}
	
	solid() {
		return true;
	}
	
	idle() {
		this.idleExplode();
		if (this.job < 98) {
			this.idleRoll();
		}
	}
	
	rollable(direction) {
		if (this.job != 0) {
			return false;
		}
		if (direction == 4 || direction == 6 || direction == 8 || direction == 2) {
			return !this.near(direction);
		}
		return false;
	}
}

export default ObjectBombRadio;
