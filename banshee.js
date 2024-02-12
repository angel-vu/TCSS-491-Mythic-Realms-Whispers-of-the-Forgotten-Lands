class Banshee {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });

        this.game.banshee = this;
        this.scale = 2;

        this.initialPoint = { x, y };

        this.radius = 50;
        this.visualRadius = 200;

        this.hitpoints = 100;
        this.maxhitpoints = 100;
        this.dead = false;

        this.healthbar = new HealthBar(this);

        this.x = 0;
        this.y = 350;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./enemies/banshee.png");

        // banshee state variables
        this.facing = 3; // 0 = down, 1 = up, 2 = left, 3 = right 
        this.state = 0; // 0 = walk || idle, 1 = attack, 3 = damage taken

        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

        var dist = distance(this, this.target);
        this.maxSpeed = 150; // pixels per second
     
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        // banshee's animations
        this.updateBB();
        this.animations = [];
        this.loadAnimations();
        this.elapsedTime = 0;
    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) { // 4 directions
            this.animations.push([]);
            for (var j = 0; j < 3; j++) { // 3 states
                this.animations[i].push([]);
            }
        }
        
        // down (Walk, Idle, Attack)
        this.animations[0][0] = new Animator(this.spritesheet,   0,  15, 52,   65, 16, 0.1, 0, false, true, false);
        this.animations[0][1] = new Animator(this.spritesheet,   0,  15, 52,   65, 16, 0.1, 0, false, true, false);
        this.animations[0][2] = new Animator(this.spritesheet,   0, 160, 53.2, 67, 10, 0.1, 0, false, true, false);
        this.animations[0][3] = new Animator(this.spritesheet,   0, 350, 53.2, 80, 1, 0.1, 0, false, true, false);

        // up (Walk, Idle, Attack)
        this.animations[1][0] = new Animator(this.spritesheet,   0,   15, 52,   65, 16, 0.1, 0, false, true, false);
        this.animations[1][1] = new Animator(this.spritesheet,   0,   15, 52,   65, 16, 0.1, 0, false, true, false);
        this.animations[1][2] = new Animator(this.spritesheet,   0,  160, 53.2, 67, 10, 0.1, 0, false, true, false);
        this.animations[1][3] = new Animator(this.spritesheet,   0, 350, 53.2, 80, 1, 0.1, 0, false, true, false);

        // left (Walk, Idle, Attack)
        this.animations[2][0] = new Animator(this.spritesheet,   0,  15, 52,   65, 16, 0.1, 0, false, true, false);
        this.animations[2][1] = new Animator(this.spritesheet,   0,  15, 52,   65, 16, 0.1, 0, false, true, false);
        this.animations[2][2] = new Animator(this.spritesheet,   0, 160, 53.2, 67, 10, 0.1, 0, false, true, false);
        this.animations[2][3] = new Animator(this.spritesheet,   0, 350, 53.2, 60, 1, 0.1, 0, false, true, false);

        // right (Walk, Idle, Attack)
        this.animations[3][0] = new Animator(this.spritesheet,  0,  15, 52,   65, 16, 0.1, 0, false, true, true);
        this.animations[3][1] = new Animator(this.spritesheet,  0,  15, 52,   65, 16, 0.1, 0, false, true, true);
        this.animations[3][2] = new Animator(this.spritesheet,  0, 160, 53.2, 67, 10, 0.1, 0, false, true, true);
        this.animations[3][3] = new Animator(this.spritesheet,   0, 350, 53.2, 60, 1, 0.1, 0, false, true, true);
    };

    updateBB() {
        if (this.state === 0) {
            this.BB = new BoundingBox(this.x - 52, this.y - 65, 50 * this.scale, 60 * this.scale);
        } else if (this.state === 1) {
            this.BB = new BoundingBox(this.x - 52, this.y - 65, 50 * this.scale, 60 * this.scale);
        } else if (this.state === 2) {
            this.BB = new BoundingBox(this.x - 52, this.y - 65, 50 * this.scale, 60 * this.scale);
        } else {
            this.BB = new BoundingBox(this.x - 52, this.y - 65, 50 * this.scale, 60 * this.scale);
        }
    };

    updateLastBB() {
        this.lastBB = this.BB;
    };

    update() {
        this.elapsedTime += this.game.clockTick;
        var dist = distance(this, this.target);

        this.state = 0;

        if (dist < 5) {
            if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
                this.targetID++;
            }
            this.target = this.path[this.targetID];
        }

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent instanceof Link && canSee(this, ent)) {
                this.target = ent;
            } 
            if (ent instanceof Link && collide(this, ent)) {
                if (this.state === 0 || this.state === 1) {
                    this.state = 2;
                    this.elapsedTime = 0;
                } else if (this.elapsedTime > 1) {
                    var damage = 7 + randomInt(4);
                    ent.hitpoints -= damage;
                    // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                    this.elapsedTime = 0;
                }
            }
        }

        if (this.state !== 2) {
            dist = distance(this, this.target);
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
            this.x += this.velocity.x * this.game.clockTick;
            this.y += this.velocity.y * this.game.clockTick;
        }

        if (this.velocity.x > 0){
            this.facing = 3;
        } else {
            this.facing = 2;
        }
        
        this.updateLastBB();
        this.updateBB();
    };

    draw(ctx) { 
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 52, this.y - this.game.camera.y - 65, this.scale);
        this.healthbar.draw(ctx);

        if (PARAMS.DEBUG) {
            // ctx.strokeStyle = "Black";
            // ctx.beginPath();
            // ctx.moveTo(this.initialPoint.x, this.initialPoint.y);
            // for (var i = 0; i < this.path.length; i++) {
            //     ctx.lineTo(this.path[i].x, this.path[i].y);
            // };
            // ctx.stroke();

            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x, this.y - this.game.camera.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x, this.y - this.game.camera.y, this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}