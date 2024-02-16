class Goblin {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });

        this.game.goblin = this;

        this.initialPoint = { x, y };

        this.currentHealth = 100;
        this.maxHealth = 100;
        this.dead = false;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./enemies/goblin.png");

        // goblins state variables
        this.facing = 3; //  2 = left, 3 = right 
        this.state = 0; // 0 = walking, 1 = idle, 2 = swing

        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

        var dist = distance(this, this.target);
        this.maxSpeed = 75; // pixels per second
     
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        // banshee's animations
        this.healthbar = new HealthBar(this);
        this.updateBB();
        this.updateHurtBox();
        this.updateHitBox();
        this.updatePathingCircle();
        this.animations = [];
        this.loadAnimations();
        this.elapsedTime = 0;
    };

    // Bounding sphere for enemy vision
	updatePathingCircle(){
		this.pathingCircle = new BoundingCircle(this.hurtBox.x + this.hurtBox.width/2, this.hurtBox.y + this.hurtBox.height/2, 30, 200);
	}

    updateBB() {
        if(this.facing === 3) { // right
            if(this.state === 0) { // walking
                this.BB = new BoundingBox(this.x, this.y, 50, 65);
            } else if (this.state === 1) {
                this.BB = new BoundingBox(this.x, this.y, 50, 75);
            } else {
                this.BB = new BoundingBox(this.x, this.y, 50, 75);
            }
        } else { // left
            if(this.state === 0) { // walking
                this.BB = new BoundingBox(this.x, this.y, 50, 65);
            } else if (this.state === 1) {
                this.BB = new BoundingBox(this.x, this.y, 50, 75);
            } else {
                this.BB = new BoundingBox(this.x, this.y, 50, 75);
            }
        }
    };

    updateHitBox() {
        if(this.state !== 2) {
            this.hitBox = new BoundingBox(this.x, this.y, 0, 0);
        } else { // attack state
            if(this.facing === 3) { // right
                this.hitBox = new BoundingBox(this.x + 55, this.y, 10, 50);
            } else { // left
                this.hitBox = new BoundingBox(this.x, this.y, 10, 50);
            }
        }
    }

    updateHurtBox() {
        if(this.facing === 3) { // right
            if(this.state === 0) { // walking
                this.hurtBox = new BoundingBox(this.x, this.y, 50, 65);
            } else if (this.state === 1) {
                this.hurtBox = new BoundingBox(this.x, this.y, 50, 75);
            } else {
                this.hurtBox = new BoundingBox(this.x, this.y, 50, 75);
            }
        } else { // left
            if(this.state === 0) { // walking
                this.hurtBox = new BoundingBox(this.x, this.y, 50, 65);
            } else if (this.state === 1) {
                this.hurtBox = new BoundingBox(this.x, this.y, 50, 75);
            } else {
                this.hurtBox = new BoundingBox(this.x, this.y, 50, 75);
            }
        }
    }

    // Tracks last bounding box 
    updateLastBB() {
        this.lastBB = this.BB;
    };

    // Trakcs last hurt box 
	updateLastHurtBox() {
        this.lastHurtBox = this.hurtBox;
    };

	// Tracks last hit box
	updateLastHitBox(){
		this.lastHitBox = this.hitBox;
	}

    loadAnimations() {
        for (var i = 0; i < 5; i++) { // 4 directions
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // 5 states
                this.animations[i].push([]);
            }
        }
        
        // down (Walk, Idle, Attack, Injured, Dead)
        this.animations[0][0] = new Animator(this.spritesheet,   0,     0, 34.5, 40, 3, 0.1, 0, false, true, false);
        this.animations[0][1] = new Animator(this.spritesheet,  34.5,   0, 34.5, 40, 1, 0.1, 0, false, true, false);
        this.animations[0][2] = new Animator(this.spritesheet,  93,    80, 29,   35, 3, 0.1, 0, false, true, false);
        this.animations[0][3] = new Animator(this.spritesheet,   5.4, 153, 32,   40, 1, 0.1, 0, false, true, false);
        this.animations[0][4] = new Animator(this.spritesheet,   5.4, 153, 32,   40, 2, 1,   0, false, true, false);

        // up (Walk, Idle, Attack, Injured, Dead)
        this.animations[1][0] = new Animator(this.spritesheet,  103.5,   0, 34.5, 40, 3, 0.1, 0, false, true, false);
        this.animations[1][1] = new Animator(this.spritesheet,  138,     0, 34.5, 40, 1, 0.1, 0, false, true, false);
        this.animations[1][2] = new Animator(this.spritesheet,    6,    80, 29,   35, 3, 0.1, 0, false, true, false);
        this.animations[1][3] = new Animator(this.spritesheet,    5.4, 153, 32,   40, 1, 0.1, 0, false, true, false);
        this.animations[1][4] = new Animator(this.spritesheet,    5.4, 153, 32,   40, 2, 1,   0, false, true, false);

        // left (Walk, Idle, Attack, Injured, Dead)
        this.animations[2][0] = new Animator(this.spritesheet,  100,   40,  29, 35, 3, 0.1, 0, false, true, true);
        this.animations[2][1] = new Animator(this.spritesheet,  100,   40,  29, 35, 1, 0.1, 0, false, true, true);
        this.animations[2][2] = new Animator(this.spritesheet,    3,   115, 33, 38, 3, 0.1, 0, false, true, true);
        this.animations[2][3] = new Animator(this.spritesheet,    5.4, 153, 32, 35, 1, 0.1, 0, false, true, true);
        this.animations[2][4] = new Animator(this.spritesheet,    5.4, 153, 32, 35, 2, 1,   0, false, true, true);

        // right (Walk, Idle, Attack, Injured, Dead)
        this.animations[3][0] = new Animator(this.spritesheet,   2,   40,  32, 35, 3, 0.1, 1, false, true, true);
        this.animations[3][1] = new Animator(this.spritesheet,   2,   40,  32, 35, 1, 0.1, 1, false, true, true);
        this.animations[3][2] = new Animator(this.spritesheet, 101,   115, 32, 38, 3, 0.1, 0, false, true, true);
        this.animations[3][3] = new Animator(this.spritesheet,   5.4, 153, 32, 35, 1, 0.1, 0, false, true, false);
        this.animations[3][4] = new Animator(this.spritesheet,   5.4, 153, 32, 35, 2, 1,   0, false, true, true);
    };

    update() {

        if(this.currentHealth <= 0) {
            this.dead = true;
            // DEATH ANIMATION?
            this.removeFromWorld = true;
            console.log("GOBLIN DEAD");
        }

        this.elapsedTime += this.game.clockTick;
        var dist = distance(this, this.target);

        if (dist < 5) {
            if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
                this.targetID++;
            }
            this.target = this.path[this.targetID];
        }

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent instanceof Link && canSee(this.pathingCircle, ent.pathingCircle)) {
                this.target = ent.pathingCircle;
            } 
            if (ent instanceof Link && collide(this.pathingCircle, ent.pathingCircle)) {
                if (this.state === 0 || this.state === 1) {
                    this.state = 2;
                    this.elapsedTime = 0;
                } else if (this.elapsedTime > 0.3) {
                    if (ent instanceof Link && this.hitBox.collide(ent.hurtBox)) {
                        console.log("ATTACK LANDED - GOBLIN VS LINK!");
                        ent.currentHealth -= 1;
                        this.elapsedTime = 0;
                    }
                } 
            }
            if (ent instanceof Link && this.state === 2 && !collide(this.pathingCircle, ent.pathingCircle)) {
                this.state = 0;
            }
        }

        if (this.state !== 2) {
            dist = distance(this, this.target);
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
            this.x += this.velocity.x * this.game.clockTick;
            this.y += this.velocity.y * this.game.clockTick;

            if (this.velocity.x > 0){
                this.facing = 3;
            } else {
                this.facing = 2;
            }
        } else {
            // Goblin Direction always faces Link
            if (this.game.camera.link.x < this.x){
                this.facing = 2;
            } else {
                this.facing = 3;
            }
        }
        
        this.updateLastBB();
        this.updateBB();
        this.updateLastHurtBox();
        this.updatePathingCircle();
        this.updateHurtBox();
        this.updateLastHitBox();
        this.updateHitBox();
    };

    draw(ctx) {         
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
        this.healthbar.draw(ctx);
    
        if (PARAMS.DEBUG) {
            // Pathing 
            // ctx.strokeStyle = "Black";
            // ctx.beginPath();
            // ctx.moveTo(this.initialPoint.x, this.initialPoint.y);
            // for (var i = 0; i < this.path.length; i++) {
            //     ctx.lineTo(this.path[i].x, this.path[i].y);
            // };
            // ctx.stroke();
    
            // // Hit Box (Attack)          
            // ctx.strokeStyle = 'Red';
            // ctx.strokeRect(this.hitBox.x - this.game.camera.x, this.hitBox.y - this.game.camera.y, this.hitBox.width, this.hitBox.height);
    
            // // Hurt Box (Damage Taken)
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.hurtBox.x - this.game.camera.x, this.hurtBox.y - this.game.camera.y, this.hurtBox.width, this.hurtBox.height);
    
            // ctx.strokeStyle = 'Red';
            // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    
            // Inner Circle 
            ctx.strokeStyle = "Yellow";
            ctx.beginPath();
            ctx.arc(this.pathingCircle.x - this.game.camera.x, this.pathingCircle.y - this.game.camera.y, this.pathingCircle.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
    
            // Vision Circle
            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.pathingCircle.x - this.game.camera.x, this.pathingCircle.y - this.game.camera.y, this.pathingCircle.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);
    
            // Bounding Box
            // ctx.strokeStyle = 'Red';
            // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}