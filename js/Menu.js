CMenu = Base.extend
({
	_ctx: null,
	_example: null,
	_resources: null,
	
	_easilyButton: null,
	_averageButton: null,
	_hardButton: null,
	
	constructor: function(example, ctx, resources) 
	{
		this._example = example;
		this._ctx = ctx;
		this._resources = resources;
		
		var buttonBackground =  this._resources.get(IMAGE_BUTTON);
		
		this._easilyButton = new CButton(ctx, buttonBackground, 'Easily', 300, 150, 400, 50);
		this._averageButton = new CButton(ctx, buttonBackground, 'Average', 300, 250, 400, 50);
		this._hardButton = new CButton(ctx, buttonBackground, 'Hard', 300, 350, 400, 50);
	},
	
	_drawFone: function()
	{
		var menuBackground = this._resources.get(IMAGE_FONE_MENU);
		_ctx.drawImage(menuBackground, 0, 0, 1280, 1024, 0, 0, _example.width, _example.height);
	},
	
	_drawButton: function()
	{
		this._easilyButton.draw();
		this._averageButton.draw();
		this._hardButton.draw();
	},
	
	_draw: function()
	{
		this._drawFone();
		this._drawButton();
	},
	
	HitButton: function(x, y, button)
	{
		return button.hitButton(x, y);
	},
	
	HitButtonInMenu: function(x, y)
	{
		if (this.HitButton(x, y, this._easilyButton))
		{
			return 'easily';
		}
		if (this.HitButton(x, y, this._averageButton))
		{
			return 'average';
		}
		if (this.HitButton(x, y, this._hardButton))
		{
			return 'hard';
		}
		
		return '';
	},
	
	work: function()
	{
		this._draw();
	}
});
