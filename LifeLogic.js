
function getKey(point) {
  return point.x + '-' + point.y;
}

function contains(points, point) {
  return !!points[getKey(point)];
}

function LifeLogic() {
  var _livePoints = {
    "8-8": { x: 8, y: 8 },
    "8-9": { x: 8, y: 9 },
    "20-6": { x: 20, y: 6 },
    "20-12": { x: 20, y: 12 },
    "21-9": { x: 21, y: 9 },
    "22-7": { x: 22, y: 7 },
    "23-8": { x: 23, y: 8 },
    "23-9": { x: 23, y: 9 },
    "23-10": { x: 23, y: 10 },
    "22-11": { x: 22, y: 11 },
    "24-9": { x: 24, y: 9 },
    "27-8": { x: 27, y: 8 },
    "27-7": { x: 27, y: 7 },
    "27-6": { x: 27, y: 6 },
    "28-6": { x: 28, y: 6 },
    "28-7": { x: 28, y: 7 },
    "28-8": { x: 28, y: 8 },
    "29-5": { x: 29, y: 5 },
    "29-9": { x: 29, y: 9 },
    "31-9": { x: 31, y: 9 },
    "31-10": { x: 31, y: 10 },
    "31-5": { x: 31, y: 5 },
    "31-4": { x: 31, y: 4 },
    "41-6": { x: 41, y: 6 },
    "42-6": { x: 42, y: 6 },
    "42-7": { x: 42, y: 7 },
    "41-7": { x: 41, y: 7 },
    "19-6": { x: 19, y: 6 },
    "19-12": { x: 19, y: 12 },
    "18-11": { x: 18, y: 11 },
    "17-10": { x: 17, y: 10 },
    "17-9": { x: 17, y: 9 },
    "17-8": { x: 17, y: 8 },
    "18-7": { x: 18, y: 7 },
    "7-9": { x: 7, y: 9 },
    "7-8": { x: 7, y: 8 },
  };
  var _self = this;

  _self.getPoints = function getPoints() {
    return _livePoints;
  };

  _self.toggle = function toggle(point) {
    if (_self.isAlive(point)) {
      for (var key in _livePoints) {
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

    for (var key in _livePoints) {
      var point = _livePoints[key];
      for (var i = -3; i < 4; i++) {
        for (var j = -3; j < 4; j++) {
          if (_lives({ x: point.x + i, y: point.y + j }) &&
            !contains(newPoints, { x: point.x + i, y: point.y + j })
          ) {
            var newPoint = { x: point.x + i, y: point.y + j };
            newPoints[getKey(newPoint)] = newPoint;
          }
        }
      }
    }

    _livePoints = newPoints;
    return _livePoints;
  };

  _self.isAlive = function isAlive(point) {
    return contains(_livePoints, point);
  };

  function _lives(point) {
    var liveNeighbors = 0;

    var x = point.x;
    var y = point.y;

    if (_self.isAlive({ x: x - 1, y: y - 1 })) liveNeighbors++;
    if (_self.isAlive({ x: x - 1, y: y })) liveNeighbors++;
    if (_self.isAlive({ x: x - 1, y: y + 1 })) liveNeighbors++;

    if (_self.isAlive({ x: x, y: y - 1 })) liveNeighbors++;
    if (_self.isAlive({ x: x, y: y + 1 })) liveNeighbors++;

    if (_self.isAlive({ x: x + 1, y: y - 1 })) liveNeighbors++;
    if (_self.isAlive({ x: x + 1, y: y })) liveNeighbors++;
    if (_self.isAlive({ x: x + 1, y: y + 1 })) liveNeighbors++;

    if (_self.isAlive(point))
      return liveNeighbors === 2 || liveNeighbors === 3;
    else
      return liveNeighbors === 3;
  }
}
