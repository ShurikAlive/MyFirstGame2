var _game = null;
var _lastTime = Date.now();

var _requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function _makeGameIteration()
{
	var now = Date.now();
	var dt = (now - this._lastTime) / 1000.0;
	
	_game.update(dt);
	
	this._lastTime = now;
	_requestAnimFrame(_makeGameIteration);
}

function _startingGame()
{
	var game = new CGame(_example, _ctx, resources);
	_game = game;
	
	_makeGameIteration();
}

function main()
{
	_example = document.getElementById("page");
	_ctx = _example.getContext('2d');
	
	_example.focus();
	
	_example.width *= RATIO_IMAGE_SIZE;
	_example.height *= RATIO_IMAGE_SIZE;
	
	_example.onclick = function(e)
	{
		var x = (e.pageX - _example.offsetLeft);
		var y = (e.pageY - _example.offsetTop);
       
		if (_game != null)
		{
			_game.mouseWasClicked(x, y);
		}
	};
		
	resources.load([
    IMAGE_GRASS, IMAGE_SPAWN, IMAGE_BOX,
	IMAGE_STONE, IMAGE_DEFEND_OBJECT, IMAGE_ZOMBIE_1,
	IMAGE_ZOMBIE_2, IMAGE_ZOMBIE_3, IMAGE_ZOMBIE_4,
	IMAGE_PLAYER, IMAGE_DETH_DEFEND_OBJECT, IMAGE_STANDART_BULLET,
	IMAGE_FONE_MENU, IMAGE_BUTTON
	]);
	
	resources.onReady(_startingGame);
}