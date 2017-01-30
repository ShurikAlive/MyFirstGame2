CButton = Base.extend({
	_ctx: null,
	_pic: null,
	
	_x: null,
	_y: null,
	_width: null,
	_height: null,
	
	_message: null,

	constructor: function(ctx, pic, message, x, y, width, height) 
	{
		this.ctx = ctx;
		this.pic = pic;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.message = message;
	},
	
	_drawFone: function()
	{
		this.ctx.drawImage(this.pic, 0, 0, SPRITE_BUTTON_WIDTH, SPRITE_BUTTON_HEIGHT,
				this.x, this.y, this.width, this.height);
	},
	
	_drawText: function()
	{
		this.ctx.font = 'bold ' + SIZE_TEXT_ON_BUTTON * RATIO_IMAGE_SIZE +'px courier';
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'top';
		this.ctx.fillStyle = '#000000';
		
		var textX = this.x + (this.width / 2);
		var textY =  this.y +(this.height / 2) - (SIZE_TEXT_ON_BUTTON * RATIO_IMAGE_SIZE / 2);
		
		this.ctx.fillText(this.message, textX, textY);
	},
	
	draw: function()
	{
		this._drawFone();
		this._drawText();
	},
	
	hitButton: function(x, y)
	{
		return (((this.x <= x) && (this.x + this.width >= x)) 
				&& ((this.y <= y) && (this.y + this.height >= y)));
	}
	
});
