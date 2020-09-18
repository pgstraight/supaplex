import Supaplex from '../../../supaplex';
import BaseObject from '../Base';

import './index.scss';

class ObjectBombHand extends BaseObject
{
	constructor()
	{
		super();
		this.isReady = false;
		this.readyCount = 0;
	}
	
	mainClass()
	{
		return 'c-object-bomb-hand';
	}
	
	blockContent()
	{
		return 'hand';
	}
	
	explodable()
	{
		return true;
	}
	
	eatable()
	{
		return true;
	}
	
	idle()
	{
		if (!this.isAlive) {
			return;
		}
		this.idleExplode();
		this.idleEat();
	}
	
	beforeEat()
	{
		Supaplex.handBombs++;
	}
	
	idleReady()
	{
		this.idleExplode();
		if (!this.isAlive) {
			return;
		}
		this.readyCount++;
		console.log(this.readyCount);
		this.posElement();
		if (this.readyCount > 50) {
			this.explode(this.x, this.y);
			this.isAlive = false;
		}
	}
	
	afterExplode()
	{
		this.destroy();
		if (this.isReady) {
			Supaplex.handBomb = false;
			this.element.remove();
		}
	}
	
	modifyElement()
	{
		if (this.isReady) {
			this.element.addClass(this.mainClass() + '--ready');
		}
	}
}

export default ObjectBombHand;
