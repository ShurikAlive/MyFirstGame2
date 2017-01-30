CGame = Base.extend
({
	_ctx: null,
	_example: null,
	_resources: null,
	
	_menu: null,
	_playingField: null,
	
	_lastTime: null,
	
	_isUpdateMenu: true,
	
	_levelOfComplexity: '',
	
	constructor: function(example, ctx, resources) 
	{
		this._example = example;
		this._ctx = ctx;
		this._resources = resources;
		
		this._menu = new CMenu(this._example, this._ctx, this._resources);
		this._playingField = new CPlayingField(this._example, this._ctx, this._resources);
	},
	
	mouseWasClicked: function(x, y)
	{
		if (this._isUpdateMenu)
		{
			this._levelOfComplexity = this._menu.HitButtonInMenu(x, y);
		
			if (this._levelOfComplexity != '')
			{
				this._isUpdateMenu = false;
			}
		}
	},
	
	update: function(dt)
	{
		if (this._isUpdateMenu)
		{
			this._menu.work();
		}
		else
		{
			this._playingField.work(dt, this._levelOfComplexity);
		}
	}
});
