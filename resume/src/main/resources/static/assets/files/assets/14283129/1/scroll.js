var Scroll = pc.createScript('scroll');

// initialize code called once per entity
Scroll.prototype.initialize = function() {
    this.material = this.entity.model.material;
    this.offsetSpeed = new pc.Vec2();
    this.speedX = -0.01;
    this.speedY = 0.01;
    
    this.cameraEntity = null;
    
    this.angle = 0;
    this.x = 0;
    this.y = 0;
    
    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    
    if(this.app.touch)
    	this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
};

Scroll.prototype.onMouseMove = function(event) {  
    if(this.cameraEntity === null) {
        this.cameraEntity = this.app.root.findByName('Camera');
    }
    
    this.x = event.x;
    this.y = event.y;
};

Scroll.prototype.onTouchMove = function(event) {
    this.onMouseMove(event.touches[0]);
};

// update code called every frame
Scroll.prototype.update = function(dt) {
    
    this.angleZ = pc.math.lerp(7, -7, this.x / window.screen.width);
    this.angleX = pc.math.lerp(-4, 4, this.y / window.screen.height);
    
    this.entity.setLocalEulerAngles(this.angleX, 0, this.angleZ);
    this.offsetSpeed.set(this.speedX, this.speedY);
    this.offsetSpeed.scale(dt);

    // Update the diffuse and normal map offset values
    this.material.diffuseMapOffset = this.material.diffuseMapOffset.add(this.offsetSpeed);
    this.material.normalMapOffset.add(this.offsetSpeed);
    this.material.update();
    
};

// swap method called for script hot-reloading
// inherit your script state here
// Scroll.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/