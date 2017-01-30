CZombieHunterObject = CBaseZombie.extend({
	_getTargetedForDestruction: function(map)
	{
		return map.getObjectPlayerDefenceArray()[this._indexGoalOfDestroying];
	}
});
