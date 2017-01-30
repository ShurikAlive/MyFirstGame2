CZombieHunterPlayer = CBaseZombie.extend({
	_getTargetedForDestruction: function(map)
	{
		return map.getPlayersArray()[this._indexGoalOfDestroying];
	}
});
