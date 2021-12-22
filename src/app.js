import $ from "jquery";
import Level from './components/Level';
import LevelSelect from './components/LevelSelect';
import "./app.scss";

$(function() {
	$(window).resize(resizeWindow);

	let route;
	if (route = document.location.href.match(/\?(\d+)$/)) {
		$('#app-root-container').addClass('with-level');
		resizeWindow();
		let level = new Level();
		level.init(route[1]);
		return;
	}
	
	let levelselect = new LevelSelect();

	resizeWindow();

	function resizeWindow()	{
		let h = $(window).height();
		let w = $(window).width();
		let dh = h / 400;
		$('body')
			.css('background-size', 641 * dh + 'px')
		;

		$('.body-bg2')
			.css('background-color', 'rgba(0,0,0,0)')
			.css('background-image', 'linear-gradient(to right, #206060, rgba(0,0,0,0))')
		;

		let cn = $('#app-root-container');

		if (cn.hasClass('with-level')) {
			cn
				.css('top', (h - cn.height())/2 + 'px')
				.css('left', (w - cn.width())/2 + 'px')
			;
		}
	}
});
