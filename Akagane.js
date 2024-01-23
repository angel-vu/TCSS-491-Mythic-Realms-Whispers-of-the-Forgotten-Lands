class Akagane {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset('./enemies/Akagane.png');

        this.x = 0;
        this.y = 20;
        this.speed = 250;
        this.state = 1; // 0 = idle, 1 = attacking
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
    };

    update() {
        this.x += this.speed * this.game.clockTick;
        if (this.x > 1024) this.x = 0;

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };

}