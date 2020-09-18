// 9  - r
// 10 - d
// 11 - l
// 12 - u
// 21 - ud
// 22 - lr
// 23 - all

import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectNippel extends BaseObject
{
	mainClass()
	{
		return 'c-object-nippel';
	}
	
	isNippel() {
		return true;
	}
	
	canNippel(dx, dy)
	{
		let id = this.id;
		
		if (dx == -1 && dy == 0 && (id == 11 || id == 22 || id == 15)) {
			return true;
		}
		
		if (dx == 1 && dy == 0 && (id == 9 || id == 22 || id == 13)) {
			return true;
		}
		
		if (dx == 0 && dy == 1 && (id == 10 || id == 21 || id == 14)) {
			return true;
		}
		
		if (dx == 0 && dy == -1 && (id == 12 || id == 21 || id == 16)) {
			return true;
		}
		
		if (id == 23) {
			return true;
		}
		
		return false;
	}
	
	handle()
	{
		let id = this.id;
		if (id >= 13 && id <= 16) {
			Supaplex.gravity = !Supaplex.gravity;
		}
	}
}

export default ObjectNippel;
