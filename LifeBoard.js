

function LifeBoard(canvas, startingLogic) {
    var _canvas = canvas;
    var _$canvas = $(canvas);
    var _ctx = _canvas.getContext('2d');
    var _self = this;
    
    var _state = startingLogic || new LifeLogic();
    
    var _square_width = 10;
    
    var _liveCellColor = "Black";
    var _liveCellHoverColor = "#888";
    var _mouseColor = "#00A308";
    
    // Canvas Events
    
    _$canvas.click(function(e){
        _self.toggle({x:e.pageX, y:e.pageY});
    });
    
    var lastPoint = {};
    var lastPointWasAlive = false;
    _$canvas.mousemove(function(e){
        _self.render();
        var point = {x:e.pageX,y:e.pageY};
        convertCoord(point);
        _ctx.fillStyle = lastPointWasAlive ? _liveCellColor : "#ffffff";
        _ctx.fillRect(lastPoint.x * _square_width, lastPoint.y * _square_width, _square_width, _square_width);
        lastPoint = point;
        if (!_state.isAlive(point)){
            _ctx.fillStyle = _mouseColor;
        } else {
            _ctx.fillStyle = _liveCellHoverColor;
        }
        _ctx.fillRect(point.x * _square_width, point.y * _square_width, _square_width, _square_width);
    });
    
    // End Canvas events
    
    _self.toggle = function toggle(point) {
        convertCoord(point);
        _state.toggle(point);
        _self.render();
    };
    
    function drawRule(){
        _ctx.lineWidth = 0.25;
        for(var i = 0; i < _canvas.width; i+=_square_width) {
            _ctx.beginPath();
            _ctx.moveTo(i, 0);
            _ctx.lineTo(i, _canvas.height);
            _ctx.stroke();
        }
        for(i = 0; i < _canvas.height; i+=_square_width) {
            _ctx.beginPath();
            _ctx.moveTo(0, i);
            _ctx.lineTo(_canvas.width, i);
            _ctx.stroke();
        }
    }
    
    _self.render = function render() {
        _canvas.width = _canvas.width;
        drawRule();
        var points = _state.getPoints();
        _ctx.fillStyle = _liveCellColor;
        for(var i = 0; i < points.length; i++){
            var point = points[i];
            _ctx.fillRect(point.x * _square_width, point.y * _square_width, _square_width, _square_width);
        }
    };
    
    _self.advance = function advance(){
        return _state.advance();
    };
    
    function convertCoord(point){
        point.x = Math.floor(point.x / _square_width);
        point.y = Math.floor(point.y / _square_width);
    }
}
