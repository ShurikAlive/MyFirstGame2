CSpawnObject = CBaseBlock.extend({
	draw: function()
	{
		this._ctx.drawImage(this._pic, 0, 0, SPRITE_BLOCK_SPAWN_WIDTH, SPRITE_BLOCK_SPAWN_HEIGHT,
				this._x, this._y, this._width, this._height);
	}
});

