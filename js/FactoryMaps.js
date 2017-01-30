CFactoryMaps = Base.extend
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
	
	criateMap: function()
	{
		var map = new CMap(this._example, this._ctx, this._resources);
	
		map.init();
	
		return map;
	}
});
