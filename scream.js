class Scream {
    constructor(game, x, y, target) {
        console.log("SHOOT!");
        Object.assign(this, { game, x, y, target });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectile.png");

        var dist = distance(this, this.target);
        this.maxSpeed = 100 // pixels per second

        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        this.scale = 5;

        this.updateHitBox();
        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 0, 10, 10, 2, 0.2, 0, false, true, false));
        this.elapsedTime = 0;
    };

    updateLastHitBox() {
        this.lastHitBox = this.hitBox;
    }

    updateHitBox() {
        this.hitBox = new BoundingBox(this.x, this.y, 10 * this.scale, 10 * this.scale);
    }

    update() {
    if(!this.game.camera.gamePaused) {
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        this.updateLastHitBox();
        this.updateHitBox();

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent instanceof Link && this.hitBox.collide(ent.hurtBox) && !ent.damagedState) {
                console.log("ATTACK LANDED - PROJECTILE (BANSHEE) VS LINK");
                ent.damageEntity(1);
                // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                this.removeFromWorld = true;
            }
        }
    }
    };

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);

        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = "Green";
        //     ctx.beginPath();
        //     ctx.arc(this.x - this.game.camera.x, this.y - this.game.camera.y, this.radius, 0, 2 * Math.PI);
        //     ctx.closePath();
        //     ctx.stroke();
        // }

         //drawing the hitbox of the attack animation
         if (PARAMS.DEBUG && this.hitBox) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.hitBox.x - this.game.camera.x, this.hitBox.y - this.game.camera.y, this.hitBox.width, this.hitBox.height);
        }
    };
};