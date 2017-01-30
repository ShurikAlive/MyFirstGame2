CZoneZombieAttack = Base.extend({
	constructor: function(x, y, height, width, attackRange)
	{
		this._x = x - attackRange;
		this._y = y - attackRange;
		this._height = height + (attackRange * 2);
		this._width = width + (attackRange * 2);
	}
});

CBaseZombie = CMovingObjects.extend({
	_width: ZOMBIE_WIDTH,
	_height: ZOMBIE_HEIGHT - JOINING_SPRITE_OBJECT_ZOMBIE,
	
	_directionOfMovement: 'up',// up, down, left, right, upleft, upright, downleft, downright
	
	_isStand: true,
	_isStuck: false,
	
	_step: ZOMBIE_STEP,
	
	_perimeterMoveNearObstacles: ZOMBIE_WIDTH + BLOCK_WIDTH + 3,
	
	_spriteRun: null,
	_spriteAtack: null,
	
	_indexGoalOfDestroying: null,
	
	_damage: null,
	_isAttack: false,
	_lastAtack: null,
	_intervalBetweenAttacks: ZOMBIE_INTERVAL_BETWEENE_ATTACKS, 
	
	_isKilled: false,
	_health: null,
	
	constructor: function(ctx, pic, levelOfComplexity, x, y, arrayObjects) 
	{
		this._ctx = ctx;
		this._pic = pic;
		
		this._x = x;
		this._y = y + JOINING_SPRITE_OBJECT_PLAYER;
		
		this._indexGoalOfDestroying = getRandomInt(0, (arrayObjects.length - 1));
		
		this._lastAtack = Date.now();
		this._damage = ZOMBIE_DAMAGE * LEVELS_OF_DIFFICULTY_LEVELS[levelOfComplexity];
		
		this._health = ZOMBIE_HEALTH * LEVELS_OF_DIFFICULTY_LEVELS[levelOfComplexity];
		
		this._spriteRun = new CSprite(pic, [SPRITE_RUN_ZOMBIE_X, SPRITE_RUN_ZOMBIE_Y],
				[SPRITE_ZOMBIE_WIDTH, SPRITE_ZOMBIE_HEIGHT],
				4, [0, 1, 2, 3], 'horizontal',
				false, [this._width, this._height + JOINING_SPRITE_OBJECT_ZOMBIE]);
		
		this._spriteAtack = new CSprite(pic, [SPRITE_ATTACK_ZOMBIE_X, SPRITE_ATTACK_ZOMBIE_Y],
				[SPRITE_ZOMBIE_WIDTH, SPRITE_ZOMBIE_HEIGHT],
				3, [0, 1, 2], 'horizontal', 
				false, [this._width, this._height + JOINING_SPRITE_OBJECT_ZOMBIE]);
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
	
	getIsKilled: function()
	{
		return this._isKilled;
	},
	
	_getTargetedForDestruction: function(map)
	{
		
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
	
	_moveUp: function(dt, map)
	{
		var direction = '';
		this._y -= this._step * dt;
			
		if (this._checkingCollisionObject(map))
		{
			this._y += this._step * dt;
		}
		else
		{
			direction += 'up';
		}
		
		return direction;
	},
	
	zombieInZombie: function(map)
	{
		return this._collisionZombies(map);
	},
	
	_moveDown: function(dt, map)
	{
		var direction = '';
		this._y += this._step * dt;
			
		if (this._checkingCollisionObject(map))
		{
			this._y -= this._step * dt;
		}
		else
		{
			direction += 'down';
		}
		
		return direction;
	},
	
	_moveLeft: function(dt, map)
	{
		var direction = '';
		this._x -= this._step * dt;
			
		if (this._checkingCollisionObject(map))
		{
			this._x += this._step * dt;
		}
		else
		{
			direction += 'left';
		}
		
		return direction;
	},
	
	_moveRight: function(dt, map)
	{
		var direction = '';
		this._x += this._step * dt;
			
		if (this._checkingCollisionObject(map))
		{
			this._x -= this._step * dt;
		}
		else
		{
			direction += 'right';
		}
		
		return direction;
	},
	
	_takeStep: function(dt, map)
	{
		var direction = '';
		var targetObject = this._getTargetedForDestruction(map);

		var zonaBlocaX = new CZoneZombieAttack(targetObject._x, 0, map.getHeight(), this._width, 0);
		var zonaBlocaY = new CZoneZombieAttack(0, targetObject._y, this._height, map.getHeight(), 0);
		
		var inZoneObjectX = _collision(zonaBlocaX, this);
		var inZoneObjectY = _collision(zonaBlocaY, this);
		
		if (!inZoneObjectY)
		{
			if (targetObject._y < this._y)
			{
				direction += this._moveUp(dt, map);
			}
			else if (targetObject._y > this._y)
			{
				direction += this._moveDown(dt, map);
			}
		}
		
		if (!inZoneObjectX)
		{
			if (targetObject._x > this._x)
			{
				direction += this._moveRight(dt, map);
			}
			else if (targetObject._x < this._x)
			{
				direction += this._moveLeft(dt, map);
			}
		}
		
		return direction;
	},
	
	_makeMoveBypass: function(dt, map)
	{
		var direction = '';
		
		if (this._y < map.getHeight() / 2)
		{
			direction += this._moveUp(dt, map);
		}
		else
		{
			direction += this._moveDown(dt, map);
		}
		
		if (this._x > map.getWidth() / 2)
		{
			direction += this._moveLeft(dt, map);
		}
		else
		{
			direction += this._moveRight(dt, map);
		}
		
		return direction;
	},
	
	_moveToTarget: function(dt, map)
	{
		var newDirection = '';
		this._isAttack = false;
		
		if (!this._isStuck)
		{
			newDirection = this._takeStep(dt, map);
		}
		
		if (newDirection == '' && !this._isStuck)
		{
			this._isStuck = true;
			this._perimeterMoveNearObstacles = ZOMBIE_WIDTH + BLOCK_WIDTH + 3;
		}
		
		if (this._isStuck && this._perimeterMoveNearObstacles <= 0)
		{
			this._isStuck = false;
		}
		else if (this._isStuck && this._perimeterMoveNearObstacles > 0)
		{
			newDirection = this._makeMoveBypass(dt, map);
			this._perimeterMoveNearObstacles -= this._step * dt;
		}
		
		if (newDirection == '')
		{
			this._isStand = true;
		}
		else
		{
			this._isStand = false;
			this._directionOfMovement = newDirection;
		}
	},

	_attack: function(dt, map)
	{
		this._isStand = true;
		this._isAttack = true;
		var targetObject = this._getTargetedForDestruction(map);
		
		if (Date.now() - this._lastAtack >= this._intervalBetweenAttacks)
		{
			targetObject.setDamage(this._damage);
			this._lastAtack = Date.now();
		}
	},

	
	update: function(dt, map)
	{
		var zoneAttack = new CZoneZombieAttack(this._x, this._y, this._height, this._width,
			ZOMBIE_DISTANCE_ATTACK);
		
		if(!this._isKilled)
		{
			if (!_collision(zoneAttack, this._getTargetedForDestruction(map)))
			{
				this._moveToTarget(dt, map);
			}
			else
			{
				this._attack(dt, map);
			}
		}
	},
	
	_drawKilled: function()
	{
		var y = this._y - JOINING_SPRITE_OBJECT_ZOMBIE;
		var height = this._height + JOINING_SPRITE_OBJECT_ZOMBIE;
	
		this._ctx.drawImage(this._pic, SPRITE_KILLED_ZOMBIE_X, SPRITE_KILLED_ZOMBIE_Y,
				SPRITE_ZOMBIE_WIDTH, SPRITE_ZOMBIE_HEIGHT,
				this._x, y, this._width, height);
	},
	
	_drawAttackZombie: function()
	{
		var heightOneImageOnSprite = SPRITE_ZOMBIE_HEIGHT;
		
		var directionOnSprite = {'up':7, 'down':0, 'left':2, 'right':5,
			'upleft':3, 'upright':6, 'downleft':1, 'downright':4};
			
			
		var spriteStartY = 	SPRITE_ATTACK_ZOMBIE_Y;
		var spriteY = spriteStartY + heightOneImageOnSprite * directionOnSprite[this._directionOfMovement];
		var y = this._y - JOINING_SPRITE_OBJECT_ZOMBIE;
		
		this._spriteAtack.pos[1] = spriteY;
		this._spriteAtack.updateCoordinateObject(this._x, y);
		this._spriteAtack.render(this._ctx);
	},	
		
	_drawStandZombie: function()
	{
		var heightOneImageOnSprite = SPRITE_ZOMBIE_HEIGHT;
		
		var directionOnSprite = {'up':7, 'down':0, 'left':2, 'right':5,
			'upleft':3, 'upright':6, 'downleft':1, 'downright':4};
		
		var spriteY = heightOneImageOnSprite * directionOnSprite[this._directionOfMovement];
		var y = this._y - JOINING_SPRITE_OBJECT_ZOMBIE;
		var height = this._height + JOINING_SPRITE_OBJECT_ZOMBIE;
		
		this._ctx.drawImage(this._pic, 0, spriteY, SPRITE_ZOMBIE_WIDTH, SPRITE_ZOMBIE_HEIGHT,
				this._x, y, this._width, height);
	},

	_drawRunZombie: function()
	{
		var heightOneImageOnSprite = SPRITE_ZOMBIE_HEIGHT;
		
		var directionOnSprite = {'up':7, 'down':0, 'left':2, 'right':5,
			'upleft':3, 'upright':6, 'downleft':1, 'downright':4};
		
		var spriteY = heightOneImageOnSprite * directionOnSprite[this._directionOfMovement];
		var y = this._y - JOINING_SPRITE_OBJECT_ZOMBIE;
		
		this._spriteRun.pos[1] = spriteY;
		this._spriteRun.updateCoordinateObject(this._x, y);
		this._spriteRun.render(this._ctx);
	},
		
	draw: function(dt)
	{
		if(this._isKilled)
		{
			this._drawKilled();
		}
		else if (this._isAttack)
		{
			this._drawAttackZombie();
		}
		else if (this._isStand)
		{
			this._drawStandZombie();
		}
		else if (!this._isStand)
		{
			this._drawRunZombie();
		}
		
		this._spriteRun.update(dt);
		this._spriteAtack.update(dt);
	}
});
