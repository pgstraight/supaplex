import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectExplosion extends BaseObject
{
	mainClass()
	{
		return 'c-object-explosion';
	}
	
	blockContent()
	{
		return '';
	}
	
	idle() {
		this.idleExplode();
	}
	
	solid() {
		return true;
	}
}

export default ObjectExplosion;
