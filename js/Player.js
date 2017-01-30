CPlayer = CMovingObjects.extend({
	_width: PLAYER_WIDTH,
	_height: PLAYER_HEIGHT - JOINING_SPRITE_OBJECT_PLAYER,
	
	_directionOfMovement: 'up',// up, down, left, right, upleft, upright, downleft, downright
	
	_isStand: true,
	
	_step: PLAYER_STEP,
	
	_spriteRun: null,
	
	_isKilled: false,
	_health: PLAYER_HEALTH,
	
	_arsenal: null,//Массив с оружием игрока
	_currentWeapon: null,//индекс оружия из массива, которое в данный момент спользует игрок
	_heShoots: false,
	
	constructor: function(ctx, pic, x, y) 
	{
		this._ctx = ctx;
		this._pic = pic;
		
		this._x = x;
		this._y = y + JOINING_SPRITE_OBJECT_PLAYER;
		
		this._arsenal = [new CStandartWeapon()];
		this._currentWeapon = 0;
		
		this._spriteRun = new CSprite(this._pic, [180, 0], [SPRITE_PLAYER_WIDTH, SPRITE_PLAYER_HEIGHT],
				6, [0, 1, 2, 3], 'horizontal',
				false, [this._width, this._height + JOINING_SPRITE_OBJECT_PLAYER]);
				
		this._spriteRunAndShoot = new CSprite(this._pic, [0, 600], [SPRITE_PLAYER_WIDTH, SPRITE_PLAYER_HEIGHT],
				6, [0, 1, 2, 3], 'horizontal',
				false, [this._width, this._height + JOINING_SPRITE_OBJECT_PLAYER]);
	},
	
	setDamage: function(damage)
	{
		this._health -= damage;
		
		if (this._health <= 0)
		{
			this._health = 0;
			this._isKilled = true;
		}
	},
	
	drawWeapons: function()
	{
		for (var weapon in this._arsenal)
		{
			this._arsenal[weapon].drawBullets(this._ctx);
		}
	},
	
	pressTrigger: function(pic)
	{	
		if (this._arsenal[this._currentWeapon].getNumberOfRounds() > 0)
		{
			this._heShoots = true;
		}
	
		if (!this._isKilled && this._arsenal[this._currentWeapon].weaponCanShoot())
		{
			this._arsenal[this._currentWeapon].makeAShot(this, pic);
		}
	},
	
	update: function(map, dt)
	{
		for (var weapon in this._arsenal)
		{
			this._arsenal[weapon].update(map, dt);
		}
	},
	
	getHealth: function()
	{
		return this._health;
	},
	
	getAmmo: function()
	{
		return this._arsenal[this._currentWeapon].getNumberOfRounds();
	},
	
	getIsKilled: function()
	{
		return this._isKilled;
	},
	
	getX: function()
	{
		return this._x;
	},
	
	getY: function()
	{
		return this._y;
	},
	
	setX: function(x)
	{
		this._x = x;
	},
	
	setY: function(y)
	{
		this._y = y;
	},
	
	takeStepUp: function(dt, map)
	{
		var newY = this.getY() - (this._step * dt);
		var lastY = this.getY();
		
		if (!this._isKilled)
		{
			this.setY(newY);
		}
		
		if (this._checkingCollisionObject(map) || this._outOfBounds(map))
		{
			this.setY(lastY);
		}
	},
	
	takeStepDown: function(dt, map)
	{
		var newY = this.getY() + (this._step * dt);
		var lastY = this.getY();
		
		if (!this._isKilled)
		{
			this.setY(newY);
		}
		
		if (this._checkingCollisionObject(map) || this._outOfBounds(map))
		{
			this.setY(lastY);
		}
	},
	
	takeStepRight: function(dt, map)
	{
		var newX = this.getX() + (this._step * dt);
		var lastX = this.getX();
		
		if (!this._isKilled)
		{
			this.setX(newX);
		}
		
		if (this._checkingCollisionObject(map) || this._outOfBounds(map))
		{
			this.setX(lastX);
		}
	},
	
	takeStepLeft: function(dt, map)
	{
		var newX = this.getX() - (this._step * dt);
		var lastX = this.getX();
		
		if (!this._isKilled)
		{
			this.setX(newX);
		}
		
		if (this._checkingCollisionObject(map) || this._outOfBounds(map))
		{
			this.setX(lastX);
		}
	},
	
	determineStatus: function(lastX, lastY)
	{
		var lastDirection = this._directionOfMovement;
		this._directionOfMovement = '';
		
		if ((this.getX() == lastX) && (this.getY() == lastY))
		{
			this._isStand = true;
			this._directionOfMovement = lastDirection;
		}
		else
		{
			this._isStand = false;
			
			if (this.getY() > lastY)
			{
				this._directionOfMovement += 'down';
			}
			else if (this.getY() < lastY)
			{
				this._directionOfMovement += 'up';
			}
			if (this.getX() > lastX)
			{
				this._directionOfMovement += 'right';
			}
			else if (this.getX() < lastX)
			{
				this._directionOfMovement += 'left';
			}
		}
	},
	
	_drawKilled: function()
	{
		var y =  this._y - JOINING_SPRITE_OBJECT_PLAYER;
		var height = this._height + JOINING_SPRITE_OBJECT_PLAYER;
	
		this._ctx.drawImage(this._pic, 240, 480, SPRITE_PLAYER_WIDTH, SPRITE_PLAYER_HEIGHT,
				this._x, y, this._width, height);
	},
	
	_drawStandPlayer: function()
	{
		var heightOneImageOnSprite = SPRITE_PLAYER_HEIGHT;
		
		var direction = {'up':0, 'down':1, 'left':2, 'right':3,
			'upleft':4, 'upright':5, 'downleft':6, 'downright':7};
		
		var spriteY = heightOneImageOnSprite * direction[this._directionOfMovement];
		var y = this._y - JOINING_SPRITE_OBJECT_PLAYER;
		var height = this._height + JOINING_SPRITE_OBJECT_PLAYER;
		
		this._ctx.drawImage(this._pic, 0, spriteY, SPRITE_PLAYER_WIDTH, SPRITE_PLAYER_HEIGHT,
				this._x, y, this._width, height);
	},
	
	_drawRunPlayer: function(dt)
	{
		var heightOneImageOnSprite = SPRITE_PLAYER_HEIGHT;
		
		var direction = {'up':0, 'down':1, 'left':2, 'right':3,
			'upleft':4, 'upright':5, 'downleft':6, 'downright':7};
		
		var spriteY = heightOneImageOnSprite * direction[this._directionOfMovement];
		var y = this._y - JOINING_SPRITE_OBJECT_PLAYER;
		var height = this._height + JOINING_SPRITE_OBJECT_PLAYER;
		
		this._spriteRun.pos[1] = spriteY;
		this._spriteRun.updateCoordinateObject(this._x, y);
		this._spriteRun.render(this._ctx);
	},
	
	_drawStandAndShoot: function()
	{
		var heightOneImageOnSprite = SPRITE_PLAYER_HEIGHT;
		
		var direction = {'up':0, 'down':1, 'left':2, 'right':3,
			'upleft':4, 'upright':5, 'downleft':6, 'downright':7};
		
		var spriteY = heightOneImageOnSprite * direction[this._directionOfMovement];
		var y = this._y - JOINING_SPRITE_OBJECT_PLAYER;
		var height = this._height + JOINING_SPRITE_OBJECT_PLAYER;
		
		this._ctx.drawImage(this._pic, 60, spriteY, SPRITE_PLAYER_WIDTH, SPRITE_PLAYER_HEIGHT,
				this._x, y, this._width, height);
	},
	
	_drawRunAndShoot: function()
	{
		var heightOneImageOnSprite = SPRITE_PLAYER_HEIGHT;
		
		var direction = {'up':0, 'down':1, 'left':2, 'right':3,
			'upleft':4, 'upright':5, 'downleft':6, 'downright':7};
		
		var spriteY = 600 + heightOneImageOnSprite * direction[this._directionOfMovement];
		var y = this._y - JOINING_SPRITE_OBJECT_PLAYER;
		var height = this._height + JOINING_SPRITE_OBJECT_PLAYER;
		
		this._spriteRunAndShoot.pos[1] = spriteY;
		this._spriteRunAndShoot.updateCoordinateObject(this._x, y);
		this._spriteRunAndShoot.render(this._ctx);
	},
	
	draw: function(dt)
	{
		if(this._isKilled)
		{
			this._drawKilled();
		}
		else if (this._isStand && !this._heShoots)
		{
			this._drawStandPlayer();
		}
		else if (!this._isStand && !this._heShoots)
		{
			this._drawRunPlayer();
		}
		else if (this._isStand && this._heShoots)
		{
			this._drawStandAndShoot();
		}
		else if (!this._isStand && this._heShoots)
		{
			this._drawRunAndShoot();
		}
		
		this._spriteRun.update(dt);
		this._spriteRunAndShoot.update(dt);
	}
});
