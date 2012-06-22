

function LifeBoard(canvas, startingLogic) {
    var _canvas = canvas;
    var _$canvas = $(canvas);
    var _ctx = _canvas.getContext('2d');
    var _self = this;
    
    var _square_width = 5;
    
    var _state = startingLogic || new LifeLogic();
    
    // Canvas Events
    
    _$canvas.click(function(e){
        _self.toggle({x:e.pageX, y:e.pageY});
    });
    
        var lastPoint = {};
    _$canvas.mousemove(function(e){
        var point = {x:e.pageX,y:e.pageY};
        convertCoord(point);
        _ctx.fillStyle = "#ffffff";
        _ctx.fillRect(lastPoint.x * _square_width, lastPoint.y * _square_width, _square_width, _square_width);
        lastPoint = point;
        if (!_state.isAlive(point)){
            _ctx.fillStyle = "#00A308";
            _ctx.fillRect(point.x * _square_width, point.y * _square_width, _square_width, _square_width);
        }
    });
    
    // End Canvas events
    
    _self.toggle = function toggle(point) {
        _state.toggle(point);
        _self.render();
    };
    
    _self.render = function render() {
        _canvas.width = _canvas.width;
        var points = _state.getPoints();
        for(var i = 0; i < points.length; i++){
            var point = points[i];
            _ctx.fillRect(point.x * _square_width, point.y * _square_width, _square_width, _square_width);
        }
    };
    
    _self.advance = function advance(){
        return _state.advance();
    };
    
    function convertCoord(point){
        point.x = Math.floor(point.x/_square_width);
        point.y = Math.floor(point.y / _square_width);
    }
}
