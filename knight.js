class Knight {
    constructor(game) {
        Object.assign(this, { game });

        this.game.knight = this;

        this.x = 200;
        this.y = 100;
        this.speed = 200;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./enemies/knight.png");

        // knight state variables
        this.facing = 0; // 0 = down, 1 = up, 2 = left, 3 = right 
        this.state = 0; // 0 = walk || idle, 1 = attack, 3 = damage taken

        // knight's animations
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) { // 4 directions
            this.animations.push([]);
            for (var j = 0; j < 3; j++) { // 3 states
                this.animations[i].push([]);
            }
        }
        
        // down (Walk, Idle, Attack)
        this.animations[0][0] = new Animator(this.spritesheet,  0,    0, 130,   110, 8, 0.1, 0, false, true, false);
        this.animations[0][1] = new Animator(this.spritesheet,  0,    0, 130,   110, 1, 0.1, 0, false, true, false);
        this.animations[0][2] = new Animator(this.spritesheet,  0,  500, 125.7, 130, 8, 0.1, 4, false, true, false);        
        this.animations[0][3] = new Animator(this.spritesheet,  0,  1050, 125.7, 130, 6, 0.2, 4, false, true, false);        
        // dead // this.animations[0][3] = new Animator(this.spritesheet,  0,  770, 125.7, 130, 8, 0.5, 4, false, true);

        // up (Walk, Idle, Attack)
        this.animations[1][0] = new Animator(this.spritesheet,  0,   0, 130, 110,    8, 0.1, 0, false, true, false);
        this.animations[1][1] = new Animator(this.spritesheet,  0,   0, 130, 110,    1, 0.1, 0, false, true, false);
        this.animations[1][2] = new Animator(this.spritesheet,  0,  500, 125.7, 130, 8, 0.1, 4, false, true, false);
        this.animations[1][3] = new Animator(this.spritesheet,  0,  1050, 125.7, 130, 6, 0.2, 4, false, true, false);        

        // left (Walk, Idle, Attack)
        this.animations[2][0] = new Animator(this.spritesheet,  0,   0, 130,   110,  8, 0.1, 0, false, true, true);
        this.animations[2][1] = new Animator(this.spritesheet,  0,   0, 130,   110,  1, 0.1, 0, false, true, true);
        this.animations[2][2] = new Animator(this.spritesheet,  0,  500, 125.7, 130, 8, 0.1, 4, false, true, true);
        this.animations[2][3] = new Animator(this.spritesheet,  0,  1050, 125.7, 130, 6, 0.2, 4, false, true, true);        

        // right (Walk, Idle, Attack)
        this.animations[3][0] = new Animator(this.spritesheet,  0,    0, 130,   110, 8, 0.1, 0, false, true, false);
        this.animations[3][1] = new Animator(this.spritesheet,  0,    0, 130,   110, 1, 0.1, 0, false, true, false);
        this.animations[3][2] = new Animator(this.spritesheet,  0,  500, 125.7, 130, 8, 0.1, 4, false, true, false);
        this.animations[3][3] = new Animator(this.spritesheet,  0,  1050, 125.7, 130, 6, 0.2, 4, false, true, false);        

    };

    update() {
        if (this.x > 1024) {
            this.x = -130;
        }

        if (this.x < -130) {
            this.x = 1024;
        }

        if (this.y > 1024) {
            this.y = -130;
        }

        if (this.y < -130) {
            this.y = 1024;
        }

        this.state = 1; 

        if (this.game.down && !this.game.up) {
            console.log("DOWN");
            this.state = 0;
            this.y = this.y + this.speed * this.game.clockTick;
        }

        else if (this.game.up && !this.game.down) {
            console.log("UP");
            this.state = 0;
            this.y = this.y - this.speed * this.game.clockTick;
        }

        else if (this.game.left && !this.game.right) {
            console.log("LEFT");
            this.facing = 2;
            this.state = 0;
            this.x = this.x - this.speed * this.game.clockTick;
        }

        else if (this.game.right && !this.game.left) {
            console.log("RIGHT");
            this.facing = 3;
            this.state = 0;
            this.x = this.x + this.speed * this.game.clockTick;
        }

        else {
            this.state = 1;
        }

        if(this.game.attack) {
            this.state = 2; 
        }

        if(this.game.damage) {
            this.state = 3; 
        }

    };

    draw(ctx) {
            this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x , this.y, 2);
        }
}