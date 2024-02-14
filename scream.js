class Scream {
    constructor(game, x, y, target) {
        console.log("SHOOT!");
        Object.assign(this, { game, x, y, target });

        this.radius = 12;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectile.png");

        var dist = distance(this, this.target);
        this.maxSpeed = 100 // pixels per second

        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        this.cache = [];

        // this.updateHitBox();
        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 0, 10, 10, 2, 0.2, 0, false, true, false));
        
        this.elapsedTime = 0;
    };


    update() {
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent instanceof Link && collide(this, ent)) {
                // ent instanceof Link && ent.hurtBox.collide(this.hitBox);
                var damage = 10; 
                ent.hitpoints -= damage;
                // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                this.removeFromWorld = true;
            }
        }

        // this.updateHitBox();
        // this.updateLastHitBox();
    };

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 5);

        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = "Green";
        //     ctx.beginPath();
        //     ctx.arc(this.x - this.game.camera.x, this.y - this.game.camera.y, this.radius, 0, 2 * Math.PI);
        //     ctx.closePath();
        //     ctx.stroke();
        // }
    };
};