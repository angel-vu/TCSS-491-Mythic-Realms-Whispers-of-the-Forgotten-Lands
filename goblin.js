class Goblin {
    constructor(game) {
        Object.assign(this, { game });

        this.game.goblin = this;

        this.x = 400;
        this.y = 0;
        this.speed = 200;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./goblin.png");

        // goblins state variables
        this.facing = 3; //  2 = left, 3 = right 
        this.state = 0; // 0 = walking, 1 = idle, 2 = swing

        // goblin's animations
        this.animations = [];
        this.loadAnimations();
    };

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