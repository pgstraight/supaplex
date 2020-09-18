import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectGrass extends BaseObject
{
	mainClass()
	{
		return 'c-object-grass';
	}
	
	blockContent()
	{
		return '';
	}
	
	eatable()
	{
		return true;
	}
	
	idle()
	{
		this.idleEat();
	}
}

export default ObjectGrass;
