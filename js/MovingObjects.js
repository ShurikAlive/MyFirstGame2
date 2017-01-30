function _collision(objA, objB) 
{
    if (objA._x + objA._width > objB._x && objA._x < objB._x + objB._width &&
	objA._y + objA._height > objB._y && objA._y < objB._y + objB._height) 
	{
        return true;
    }
    else 
	{
        return false;
    }
}


CMovingObjects = Base.extend({

	_x: null,
	_y: null,
	_height: null,
	_width: null,

	_collisionObstacles: function(map)
	{
		var obstaclesArray = map.getObstaclesArray();
	
		for (var obstacle in obstaclesArray)
		{
			if (_collision(this, obstaclesArray[obstacle]))
			{
				return true;
			}
		}
		
		return false;
	},
	
	_collisionDefenceObject: function(map)
	{
		var objectDefenceArray = map.getObjectPlayerDefenceArray();
	
		for (var object in objectDefenceArray)
		{
			if (_collision(this, objectDefenceArray[object]))
			{
				return true;
			}
		}
		
		return false;
	},
	
	_collisionPlayers: function(map)
	{
		var playersArray = map.getPlayersArray();
	
		for (var playerFromTeam in playersArray)
		{
			if (this != playersArray[playerFromTeam] && 
			_collision(this, playersArray[playerFromTeam]) &&
			!playersArray[playerFromTeam].getIsKilled())
			{
				return true;
			}
		}
		
		return false;
	},
	
	_collisionZombies: function(map)
	{
		var zombiesArray = map.getZombiesArray();
	
		for (var zombie in zombiesArray)
		{
			if (this != zombiesArray[zombie] && 
			_collision(this, zombiesArray[zombie]) &&
			!zombiesArray[zombie].getIsKilled())
			{
				return true;
			}
		}
		
		return false;
	},
	
	_checkingCollisionObject: function(map)
	{
		if (this._collisionObstacles(map))
		{
			return true;
		}
		if (this._collisionZombies(map))
		{
			return true;
		}
		if (this._collisionDefenceObject(map))
		{
			return true;
		}
		if (this._collisionPlayers(map))
		{
			return true;
		}
	
		return false;
	},
	
	_outOfBounds: function(map)
	{
		if (this._x < 0)
		{
			return true;
		}
		else if (map.getWidth() < (this._x + this._width))
		{
			return true;
		}
	
		if (this._y < 0)
		{
			return true;
		}
		else if (map.getHeight() < (this._y + this._height))
		{
			return true;
		}
		
		return false;
	}
});
