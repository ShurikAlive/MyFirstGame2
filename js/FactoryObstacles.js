CFactoryObstacles = Base.extend
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
	
	criateObstacle: function(x, y)
	{
		if (getRandomInt(0, 1) == 1)
		{
			var pic = this._resources.get(IMAGE_BOX)
			return new CBox(this._ctx, pic, x, y);
		}
		else
		{
			var pic = this._resources.get(IMAGE_STONE)
			return new CStone(this._ctx, pic, x, y);
		}
	}
});
