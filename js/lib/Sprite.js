CSprite = Base.extend({
	constructor: function(pic, pos, size, speed, frames, dir, once, sizeOnMap) 
{
    this.pos = pos;
    this.size = size;
	this.sizeOnMap = sizeOnMap;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 0;
    this.pic = pic;
    this.dir = dir || 'horizontal';
    this.once = once;
	this.objX = 0;
	this.objY = 0;
},

update: function(dt) 
{
    this._index += this.speed*dt;
},

updateCoordinateObject: function(x, y) 
{
    this.objX = x;
	this.objY = y;
},

render: function(ctx) 
{
    var frame;

    if(this.speed > 0) 
	{
        var max = this.frames.length;
        var idx = Math.floor(this._index);
        frame = this.frames[idx % max];

        if(this.once && idx >= max) 
		{
            this.done = true;
            return;
        }
    }
    else 
	{
        frame = 0;
    }


    var x = this.pos[0];
    var y = this.pos[1];

    if(this.dir == 'vertical') 
	{
        y += frame * this.size[1];
    }
    else 
	{
        x += frame * this.size[0];
    }

    ctx.drawImage(this.pic,
                  x, y,
                  this.size[0], this.size[1],
                  this.objX, this.objY,
                  this.sizeOnMap[0], this.sizeOnMap[1]);
}
});

