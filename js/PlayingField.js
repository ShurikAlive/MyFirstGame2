CPlayingField = Base.extend
({
	_ctx: null,
	_example: null,
	_resources: null,
	
	_map: null,
	
	_player: null,
	
	_zombieFactory: null,
	
	_gameInfoMenue: null,
	
	constructor: function(example, ctx, resources) 
	{
		this._example = example;
		this._ctx = ctx;
		this._resources = resources;
		
		var factoryMaps = new CFactoryMaps(this._example, this._ctx, this._resources);
		this._map = factoryMaps.criateMap();
		
		this._zombieFactory = new CFactoryZombies(this._example, this._ctx, this._resources);
		
		this._gameInfoMenue = new CInfoMenu(example, ctx, resources);
		
		var factoryPlayers = new CFactoryPlayers(this._example, this._ctx, this._resources)
		this._player = factoryPlayers.criatePlayer(this._map);
		this._map.pushPlayerInPlayersArray(this._player);
	},
	
	
	
	_handleInputKeyboard: function(dt)
	{
		var lastPlayerX = this._player.getX();
		var lastPlayerY = this._player.getY();
		this._player._heShoots = false;
	
		if (input.isDown('s'))
		{
			this._player.takeStepDown(dt, this._map);
		}

		if (input.isDown('w'))
		{
			this._player.takeStepUp(dt, this._map);
		}

		if (input.isDown('a'))
		{
			this._player.takeStepLeft(dt, this._map);
		}

		if (input.isDown('d'))
		{
			this._player.takeStepRight(dt, this._map);
		}
		
		if (input.isDown('SPACE'))
		{
			this._player.pressTrigger(this._resources.get(IMAGE_STANDART_BULLET));
		}
		
		this._player.determineStatus(lastPlayerX, lastPlayerY);
	},
	
	_update: function(dt, levelOfComplexity)
	{
		this._handleInputKeyboard(dt);
		this._player.update(this._map, dt);
		
		if (getRandomInt(1, 1000) <= 20)
		{
			var zombie = this._zombieFactory.criateZombie(this._map, levelOfComplexity);
		

			if (zombie != null)
			{
				this._map.pushZombieInZombiesArray(zombie);
			}
		}
		
		var zombieArray = this._map.getZombiesArray();
		
		for (var zombie in zombieArray)
		{
			zombieArray[zombie].update(dt, this._map);
		}
	},
		
	_draw: function(dt)
	{
		this._map.draw();
				
		var zombieArray = this._map.getZombiesArray();
		var arrayToDrawZombiesAndPlayers = [];
		
		arrayToDrawZombiesAndPlayers.push(this._player);
		
		for (var zombie in zombieArray)
		{
			if (zombieArray[zombie].getIsKilled())
			{
				zombieArray[zombie].draw(dt);
			}
			else
			{
				arrayToDrawZombiesAndPlayers.push(zombieArray[zombie])
			}			
		}
		
		this._player.drawWeapons();
		
		arrayToDrawZombiesAndPlayers.sort(function(a, b){return a._y - b._y;});
		
		for (var element in arrayToDrawZombiesAndPlayers)
		{
			arrayToDrawZombiesAndPlayers[element].draw(dt);
		}
		
		this._gameInfoMenue.draw(this._player, this._map);
	},
	
	_drawEndGameInfo: function()
	{
		this._ctx.fillStyle = "black";
		this._ctx.fillRect(0, 0, this._example.width, this._example.height);
		this._ctx.strokeRect(0, 0, this._example.width, this._example.height);
		
		this._ctx.font = 'bold ' + 15 * RATIO_IMAGE_SIZE +'px courier';
		this._ctx.textAlign = 'center';
		this._ctx.textBaseline = 'top';
		this._ctx.fillStyle = '#FFFFFF';
		
		if (this._playerLose())
		{
			this._ctx.fillText('You lose!', this._example.width / 2, this._example.height / 2);
		}
		else if (this._playerWin())
		{
			this._ctx.fillText('You win!', this._example.width / 2, this._example.height / 2);
		}
	},
	
	_playerLose: function()
	{
		return (this._player.getIsKilled() || this._map.getObjectPlayerDefenceArray()[0].getIsKilled());
	},
	
	_playerWin: function()
	{
		return ((this._map.getNumberKilledZombies() == 50));
	},
	
	getEndGameStatus: function()
	{
		return (this._playerWin() || this._playerLose());
	},
	
	work: function(dt, levelOfComplexity)
	{
		
		if (!this.getEndGameStatus())
		{
			this._update(dt, levelOfComplexity);
			this._draw(dt);
		}
		else
		{
			this._drawEndGameInfo();
		}
	}
});
