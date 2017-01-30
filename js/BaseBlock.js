CBaseBlock = Base.extend({
	constructor: function(ctx, pic, x, y) {
		this._ctx = ctx;
		this._pic = pic;
		this._x = x;
		this._y = y;
		this._width = BLOCK_WIDTH;
		this._height = BLOCK_HEIGHT;
	},

	draw: function()
	{
		this._ctx.drawImage(this._pic, 0, 0, SPRITE_BLOCK_WIDTH, SPRITE_BLOCK_HEIGHT,
				this._x, this._y, this._width, this._height);
	}
});
