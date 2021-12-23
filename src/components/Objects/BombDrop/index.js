import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectBombDrop extends BaseObject
{
	mainClass() {
		return 'c-object-bomb-drop';
	}
	
	idle()
	{
		//this.view(1);
		this.idleExplode();
		if (this.job < 98) {
			this.idleFall();
			this.idleRoll();
		}
	}
	
	explodable() {
		return true;
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
}

export default ObjectBombDrop;
