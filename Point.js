
function Point(x_or_point, y) {
    var _self = this;
    
    _self.key = x + '-' + y;
    _self.x = x;
    _self.y = y;
    
}
Point.augment = function(point){
    return new Point(point.x, point.y);
};
Point.nw = function(x, y) {
    return new Point(x,y);
};