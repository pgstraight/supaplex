import $ from "jquery";
import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectExit extends BaseObject
{
	mainClass()
	{
		return 'c-object-exit';
	}
	
	eatable()
	{
		return true;
	}
	
	idle()
	{
		this.idleEat();
	}
	
	beforeEat()
	{
		$('.message-hooray')
			.css('font-size', '150px')
			.css('opacity', '1')
		;
		setTimeout(function() {
			location.href = 'index.html';
		}, 1500);
	}
}

export default ObjectExit;
