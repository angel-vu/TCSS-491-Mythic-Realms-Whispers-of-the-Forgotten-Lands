class Skeleton {
    constructor(game) {
        Object.assign(this, { game });

        this.game.skeleton = this;

        this.x = 300;
        this.y = 500;
        this.speed = 200;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./skeleton.png");

        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = walking, 1 = idle, 2 = attack, 3 = damaged, 4 = dead, 5 = cheering

        // skeleton's animations
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) { // 4 directions
            this.animations.push([]);
            for (var j = 0; j < 6; j++) { // 6 states
                this.animations[i].push([]);
            }
        }

        // down (walk, idle, attack, damaged, dead, cheer)
        this.animations[0][0] = new Animator(this.spritesheet, 25, 163, 85, 95, 7, 0.2, 0, false, true, false);
        this.animations[0][1] = new Animator(this.spritesheet, 25, 1200, 85, 95, 4, 0.2, 0, false, true, false);
        this.animations[0][2] = new Animator(this.spritesheet, 25, 275, 110, 120, 8, 0.2, 0, false, true, false);
        this.animations[0][3] = new Animator(this.spritesheet, 25, 405, 110, 120, 6, 0.2, 0, false, true, false);
        this.animations[0][4] = new Animator(this.spritesheet, 25, 545, 110, 125, 6, 0.2, 0, false, true, false);
        this.animations[0][5] = new Animator(this.spritesheet, 25, 25, 105, 120, 4, 0.2, 0, false, true, false);

        // up (walk, idle, attack, damaged, dead, cheer)
        this.animations[1][0] = new Animator(this.spritesheet, 25, 163, 85, 95, 7, 0.2, 0, false, true, false);
        this.animations[1][1] = new Animator(this.spritesheet, 25, 1200, 85, 95, 4, 0.2, 0, false, true, false);
        this.animations[1][2] = new Animator(this.spritesheet, 25, 275, 110, 120, 8, 0.2, 0, false, true, false);
        this.animations[1][3] = new Animator(this.spritesheet, 25, 405, 110, 120, 6, 0.2, 0, false, true, false);
        this.animations[1][4] = new Animator(this.spritesheet, 25, 545, 110, 125, 6, 0.2, 0, false, true, false);
        this.animations[1][5] = new Animator(this.spritesheet, 25, 25, 105, 120, 4, 0.2, 0, false, true, false);

        // left (walk, idle, attack, damaged, dead, cheer)
        this.animations[2][0] = new Animator(this.spritesheet, 25, 163, 85, 95, 7, 0.2, 0, true, true, true);
        this.animations[2][1] = new Animator(this.spritesheet, 25, 1200, 85, 95, 4, 0.2, 0, true, true, true);
        this.animations[2][2] = new Animator(this.spritesheet, 25, 275, 110, 120, 8, 0.2, 0, true, true, true);
        this.animations[2][3] = new Animator(this.spritesheet, 25, 405, 110, 120, 6, 0.2, 0, true, true, true);
        this.animations[2][4] = new Animator(this.spritesheet, 25, 545, 110, 125, 6, 0.2, 0, true, true, true);
        this.animations[2][5] = new Animator(this.spritesheet, 25, 25, 105, 120, 4, 0.2, 0, true, true, true);
        
        // right (walk, idle, attack, damaged, dead, cheer)
        this.animations[3][0] = new Animator(this.spritesheet, 25, 163, 85, 95, 7, 0.2, 0, false, true, false);
        this.animations[3][1] = new Animator(this.spritesheet, 25, 1200, 85, 95, 4, 0.2, 0, false, true, false);
        this.animations[3][2] = new Animator(this.spritesheet, 25, 275, 110, 120, 8, 0.2, 0, false, true, false);
        this.animations[3][3] = new Animator(this.spritesheet, 25, 405, 110, 120, 6, 0.2, 0, false, true, false);
        this.animations[3][4] = new Animator(this.spritesheet, 25, 545, 110, 125, 6, 0.2, 0, false, true, false);
        this.animations[3][5] = new Animator(this.spritesheet, 25, 25, 105, 120, 4, 0.2, 0, false, true, false);


        // this.animations[1][0] = new Animator(this.spritesheet, 25, 685, 85, 95, 7, 0.2, 0, false, true, false);
        // this.animations[1][1] = new Animator(this.spritesheet, 415, 1200, 85, 95, 4, 0.2, 0, false, true, false);
        // this.animations[1][2] = new Animator(this.spritesheet, 25, 795, 110, 120, 8, 0.2, 0, false, true, false);
        // this.animations[1][3] = new Animator(this.spritesheet, 25, 926, 110, 120, 6, 0.2, false, true, false);
        // this.animations[1][4] = new Animator(this.spritesheet, 25, 1060, 110, 125, 6, 0.2, 0, false, true, false);
        // this.animations[1][5] = new Animator(this.spritesheet, 465, 25, 105, 120, 4, 0.2, 0, false, true, false);
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

        if(this.game.dead) {
            this.state = 4;
        }

        if(this.game.cheer) {
            this.state = 5;
        }
    };

    draw(ctx) {
        // if(this.game.damage && this.facing === 0) { 
        //     ctx.save();
        //     ctx.scale(-1, 1);
        //     this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, -this.x  - this.animations[this.facing][this.state].width * 2, this.y, 2);
        //     ctx.restore();
        // } else {
        //     this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x , this.y, 2);
        // }  
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this. y, 2);  
    };
}
