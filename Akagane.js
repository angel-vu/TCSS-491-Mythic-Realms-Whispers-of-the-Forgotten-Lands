class Akagane {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset('./enemies/Akagane.png');

        this.x = 0;
        this.y = 500;
        this.speed = 250;
        this.state = 2; // 0 = idle, 1 = walking, 2 = attacking
        this.facing = 0; // 0 = right

        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (let i = 0; i < 3; i++) { // state
            this.animations.push([]);
            for (let j = 0; j < 1; j++) {
                this.animations[i].push([]);
            }
        }

        // idle animation
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 85, 130, 6, 0.33, 0, false, true, false);

        // walking animation
        this.animations[1][0] = new Animator(this.spritesheet, 0, 0, 85, 130, 6, 0.33, 0, false, true, false);

        // attacking animation
        this.animations[2][0] = new Animator(this.spritesheet, 0, 134, 85, 130, 7, 1, 14, false, true, false);
    };

    update() {
        if (this.animations[0][0]) {
            this.x = 100;
        } else if (this.animations[1][0]) {
            this.x += this.speed * this.game.clockTick;
            if (this.x > 1024) {
                this.x -= this.speed * this.game.clockTick;
                this.reverse = true;
                this.flipleft = true;
            }
        } else if (this.animations[2][0]) {
            this.x = 5;
        }

    };

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
    };

}