CFactoryZombies = Base.extend
({
	_ctx: null,
	_example: null,
	_resources: null,
	
	constructor: function(example, ctx, resources) 
	{
		this._example = example;
		this._ctx = ctx;
		this._resources = resources;
	},
	
	_getZombieSpirte: function()
	{
		return this._resources.get('img/ZOMBIE' + getRandomInt(1, 4) + '.gif');
	},
	
	_objectOnSpawn: function(array, spawn)
	{
		for (var obj in array)
		{
			if ( _collision(spawn, array[obj]))
			{
				return true;
			}
		}
		
		return false;
	},
	
	_playerOrZombieStandingOnSpawn: function(map, spawn)
	{
		var zombieArray = map.getZombiesArray();
		var playerArray = map.getPlayersArray();

		return ((this._objectOnSpawn(zombieArray, spawn)) || (this._objectOnSpawn(playerArray, spawn)));
	},
	
	_criateZombieHunterObject: function(map, levelOfComplexity)
	{
		var zombie = null;
		
		var spawnArray = map.getObjectSpawnArray();
		var spawn = spawnArray[getRandomInt(0, (spawnArray.length - 1))];
		
		if (!this._playerOrZombieStandingOnSpawn(map, spawn))
		{
			var pic = this._getZombieSpirte();
			zombie = new CZombieHunterObject(this._ctx, pic, levelOfComplexity,
					spawn._x, spawn._y,  map.getObjectPlayerDefenceArray());
		}
		
		return zombie;
	},
	
	_criateZombieHunterPlayer: function(map, levelOfComplexity)
	{
		var zombie = null;
		
		var direction = ['up', 'down', 'left', 'right'];
		var numberEdge = getRandomInt(0, 3);
		
		var x = 0;
		var y = 0;

		if (direction[numberEdge] == 'up')
		{
			x = getRandomInt(0, map.getWidth());
			y = -ZOMBIE_HEIGHT - 5;
		}
		if (direction[numberEdge] == 'right')
		{
			x = map.getWidth() + 5;
			y = getRandomInt(0, map.getHeight());
		}
		if (direction[numberEdge] == 'down')
		{
			x = getRandomInt(0, map.getWidth());
			y = map.getHeight() + 5;
		}
		if (direction[numberEdge] == 'left')
		{
			x = -ZOMBIE_WIDTH - 5;
			y = getRandomInt(0, map.getHeight());
		}	

		zombie = new CZombieHunterPlayer(this._ctx, this._getZombieSpirte(), levelOfComplexity,
						x, y,  map.getPlayersArray());
						
		if (zombie.zombieInZombie(map))
		{
			zombie = null;
		}
		
		return zombie;
	},
	
	criateZombie: function(map, levelOfComplexity)
	{
		var zombie = null;
		
		var typeZombie = getRandomInt(0, 1);
		
		var arrayTypes = ['ObjectHunter','PlayerHunter']
		
		if (arrayTypes[typeZombie] == 'ObjectHunter')
		{
			zombie = this._criateZombieHunterObject(map, levelOfComplexity);
		}
		else if ((arrayTypes[typeZombie] == 'PlayerHunter') || (zombie == null))
		{
			zombie = this._criateZombieHunterPlayer(map, levelOfComplexity);
		}
				
		return zombie;
	}
});
