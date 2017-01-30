CStandartWeapon = CBaseWeapon.extend({
	constructor: function() 
	{
		this._name = "StandartWeapon";
		this._numberOfCartridges = 150;
		this._lastFire = Date.now();
		this._rate = 500;//время в мс между выстрелами(вылетами патронов)
		this._bulletsOnTheMap = [];
	},

	getNumberOfRounds: function()
	{
		return this._numberOfCartridges;
	},
	
	weaponCanShoot: function()
	{
		return (this._numberOfCartridges > 0 && (Date.now() - this._lastFire >= this._rate));
	},
	
	makeAShot: function(player, pic)
	{
		if (this.weaponCanShoot())
		{
			this._numberOfCartridges--;
			var bullet = new CStandartBullet(player, pic);
			this._bulletsOnTheMap.push(bullet);
			this._lastFire = Date.now();
		}
	},
	
	_cleaningFacedBullets: function()
	{
		var bullets = [];
		
		for (var bullet in this._bulletsOnTheMap)
		{
			if (!this._bulletsOnTheMap[bullet].bulletHitTheObject())
			{
				bullets.push(this._bulletsOnTheMap[bullet]);
			}
		}
		
		this._bulletsOnTheMap = bullets;
	},
	
	update: function(map, dt)
	{
		for (var bullet in this._bulletsOnTheMap)
		{
			this._bulletsOnTheMap[bullet].updateState(map, dt);
		}
		
		this._cleaningFacedBullets();
	},
	
	drawBullets: function(ctx)
	{
		for (var bullet in this._bulletsOnTheMap)
		{
			this._bulletsOnTheMap[bullet].draw(ctx);
		}
	}
});