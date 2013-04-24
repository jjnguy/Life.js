

function LifeBoard(canvas, startingLogic) {
    var _canvas = canvas;
    var _$canvas = $(canvas);
    var _ctx = _canvas.getContext('2d');
    var _self = this;
    
    var _viewportOrigin = { x: 0, y: 0 };
    
    var _state = startingLogic || new LifeLogic();
    
    var _square_width = 10;
    
    var _liveCellColor = "Black";
    var _liveCellHoverColor = "#A30008";
    var _mouseColor = "#00A308";
    
    // Canvas Events
    
    _$canvas.click(function(e){
        var point = {x:e.pageX, y:e.pageY};
        convertCoord(point);
        _self.toggle(undoViewportShift(point));
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
    // drag stuff
    var dragStart;
    _$canvas.mousemove(function(e){
        if (dragStart) {
            var point = {x:e.pageX,y:e.pageY};
            convertCoord(point);
            var xDiff = point.x - dragStart.x;
            var yDiff = point.y - dragStart.y;
            _self.origin({x:_self.origin().x - xDiff, y:_self.origin().y - yDiff});
            dragStart = point;
        }
    });
    _$canvas.mousedown(function(e){
        dragStart = {x:e.pageX,y:e.pageY};
        convertCoord(dragStart);
    });
    _$canvas.mouseup(function(){
        dragStart = undefined;
    });
    // end drag stuff
    // End Canvas events
    
    _self.toggle = function toggle(point) {
        _state.toggle(point);
        _self.render();
    };
    
    function drawRule(){
        if (_square_width < 3) return;
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
        for(var key in points){
            var point = shiftPointForViewport(points[key]);
            _ctx.fillRect(point.x * _square_width, point.y * _square_width, _square_width, _square_width);
        }
    };
    
    _self.advance = function advance(){
        return _state.advance();
    };
    
    _self.squareWidth = function squareWidth(newWidth) {
        if (newWidth) {
            _square_width = parseInt(newWidth, 10);
            _self.render();
        }
        return _square_width;
    };
    
    _self.origin = function origin(newOrigin) {
        if (newOrigin) {
            _viewportOrigin = newOrigin;
            _self.render();
        }
        return _viewportOrigin;
    };
    
    _self.getPoints = function getPoints() {
        return _state.getPoints();
    };
    
    function shiftPointForViewport(point) {
        return { x:point.x - _viewportOrigin.x, y: point.y - _viewportOrigin.y };
    }

    function undoViewportShift(point) {
        return { x:point.x + _viewportOrigin.x, y: point.y + _viewportOrigin.y };
    }
    
    function convertCoord(point){
        if (point.converted) return point;
        point.x = Math.floor(point.x / _square_width);
        point.y = Math.floor(point.y / _square_width);
        point.converted = true;
        return point;
    }
}
