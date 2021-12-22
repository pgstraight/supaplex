import './index.scss';
import $ from "jquery";
import Supaplex from '../../supaplex.js';

class Statusbar {
	constructor() {
		this.levelTitle = $('<div>').addClass('c-level-title');
		this.foodCount = $('<div>').addClass('c-food-count');
		this.bombCount = $('<div>').addClass('c-bomb-count');
		this.element = $('<div>')
			.addClass('c-statusbar')
			.append(this.levelTitle)
			.append(this.foodCount)
			.append(this.bombCount)
		;
	}
	
	setTitle(title)
	{
		this.levelTitle.empty().append(title);
	}
	
	setFoods(n)
	{
		this.foodCount.empty().append(n);
	}
	
	setBombs(n)
	{
		this.bombCount.empty().append(n);
		if (n == 0) {
			$('.c-bomb-count').hide();
		} else {
			$('.c-bomb-count').show();
		}
	}
}

export default Statusbar;