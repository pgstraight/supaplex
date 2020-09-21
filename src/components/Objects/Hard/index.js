import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectHard extends BaseObject
{
	mainClass()
	{
		return 'c-object-hard c-object-hard--' + this.id;
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
