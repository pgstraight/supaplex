import $ from "jquery";
import levels from '../../levels.js';

import './index.scss';

class LevelSelect
{
	constructor()
	{
		let active = 1;
		let h1 = $('<h1>').text('Select level');
		let element = $('<div>').addClass('c-level-select').append(h1);
		let inner = $('<div>').addClass('c-level-select__inner').appendTo(element);
		let count = 0;
		levels.forEach((level) => {
			let item = $('<a>').attr('href', 'index.html?' + count).text(level.title);
			if (count == active) {
				item.addClass('active-level');
			}
			if (count < active) {
				item.addClass('past-level');
			}
			if (count > 0) {
				inner.append(item);
			}
			count++;
		});

		element.appendTo('#app-root-container');

		let p = $('.active-level').offset().top;
		$('html, body').animate({
			scrollTop: p - $(window).height() / 2,
		}, 500);

		$(window).keydown(function(e) {
			switch(e.keyCode) {
				case 32: 
				case 13: 
					location.href = 'index.html?' + active;
					break;
			}
		});

	}
}

export default LevelSelect;
