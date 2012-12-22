THREE.Planet = function () {
    THREE.EventTarget.call(this);

    var _this = this;

};

function DrawTrackLine(color, radius, position) {
    
    var size = 360 / radius;
    var linegeometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({ color: color, opacity: 1.0 });
    for (var i = 0; i <= radius; i++) {
        var segment = (i * size) * Math.PI / 180;
        linegeometry.vertices.push(new THREE.Vector3(Math.cos(segment) * radius, 0, Math.sin(segment) * radius));
    }

    return new THREE.Line(linegeometry, material);
    
};