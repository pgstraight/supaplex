import $ from "jquery";
import Level from './components/Level';

$(function() {
	let route;
	if (route = document.location.href.match(/\?level=(\d+)$/)) {
		let level = new Level();
		level.init(route[1]);
		return;
	}
});
