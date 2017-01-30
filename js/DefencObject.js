CDefencObject = Base.extend({
	constructor: function(ctx, pic, destroyedPicture, x, y) {
		this._ctx = ctx;
		this._pic = pic;
		this._destroyedPicture = destroyedPicture;
		this._x = x;
		this._y = y;
		this._width = DEFENCE_OBJECT_WIDTH;
		this._height = DEFENCE_OBJECT_HEIGHT;
		
		this.health = DEFENC_OBJECT_HEALTH;
		this.isDestroyed = false;
	},

	setDamage: function(damage)
	{
		this.health -= damage;
		
		if (this.health <= 0)
		{
			this.health = 0;
			this.isDestroyed = true;
		}
	},
	
	getHealth: function()
	{
		return this.health;
	},
	
	getIsKilled: function()
	{
		return this.isDestroyed;
	},
	
	draw: function()
	{
		if (!this.isDestroyed)
		{
			this._ctx.drawImage(this._pic, 0, 0, DEFENCE_OBJECT_WIDTH, DEFENCE_OBJECT_HEIGHT,
					this._x, this._y, this._width, this._height);
		}
		else
		{
			this._ctx.drawImage(this._destroyedPicture,
					0, 0, DESTROED_DEFENCE_OBJECT_WIDTH, DESTROED_DEFENCE_OBJECT_HEIGHT,
					this._x, this._y + 32, DESTROED_DEFENCE_OBJECT_WIDTH, 16);
		}
	}
});
