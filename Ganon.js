class Ganon {
    constructor(game, x, y) {
      Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset('./boss_sprites/Ganondorf.png');
        //this.game.ganon = this;

        this.x = x;
        this.y = y;
        this.speed = 250;
        this.phase = 0; // 0 = first phase (no spear), 1 = second phase (w/ spear), 2 = third phase (bat phase)
        this.state = 0; // 0 = idle, 1 = walking, 2 = attacking
        this.facing = 1; // 0 = down, 1 = left, 2 = up, 3 = right

        //this.velocity = { x: this.x, y: this.y };

        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    };

    loadAnimations() {
      for (let i = 0; i < 3; i++) { // three phases
        this.animations.push([]);
        for (let j = 0; j < 3; j++) { // three states
          this.animations[i].push([]);
          for (let k = 0; k < 4; k++) { // four directions
            this.animations[i][j].push([]);
          }
        }
      }

      // phase 0 (no spear) idle
      this.animations[0][0][0] = new Animator(this.spritesheet, 27, 66, 75, 46, 4, 0.9, 0, false, true, false);

      // phase 0, idle left
      this.animations[0][0][1] = new Animator(this.spritesheet, 24, 225, 55, 50, 1, 0.33, 0, false, true, false);

      // phase = 1
      // idle animation for state = 0
      // facing down = 0
      this.animations[1][0][0] = new Animator(this.spritesheet, 375, 83, 76, 68, 4, 0.33, 0, false, true, false);

      // idle animation for facing left
      this.animations[1][0][1] = new Animator(this.spritesheet, 378, 307, 62, 73, 1, 0.33, 0, false, true, false);

      // idle animation for facing upskee
      this.animations[1][0][2] = new Animator(this.spritesheet, 361, 230, 66, 73, 1, 0.33, 0, false, true, false);

      // idle animation for facing right
      this.animations[1][0][3] = new Animator(this.spritesheet, 378, 383, 58, 73, 1, 0.33, 0, false, true, false);

      // walking animation for walking down
      this.animations[1][1][0] = new Animator(this.spritesheet, 361, 157, 67, 71, 5, 0.22, 0, false, true, false);

      // walking animation walking left
      this.animations[1][1][1] = new Animator(this.spritesheet, 378, 307, 62, 73, 5, 0.20, 0, false, true, false);

      // walk up
      this.animations[1][1][2] = new Animator(this.spritesheet, 361, 230, 66, 73, 5, 0.20, 0, false, true, false);

      // walk right
      this.animations[1][1][3] = new Animator(this.spritesheet, 378, 383, 56, 73, 5, 0.20, 0, false, true, false);

      // attack down (only direction - spear throw)
      this.animations[1][2][0] = new Animator(this.spritesheet, 710, 11, 92, 77, 4, 0.20, 0, false, true, false);

      this.deadAnim = new Animator(this.spritesheet, 17, 689, 77, 44, 4, 0.33, 0, false, false, false);

    };

    updateBB() {
      if (this.phase == 0 && this.animations[0][0][0]) {
        this.boundingBox = new BoundingBox(this.x + 10, this.y, 50, 45);
      } else if (this.phase == 0 && this.animations[0][0][1]) {
        this.boundingBox = new BoundingBox(10, 0, 20, 10);
      }
      //  else if (this.state == 0 && this.animations[1][0][0]) {
      //   this.boundingBox = new BoundingBox(this.x + 16, this.y + 20, 45, 47);
      // } else if (this.state == 0 && this.animations[1][0][1]) {
      //   this.boundingBox = new BoundingBox(this.x, this.y + 30, 50, 15);
      // } else if (this.state == 0 && this.animations[1][0][2]) {
      //   this.boundingBox = new BoundingBox(this.x, this.y, 10, 10);
      // } else if (this.state == 1 && this.animations[1][1][0]) {
      //   this.boundingBox = new BoundingBox(this.x + 12, this.y + 20, 53, 47);
      // }
    };

    update() {
      if (this.animations[1][0][0] || 
          this.animations[1][0][1] || 
          this.animations[1][0][2] || 
          this.animations[1][0][3]) {

        this.x = 300;
        this.y = 20;

      } else if (this.animations[1][1][0]) {
        this.y = this.y + (this.speed * this.game.clockTick);
        console.log("Y: ", this.y);
        // if (this.y > 768) {
        //   this.animations[1][2];
        //   this.y -= this.speed * this.game.clockTick;
        // }
      } else if (this.animations[1][1][3]) {
        this.x += this.speed * this.game.clockTick;
        if (this.x > 1024) {
          this.animations[1][1];
          this.x -= this.speed * this.game.clockTick; // this.x = 0;
        } else {
          this.animations[this.phase][this.state][this.facing];
        }
      }
      this.updateBB();

    };

    draw(ctx) {

      if (this.dead) {
        this.deadAnim.drawFrame(this.game.clockTick, ctc, this.x, this.y, 1);
      } else {
        this.animations[this.phase][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
      }
      // drawing the hitbox of the attack animation
		  if (PARAMS.DEBUG && this.boundingBox) {
			  ctx.strokeStyle = 'Blue';
			  ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
        //this.updateBB();
		  }
    };

}