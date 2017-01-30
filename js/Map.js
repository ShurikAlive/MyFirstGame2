function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

CMap = Base.extend({
	_obstaclesArray: null,//массив препятствий
	_obstaclesMap: null,//Сама карта
	_objectSpawnArray: null,//Массив спавнов зомби
	_objectPlayerDefenceArray: null,//Объект, который должен защищать игрок
	
	_playersArray: null,//Массив с игроками
	_zombiesArray: null,//Массив зомби
	
	_height: null,
	_width: null,
	
	_example: null,
	_ctx: null,
	_resources: null,

	constructor: function(example, ctx, resources)
	{
		this._obstaclesArray = [];
		this._obstaclesMap = [];
		this._objectSpawnArray = [];
		this._objectPlayerDefenceArray = [];
		
		this._playersArray = [];
		this._zombiesArray = [];
		
		this._height = 0;
		this._width = 0;
	
		this._example = example;
		this._ctx = ctx;
		this._resources = resources;
	},

	getHeight: function()
	{
		return this._height;
	},
	
	getWidth: function()
	{
		return this._width;
	},
	
	getNumberKilledZombies: function()
	{
		var numberKilledZombie = 0;
		
		for (var zombie in this._zombiesArray)
		{
			if (this._zombiesArray[zombie].getIsKilled())
			{
				numberKilledZombie ++;
			}
		}
		
		return numberKilledZombie;
	},
	
	pushZombieInZombiesArray: function(zombie)
	{
		this._zombiesArray.push(zombie);
	},
	
	getZombiesArray: function()
	{
		return this._zombiesArray;
	},
	
	pushPlayerInPlayersArray: function(player)
	{
		this._playersArray.push(player);
	},
	
	getPlayersArray: function()
	{
		return this._playersArray;
	},
	
	getObstaclesMap: function()
	{
		return this._obstaclesMap;
	},
	
	getObstaclesArray: function()
	{
		return this._obstaclesArray;
	},
	
	getObjectSpawnArray: function()
	{
		return this._objectSpawnArray;
	},
	
	getObjectPlayerDefenceArray: function()
	{
		return this._objectPlayerDefenceArray;
	},
	
	_setObstacles: function(map)
	{
		var factoryObstacles = new CFactoryObstacles(this._example, this._ctx, this._resources);
	
		for (var j = 0; j < map.length; ++j)
		{
			for (var i = 0; i < map[j].length; ++i)
			{
				if (getRandomInt(0, 100) <= 10)
				{
					var obstacle = factoryObstacles.criateObstacle(i * BLOCK_WIDTH, j * BLOCK_HEIGHT);
					map[j][i] = obstacle;
					this._obstaclesArray.push(obstacle);
				}
			}
		}
	},
	
	_setFunctionalObject: function(map, objName, iMin, iMax, jMin, jMax)
	{
		var i = getRandomInt(iMin, iMax);
		var j = getRandomInt(jMin, jMax);
		
		while (map[j][i] != null)
		{
			i = getRandomInt(iMin, iMax);
			j = getRandomInt(jMin, jMax);
		}
	
		var object = null;
	
		if (objName == 'spawn')
		{
			var pic = this._resources.get(IMAGE_SPAWN);
			object = new CSpawnObject(this._ctx, pic, i * BLOCK_WIDTH, j * BLOCK_HEIGHT);
			this._objectSpawnArray.push(object);
		}
		else if (objName == 'defObj')
		{
			var pic = this._resources.get(IMAGE_DEFEND_OBJECT);
			var picKilled = this._resources.get(IMAGE_DETH_DEFEND_OBJECT);
			object = new CDefencObject(this._ctx, pic, picKilled,i * BLOCK_WIDTH, j * BLOCK_HEIGHT);
			this._objectPlayerDefenceArray.push(object);
		}
		
		map[j][i] = object;
	},
	
	init: function()
	{
		var arrayMap = [
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null],
		];
	
		this._setObstacles(arrayMap);
		this._setFunctionalObject(arrayMap, 'spawn', 0, 11, 0, 2);
		this._setFunctionalObject(arrayMap, 'defObj', 0, 11, 7, 9);
				
		this._height = arrayMap.length * BLOCK_HEIGHT;
		this._width = arrayMap[1].length * BLOCK_WIDTH;
		this._obstaclesMap = arrayMap;
	},
	
	draw: function()
	{
		for (var j = 0; j < this._obstaclesMap.length; ++j)
		{
			for (var i = 0; i < this._obstaclesMap[j].length; ++i)
			{
				var pic = this._resources.get(IMAGE_GRASS);
				var x = i * BLOCK_WIDTH;
				var y = j * BLOCK_HEIGHT;
				
				this._ctx.drawImage(pic, 0, 0, SPRITE_BLOCK_GRASS_WIDTH, SPRITE_BLOCK_GRASS_HEIGHT,
						x, y, BLOCK_WIDTH, BLOCK_HEIGHT);	
					
				if (this._obstaclesMap[j][i] != null)
				{
					this._obstaclesMap[j][i].draw();
				}
			}
		}
	}
});