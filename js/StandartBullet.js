function _calculateTheInitialX(player)
{
	var directionLeft = player._directionOfMovement == 'left';
	var directionUpLeft = player._directionOfMovement == 'upleft';
	var directionDownLeft = player._directionOfMovement == 'downleft';
	
	var directionRight = player._directionOfMovement == 'right';
	var directionUpRight = player._directionOfMovement == 'upright';
	var directionDownRight = player._directionOfMovement == 'downright';

	var directionUp = player._directionOfMovement == 'up';
	var directionDown = player._directionOfMovement == 'down';
	
	if (directionLeft || directionUpLeft || directionDownLeft)
	{
		return (player.getX() - 3);
	}
	else if (directionRight || directionUpRight || directionDownRight)
	{
		return (player.getX() + player._width + 3);
	}
	else if (directionDown || directionUp)
	{
		return (player._x + (player._width / 2));
	}
	
	return (player._x - 3);
}

function _calculateTheInitialY(player)
{
	var directionLeft = player._directionOfMovement == 'left';
	var directionUpLeft = player._directionOfMovement == 'upleft';
	var directionDownLeft = player._directionOfMovement == 'downleft';
	
	var directionRight = player._directionOfMovement == 'right';
	var directionUpRight = player._directionOfMovement == 'upright';
	var directionDownRight = player._directionOfMovement == 'downright';

	var directionUp = player._directionOfMovement == 'up';
	var directionDown = player._directionOfMovement == 'down';
	
	if (directionDown || directionDownRight || directionDownLeft)
	{
		return (player._y + player._height + 3);
	}
	else if (directionUp || directionUpRight || directionUpLeft)
	{
		return (player._y + 3);
	}
	else if (directionRight || directionLeft)
	{
		return (player._y + (player._height / 2));
	}
	
	return (player._y + 3);
}

CStandartBullet = CBaseBullet.extend({
	constructor: function(player, pic) 
	{
		this._x = _calculateTheInitialX(player);
		this._y = _calculateTheInitialY(player);
		this._width = BULLET_WIDTH;
		this._height = BULLET_HEIGHT;
		
		this._direction = player._directionOfMovement;
		
		this._pic = pic;
		
		this._demage = BULLET_DAMAGE;
		this._spead = SPEAD_STANDART_BULLET;
		
		this._bulletFaced = false;
	},
	
	bulletHitTheObject: function()
	{
		return this._bulletFaced;
	},
	
	_takeStep: function(dt)
	{
		if (this._direction == 'up')
		{
			this._y -= this._spead * dt;
		}
		else if (this._direction == 'down')
		{
			this._y += this._spead * dt;
		}
		else if (this._direction == 'left')
		{
			this._x -= this._spead * dt;
		}
		else if (this._direction == 'right')
		{
			this._x += this._spead * dt;
		}
		else if (this._direction == 'upright')
		{
			this._y -= this._spead * dt;
			this._x += this._spead * dt;
		}
		else if (this._direction == 'upleft')
		{
			this._y -= this._spead * dt;
			this._x -= this._spead * dt;
		}
		else if (this._direction == 'downright')
		{
			this._y += this._spead * dt;
			this._x += this._spead * dt;
		}
		else if (this._direction == 'downleft')
		{
			this._y += this._spead * dt;
			this._x -= this._spead * dt;
		}
	},
	
	_causeDamageProperty: function(array)
	{
		for (var obj in array)
		{
			if (!array[obj].getIsKilled() && _collision(this, array[obj]))
			{
				array[obj].setDamage(this._demage);
			}
		}
	},
	
	_collisionWithObjects: function(map)
	{
		if (this._collisionObstacles(map))
		{
			this.bulletFaced = true;
		}
		else if (this._collisionZombies(map))
		{
			this._causeDamageProperty(map.getZombiesArray());
			this.bulletFaced = true;
		}
		else if (this._collisionDefenceObject(map))
		{
			this._causeDamageProperty(map.getObjectPlayerDefenceArray());
			this.bulletFaced = true;
		}	
		else if (this._outOfBounds(map))
		{
			this.bulletFaced = true;
		}
	},
	
	updateState: function(map, dt)
	{
		if (!this.bulletFaced)
		{
			this._takeStep(dt);
			this._collisionWithObjects(map);
		}
	},
	
	draw: function(ctx)
	{
		if (!this.bulletFaced)
		{
			ctx.drawImage(this._pic, 0, 0, SPRITE_BULLET_WIDTH, SPRITE_BULLET_HEIGHT, 
					this._x, this._y, this._width, this._height);
		}
	}
});