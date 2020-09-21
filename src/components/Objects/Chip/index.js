import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectChip extends BaseObject
{
	mainClass()
	{
		return 'c-object-chip c-object-chip--' + this.id;
	}
	
	isSpheric()
	{
		return true;
	}
}

export default ObjectChip;
