
function contains(points, point) {
    for(var i =0; i < points.length; i++){
        var toCheck = points[i];
        if (toCheck.x == point.x && toCheck.y == point.y)
            return true;
    }
    return false;
}

function LifeLogic() {
    var _livePoints = [{x:1,y:1}, {x:2,y:2}, {x:2,y:3}, {x:1,y:3}, {x:0,y:3}];
    var _self = this;
    
    _self.getPoints = function getPoints(){
        return _livePoints;
    };
    
    _self.toggle = function toggle(point) {
        if (_self.isAlive(point)) {
            for (var i =0;i < _livePoints.length; i++){
                var toCheck = _livePoints[i];
                if (toCheck.x == point.x && toCheck.y == point.y) {
                    _livePoints.splice(i, 1);
                    return;
                }
            }
        } else {
            _livePoints.push(point);
        }
    };
    
    _self.advance = function advance() {
        var newPoints = [];
        
        for(var t = 0; t < _livePoints.length; t++) {
            var point = _livePoints[t];
            for (var i = -3; i < 4; i++) {
                for (var j = -3; j < 4; j++){
                    if (_lives({x:point.x+i, y:point.y+j}) && 
                        !contains(newPoints, {x:point.x+i, y:point.y+j})
                    ) {
                        newPoints.push({x:point.x+i, y:point.y+j});
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
    
    function _lives(point){
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
