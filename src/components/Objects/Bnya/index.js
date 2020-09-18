import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectBnya extends BaseObject
{
	mainClass()
	{
		return 'c-object-bnya';
	}
	
	blockContent()
	{
		return '%';
	}
	
	explodable()
	{
		return true;
	}
	
	idle()
	{
		if (this.job == 98 || this.job == 99) {
			this.idleExplode();
		} else {
			this.pos++;
			if (this.pos>5) {
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
