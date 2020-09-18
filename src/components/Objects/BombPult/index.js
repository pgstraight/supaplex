import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectBombPult extends BaseObject
{
	mainClass()
	{
		return 'c-object-bomb-pult';
	}
	
	blockContent()
	{
		return 'pult';
	}
	
	press() {
		for(var y = 23; y >= 0; y--) {
			for(var x = 0; x < 60; x++) {
				let o = Supaplex.get(x,y);
				if (o) {
					o.radioExplode();
				}
			}
		}
	}
}

export default ObjectBombPult;
