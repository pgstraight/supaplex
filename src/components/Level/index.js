//import Statusbar from '../Statusbar';
//import Board from '../Board';
import $ from "jquery";
import Supaplex from '../../supaplex.js';
import Statusbar from '../Statusbar';
import Board from '../Board';
import BaseObject from '../Objects/Base';

import Stone from '../Objects/Stone';
import Grass from '../Objects/Grass';
import Food from '../Objects/Food';
import Chip from '../Objects/Chip';
import Hard from '../Objects/Hard';
import Finish from '../Objects/Exit';
import BombDrop from '../Objects/BombDrop';
import BombHand from '../Objects/BombHand';
import BombRadio from '../Objects/BombRadio';
import BombPult from '../Objects/BombPult';
import Bnya from '../Objects/Bnya';
import Nippel from '../Objects/Nippel';
import Snack from '../Objects/Snack';
import Bug from '../Objects/Bug';
import Explosion from '../Objects/Explosion';
import Hero from '../Objects/Hero';

import './index.scss';

class Level
{
	constructor()
	{
		this.number = 0;
		this.element = $('<div>').addClass('c-level');
		Supaplex.level = this;
		Supaplex.appContainer.empty().append(this.element);
		
		Supaplex.statusbar = new Statusbar();
		this.element.append(Supaplex.statusbar.element);
		
		Supaplex.board = new Board();//console.log(Supaplex.board.element);
		this.element.append(Supaplex.board.element);
	}
	
	createObject(id, x, y)
	{
		let o;
		
		switch(id) {
			case 1:
				o = new Stone();
				break;
			case 2:
				o = new Grass();
				break;
			case 3:
				o = new Hero();
				Supaplex.hero = o;
				break;
			case 4:
				o = new Food();
				break;
			case 5: case 26: case 27: case 38: case 39:
				o = new Chip();
				break;
			case 6: case 28: case 29: case 30: case 31: case 32: case 33: case 34: case 35: case 36: case 37:
				o = new Hard();
				break;
			case 7:
				o = new Finish();
				break;
			case 8:
				o = new BombDrop();
				break;
			case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 21: case 22: case 23:
				o = new Nippel();
				break;
			case 17:
				o = new Snack();
				break;
			case 18:
				o = new BombRadio();
				break;
			case 19:
				o = new BombPult();
				break;
			case 20:
				o = new BombHand();
				break;
			case 24:
				o = new Bnya();
				break;
			case 25:
				o = new Bug();
				break;
			default:
				o = new BaseObject();
		}
		
		o.init(id, x, y);
		return o;
	}
	
	createObjects()
	{
		for (let y = 0; y < 24; y++) {
			for (let x = 0; x < 60; x++) {
				let id = Supaplex.mapSource[y][x];
				if (id > 0) {
					let o = this.createObject(id, x, y);
					Supaplex.set(x, y, o);
					Supaplex.board.element.append(o.createElement());
				}
			}
		}
	}
	
	spawnBomb(x, y)
	{
		Supaplex.handBomb = this.createObject(20, x, y);
		Supaplex.handBomb.isReady = true;
		Supaplex.board.element.append(Supaplex.handBomb.createElement());
	}
	
	init(n)
	{
		this.number = n;
		Supaplex.initLevel(n);
		this.createObjects();
		this.handleKeyboard();
		Supaplex.runTimer();
	}
	
	handleKeyboard()
	{
		$(window).keydown(function(e) {
			switch(e.keyCode) {
				case 32: Supaplex.keySpace = true; break;
				case 37: Supaplex.keyLeft = true; break;
				case 39: Supaplex.keyRight = true; break;
				case 38: Supaplex.keyUp = true; break;
				case 40: Supaplex.keyDown = true; break;
			}
		});
		$(window).keyup(function(e) {
			switch(e.keyCode) {
				case 32: Supaplex.keySpace = false; break;
				case 37: Supaplex.keyLeft = false; break;
				case 39: Supaplex.keyRight = false; break;
				case 38: Supaplex.keyUp = false; break;
				case 40: Supaplex.keyDown = false; break;
			}
		});
	}
	
	explosion(x, y)
	{
		let o = new Explosion();
		o.init(51, x, y);
		Supaplex.set(x, y, o);
		Supaplex.board.element.append(o.createElement());
		return o;
	}
	
	food(x, y)
	{
		let o = new Food();
		o.init(4, x, y);
		Supaplex.set(x, y, o);
		Supaplex.board.element.append(o.createElement());
		return o;
	}
}

export default Level;
