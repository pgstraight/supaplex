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
		return (Supaplex.counter == 0);
	}
	
	idle()
	{
		this.idleEat();
	}
	
	beforeEat()
	{
		if (Supaplex.counter == 0) {
			$('.message-hooray')
				.css('font-size', '150px')
				.css('opacity', '1')
			;
			setTimeout(function() {
				location.href = 'index.html';
			}, 1000);
		}
	}
}

export default ObjectExit;
