CFactoryPlayers = Base.extend
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
	
	criatePlayer: function(map)
	{
		var i = getRandomInt(0, (map.getObstaclesMap()[0].length - 1));
		var j = getRandomInt(0, (map.getObstaclesMap().length - 1));
		var pic = this._resources.get(IMAGE_PLAYER);
		
		while (map.getObstaclesMap()[j][i] != null)
		{
			i = getRandomInt(0, (map.getObstaclesMap()[0].length - 1));
			j = getRandomInt(0, (map.getObstaclesMap().length - 1));
		}
		
		var x = i * BLOCK_WIDTH;
		var y = j * BLOCK_HEIGHT;
		
		return new CPlayer(this._ctx, pic, x, y);
	}
});
