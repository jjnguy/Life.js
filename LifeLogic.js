
function getKey(point) {
    return point.x + '-' + point.y;
}

function contains(points, point) {
    return !!points[getKey(point)];
}

function LifeLogic() {
    var _livePoints = {};
    _livePoints['8-8'] = {x:8, y:8};
    var pts =[
   {x:4,y:4},
   {x:4,y:5},
   {x:5,y:5},
   {x:5,y:4},
   {x:14,y:4},
   {x:14,y:5},
   {x:14,y:6},
   {x:15,y:3},
   {x:16,y:2},
   {x:17,y:2},
   {x:15,y:7},
   {x:16,y:8},
   {x:17,y:8},
   {x:18,y:5},
   {x:19,y:3},
   {x:19,y:7},
   {x:20,y:6},
   {x:20,y:5},
   {x:20,y:4},
   {x:21,y:5},
   {x:24,y:4},
   {x:25,y:4},
   {x:25,y:3},
   {x:24,y:3},
   {x:24,y:2},
   {x:25,y:2},
   {x:26,y:5},
   {x:26,y:1},
   {x:28,y:1},
   {x:28,y:0},
   {x:28,y:5},
   {x:28,y:6},
   {x:38,y:2},
   {x:39,y:2},
   {x:38,y:1},
   {x:39,y:1},
];
    var _self = this;
    
    _self.getPoints = function getPoints(){
        return _livePoints;
    };
    
    _self.toggle = function toggle(point) {
        if (_self.isAlive(point)) {
            for (var key in _livePoints){
                var toCheck = _livePoints[key];
                if (toCheck.x == point.x && toCheck.y == point.y) {
                    delete _livePoints[key];
                    return;
                }
            }
        } else {
            _livePoints[getKey(point)] = point;
        }
    };
    
    _self.advance = function advance() {
        var newPoints = {};
        
        for(var key in _livePoints) {
            var point = _livePoints[key];
            for (var i = -3; i < 4; i++) {
                for (var j = -3; j < 4; j++){
                    if (_lives({x:point.x+i, y:point.y+j}) && 
                        !contains(newPoints, {x:point.x+i, y:point.y+j})
                    ) {
                        var newPoint = {x:point.x+i, y:point.y+j};
                        newPoints[getKey(newPoint)] = newPoint;
                    }
                }
            }
        }
        
        _livePoints = newPoints;
        return _livePoints;
    };
    
    _self.isAlive = function isAlive(point){
        return contains(_livePoints, point);
    };
    
    function _lives(point) {
        var liveNeighbors = 0;
        
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++){
                if (i === 0 && j === 0) continue;
                if (_self.isAlive({x:point.x+i, y:point.y+j})) {
                    liveNeighbors++;
                }
            }
        }
        
        if (_self.isAlive(point))
            return liveNeighbors == 2 || liveNeighbors == 3;
        else
            return liveNeighbors == 3;
    }
}
