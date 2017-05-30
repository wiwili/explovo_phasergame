// WaterHose
// Creates and attaches an emitter that generates water particles
// Extends Phaser.Emitter and takes
var WaterHose = function(game,attachments,x,y){
<<<<<<< HEAD
    console.log('create hose');
=======
	console.log('create hose');

>>>>>>> 7f2ee85a0e722db7a2bba2504a5630ed4150ae6d
	// Create emitter
	Phaser.Particles.Arcade.Emitter.call(this, game, x, y); // create emitter
	this.game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics

	// Initialize variables
    this.waterStreamMaxDistance = 250; // Max distance of water
    this.particleVelocityOffsetMax = 10000; // distance of player to mouse cursor
    this.particleVelocityOffsetMin = 9900;
    this.particleVelocityOffsetNarrowing = 0.5; // particle narrowing
    this.particleVelocityOffsetNoise = 10; // adds variation to water particles

	// Attachment variables
    this.emitterSpriteOffsetX = x; // offset from the sprite
    this.emitterSpriteOffsetY = y;
	this.attachment = attachments;
	this.waterParticleLifetimeConstant = 4; // lifetime of the particle from creation

	// Declaring some variables
    this.particleVelocityOffset;
    this.distMouseCursorToEmitter;

	// Create particles
	this.makeParticles('Particle',0,1000,true,false);
	this.forEach(function(particle){
		
		particle.enableBody = true;
		particle.body.allowGravity = false;
	}, this);
    
    this.water_spray = game.add.audio('water_spray');
    this.water_end = game.add.audio('water_end');
    this.water_out = game.add.audio('water_out');

};

// Update the prototype
WaterHose.prototype = Object.create(Phaser.Particles.Arcade.Emitter.prototype);
WaterHose.prototype.constructor = WaterHose; // creation call

// Override Update Function
WaterHose.prototype.update = function() {
	if (this.game.input.mousePointer.isDown){
        this.y = this.attachment.y + transformOverAngle(this.attachment.rotation, this.emitterSpriteOffsetX, this.emitterSpriteOffsetY).y;
		this.x = this.attachment.x + transformOverAngle(this.attachment.rotation, this.emitterSpriteOffsetX, this.emitterSpriteOffsetY).x;

		var adjustedMouseX = this.game.input.mousePointer.x + this.game.camera.x;
		var adjustedMouseY = this.game.input.mousePointer.y + this.game.camera.y;
		
		this.distMouseCursorToEmitter = distanceBetween(adjustedMouseX, adjustedMouseY, this.x, this.y);

		// handles the "spread" of water particles (the further you aim the narrower the stream)
		this.particleVelocityOffset = this.distMouseCursorToEmitter ;
		if (this.particleVelocityOffset > this.particleVelocityOffsetMax){
			this.particleVelocityOffset = this.particleVelocityOffsetMax;
		}else if(this.particleVelocityOffset < this.particleVelocityOffsetMin){
			this.particleVelocityOffset = this.particleVelocityOffsetMin;
		}
		this.particleVelocityOffset = this.particleVelocityOffsetNarrowing*(this.particleVelocityOffsetMax-this.particleVelocityOffset) + this.particleVelocityOffsetNoise;
	// whatever the hell this is
		this.lifespan = this.waterStreamMaxDistance*this.waterParticleLifetimeConstant;

		if(this.distMouseCursorToEmitter > this.waterStreamMaxDistance){
			var similarTriangleProportion = this.waterStreamMaxDistance/this.distMouseCursorToEmitter;
			this.emitterToMouseDistanceX = similarTriangleProportion*(adjustedMouseX-this.x);
			this.emitterToMouseDistanceY = similarTriangleProportion*(adjustedMouseY-this.y);
		}else{
			this.emitterToMouseDistanceX = adjustedMouseX-this.x;
			this.emitterToMouseDistanceY = adjustedMouseY-this.y;
		}

		this.maxParticleSpeed = new Phaser.Point(this.emitterToMouseDistanceX+this.particleVelocityOffset, this.emitterToMouseDistanceY+this.particleVelocityOffset);
		this.minParticleSpeed = new Phaser.Point(this.emitterToMouseDistanceX-this.particleVelocityOffset, this.emitterToMouseDistanceY-this.particleVelocityOffset);

		// emit particles until out of water
		if(this.attachment.waterLevel > 0){
			this.emitParticle();
			this.attachment.waterLevel -= 0.1; // water flow rate, needs changing soon
        }
    }
    
    if (this.attachment.waterLevel > 0) {
        this.game.input.onDown.add(playsound, this);
        this.game.input.onUp.add(stopsound, this);
    }
};
var playsound = function() {
    this.water_spray.play('',0,0.75, true);
};
var stopsound = function() {
    this.water_spray.stop();
    this.water_end.play('',0,1,false);
}