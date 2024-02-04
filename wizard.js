class Wizard {
    constructor(game) {
        Object.assign(this, { game });

        this.game.wizard = this;

        this.x = 600;
        this.y = 100;
        this.speed = 200;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./wizard.png");

        this.facing = 0; // 0 = down, 1 = up, 2 = left, 3 = right 
        this.state = 0; // 0 = walking, 1 = idle, 2 = running, 3 = attack, 4 = damaged, 5 = dead

        // wizard's animations
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
        // down (walk, idle, attack, damaged, dead, run)
        this.animations[0][0] = new Animator(this.spritesheet, 0, 120, 120, 115, 7, 0.2, 0, false, true, false); 
        this.animations[0][1] = new Animator(this.spritesheet, 0, 0, 120, 125, 8, 0.2, 0, false, true, false); 
        this.animations[0][2] = new Animator(this.spritesheet, 0, 340, 173, 120, 8, 0.2, 0, false, true, false);
        this.animations[0][3] = new Animator(this.spritesheet, 0, 460, 100, 105, 4, 0.2, 0, false, true, false);
        this.animations[0][4] = new Animator(this.spritesheet, 450, 460, 120, 110, 4, 0.2, 0, false, true, false);
        this.animations[0][5] = new Animator(this.spritesheet, 0, 235, 120, 105, 8, 0.2, 0, false, true, false);

        // up (walk, idle, attack, damaged, dead, run)
        this.animations[1][0] = new Animator(this.spritesheet, 0, 120, 120, 115, 7, 0.2, 0, false, true, false); 
        this.animations[1][1] = new Animator(this.spritesheet, 0, 0, 120, 125, 8, 0.2, 0, false, true, false); 
        this.animations[1][2] = new Animator(this.spritesheet, 0, 340, 173, 120, 8, 0.2, 0, false, true, false);
        this.animations[1][3] = new Animator(this.spritesheet, 0, 460, 100, 105, 4, 0.2, 0, false, true, false);
        this.animations[1][4] = new Animator(this.spritesheet, 450, 460, 120, 110, 4, 0.2, 0, false, true, false);
        this.animations[1][5] = new Animator(this.spritesheet, 0, 235, 120, 105, 8, 0.2, 0, false, true, false);

        // left (walk, idle, attack, damaged, dead, run)
        this.animations[2][0] = new Animator(this.spritesheet, 0, 120, 120, 115, 7, 0.2, 0, true, true, true); 
        this.animations[2][1] = new Animator(this.spritesheet, 0, 0, 120, 125, 8, 0.2, 0, true, true, true); 
        this.animations[2][2] = new Animator(this.spritesheet, 0, 340, 173, 120, 8, 0.2, 0, true, true, true);
        this.animations[2][3] = new Animator(this.spritesheet, 0, 460, 100, 105, 4, 0.2, 0, true, true, true);
        this.animations[2][4] = new Animator(this.spritesheet, 450, 460, 120, 110, 4, 0.2, 0, true, true, true);
        this.animations[2][5] = new Animator(this.spritesheet, 0, 235, 120, 105, 8, 0.2, 0, true, true, true);

        // right (walk, idle, attack, damaged, dead, run)
        this.animations[3][0] = new Animator(this.spritesheet, 0, 120, 120, 115, 7, 0.2, 0, false, true, false); 
        this.animations[3][1] = new Animator(this.spritesheet, 0, 0, 120, 125, 8, 0.2, 0, false, true, false); 
        this.animations[3][2] = new Animator(this.spritesheet, 0, 340, 173, 120, 8, 0.2, 0, false, true, false);
        this.animations[3][3] = new Animator(this.spritesheet, 0, 460, 100, 105, 4, 0.2, 0, false, true, false);
        this.animations[3][4] = new Animator(this.spritesheet, 450, 460, 120, 110, 4, 0.2, 0, false, true, false);
        this.animations[3][5] = new Animator(this.spritesheet, 0, 235, 120, 105, 8, 0.2, 0, false, true, false);

        // this.animations[1][0] = new Animator(this.spritesheet, 0, 690, 120, 115, 7, 0.2, 0, false, true, false); 
        // this.animations[1][1] = new Animator(this.spritesheet, 0, 570, 120, 125, 8, 0.2, 0, false, true, false); 
        // this.animations[1][2] = new Animator(this.spritesheet, 0, 1518, 173, 120, 8, 0.2, 0, true, true, false);
        // this.animations[1][3] = new Animator(this.spritesheet, 0, 1675, 100, 105, 4, 0.2, 0, false, true, false);
        // this.animations[1][4] = new Animator(this.spritesheet, 450, 1675, 120, 110, 4, 0.2, 0, false, true, false);
        // this.animations[1][5] = new Animator(this.spritesheet, 0, 1375, 120, 105, 8, 0.2, 0, false, true, false);
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

        if(this.game.run) {
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
        //     this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x , this.y, 1);
        // }  
            this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1.5);
        }
}
