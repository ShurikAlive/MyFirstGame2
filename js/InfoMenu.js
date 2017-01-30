CInfoMenu = Base.extend
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
	
	_drawFone: function(map)
	{
		var x = map.getWidth();
		var y = 0;
		var width = this._example.width - map.getWidth();
		var height = map.getHeight();
	
		this._ctx.fillStyle = "black";
		this._ctx.fillRect(x, y, width, height);
		this._ctx.strokeRect(x, y, width, height);
	},
	
	_getZombieInfo: function(map)
	{
		var info = '';
		
		info += map.getNumberKilledZombies();
		info += ' / 50';
		
		return info;
	},
	
	_drawInfo: function(player, map)
	{
		this._ctx.font = 'bold ' + 7 * RATIO_IMAGE_SIZE +'px courier';
		this._ctx.textAlign = 'left';
		this._ctx.textBaseline = 'top';
		this._ctx.fillStyle = '#FFFFFF';
	
		this._ctx.fillText('Жизни игрока:', map.getWidth() + 10, 15 * RATIO_IMAGE_SIZE);
		this._ctx.fillText(player.getHealth(), map.getWidth() + 10, 30 * RATIO_IMAGE_SIZE);

		var defencObj = map.getObjectPlayerDefenceArray();
		
		this._ctx.fillText('Жизни защищаемого объекта:', map.getWidth() + 10, 55  * RATIO_IMAGE_SIZE);
		this._ctx.fillText(defencObj[0].getHealth(), map.getWidth() + 10, 70 * RATIO_IMAGE_SIZE);

		this._ctx.fillText('Количество патронов:', map.getWidth() + 10, 95 * RATIO_IMAGE_SIZE);
		this._ctx.fillText(player.getAmmo(), map.getWidth() + 10, 110 * RATIO_IMAGE_SIZE);
		
		var messageZombiesInfo = this._getZombieInfo(map);
		
		this._ctx.fillText('Зомби осталось убить: ', map.getWidth() + 10, 135 * RATIO_IMAGE_SIZE);
		this._ctx.fillText(messageZombiesInfo, map.getWidth() + 10, 150 * RATIO_IMAGE_SIZE);
	},		
		
	draw: function(player, map)
	{
		this._drawFone(map);
		this._drawInfo(player, map);
	}
});
