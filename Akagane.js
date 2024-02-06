class Akagane {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset('./enemies/Akagane.png');

        this.x = x;
        this.y = y;
        this.speed = 250;
        this.state = 1; // 0 = idle & walking, 1 = attacking
        this.facing = 0; // 0 = right

        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    };

    loadAnimations() {
        for (let i = 0; i < 2; i++) { // state
            this.animations.push([]);
            for (let j = 0; j < 1; j++) {
                this.animations[i].push([]);
            }
        }

        // idle  & walking animation
        this.animations[0][0] = new Animator(this.spritesheet, 8, 10, 67, 93, 6, 0.33, 0, false, true, false);

        // attacking animation
        this.animations[1][0] = new Animator(this.spritesheet, 0, 105, 73, 99, 7, 1, 14, false, true, false);
    };

    updateBB() {
        if (this.state == 0 && this.animations[0][0]) {
            this.boundingBox = new BoundingBox(this.x + 30, this.y + 60, 64, 90);
        } else if (this.state == 1 && this.animations[1][0]) {
            this.boundingBox = new BoundingBox(this.x + 20, this.y + 60, 70, 96);
        }
    }

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
        } 
        this.updateBB();

    };

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        if (PARAMS.DEBUG && this.boundingBox) {
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
        }
    };

}