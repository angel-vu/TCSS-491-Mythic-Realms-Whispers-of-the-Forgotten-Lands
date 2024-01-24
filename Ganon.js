class Ganon {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset('./boss_sprites/Ganondorf.png');
        //this.game.ganon = this;

        this.x = 0;
        this.y = 0;
        this.speed = 250;
        this.state = 0; // 0 = idle, 1 = walking, 2 = attacking
        this.facing = 0; // 0 = down, 1 = left, 2 = up, 3 = right

        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
      for (let i = 0; i < 3; i++) { // three states
        this.animations.push([]);
        for (let j = 0; j < 4; j++) { // directions
          this.animations[i].push([]);
        }
      }

      // idle animation for state = 0
      // facing down = 0
      this.animations[0][0] = new Animator(this.spritesheet, 375, 83, 76, 68, 4, 0.33, 0, false, true, false);

      // idle animation for facing left
      this.animations[0][1] = new Animator(this.spritesheet, 378, 307, 62, 73, 1, 0.33, 0, false, true, false);

      // idle animation for facing upskee
      this.animations[0][2] = new Animator(this.spritesheet, 361, 230, 66, 73, 1, 0.33, 0, false, true, false);

      // idle animation for facing right
      this.animations[0][3] = new Animator(this.spritesheet, 378, 383, 58, 73, 1, 0.33, 0, false, true, false);

      // walking animation for walking down
      this.animations[1][0] = new Animator(this.spritesheet, 361, 157, 67, 71, 5, 0.33, 0, false, true, false);

      // walking animation walking left
      this.animations[1][1] = new Animator(this.spritesheet, 378, 307, 62, 73, 5, 0.20, 0, false, true, false);

      // walk up
      this.animations[1][2] = new Animator(this.spritesheet, 361, 230, 66, 73, 5, 0.20, 0, false, true, false);

      // walk right
      this.animations[1][3] = new Animator(this.spritesheet, 378, 383, 56, 73, 5, 0.20, 0, false, true, false);

      // attack down (only direction)
      this.animations[2][0] = new Animator(this.spritesheet, 710, 11, 92, 77, 4, 0.20, 0, false, true, false);

      this.deadAnim = new Animator(this.spritesheet, 17, 689, 77, 44, 4, 0.33, 0, false, false, false);

    };

    update() {
      if (this.animations[0][0]) {
        this.x = 0;
      } else if (this.animations[1][0]) {
        this.y += this.speed * this.game.clockTick;
        console.log("Y: ", this.y);
        if (this.y > 768) {
          this.animations[1][2];
          this.y -= this.speed * this.game.clockTick;
        }
      } else if (this.animations[1][3]) {
        this.x += this.speed * this.game.clockTick;
        if (this.x > 1024) {
          this.animations[1][1];
          this.x -= this.speed * this.game.clockTick; // this.x = 0;
        } else {
          this.animations[this.state][this.facing];
        }
      }

        //this.animators.forEach(anim => anim.elapsedTime += this.game.clockTick);

        //this.state = this.speed > 0 ? 'walk right' : 'walk left'; 
        //if (this.state == 'walk left') this.x = 1200;
    };

    draw(ctx) {

      if (this.dead) {
        this.deadAnim.drawFrame(this.game.clockTick, ctc, this.x, this.y, 2);
      } else {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
      }

    };

}