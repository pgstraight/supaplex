import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectHard extends BaseObject
{
	mainClass()
	{
		return 'c-object-hard';
	}
	
	blockContent()
	{
		return '';
	}
	
	solid()
	{
		return true;
	}
}

export default ObjectHard;
