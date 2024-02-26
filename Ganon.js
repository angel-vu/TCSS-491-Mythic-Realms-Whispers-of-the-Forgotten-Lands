class Ganon {
  constructor(game, x, y, path) {
    Object.assign(this, { game, x, y, path });
    this.spritesheet = ASSET_MANAGER.getAsset("./boss_sprites/Ganondorf.png");
    this.game.ganon = this;
    this.scale = 3;

    this.initialPoint = { x, y };
    this.speed = 100;

    this.radius = 50;
    this.visualRadius = 400;

    this.currentHealth = 200;
    this.maxHealth = 200;
    this.dead = false;

    //how long Link has been damagedfor in seconds.
    this.damagedCounter = 0;
    //Flag used to flicker when damaged.
    this.flickerFlag = true;

    this.healthbar = new HealthBar(this);

    this.phase = 0; // 0 = first phase (no spear), 1 = second phase. 2 = teleporting 
    this.state = 1; // 0 = idle, 1 = walking, 2 = attacking
    this.facing = 0; // 0 = down, 1 = left, 2 = up, 3 = right
    this.dead = false;

    this.paused = false; // Flag to track if the animation is paused
    this.pauseDuration = 0; // Duration for which the animation should be paused
    this.pauseCount = 0; // Counter to track the number of ticks the animation has been paused

    this.targetID = 0;
    if (this.path && this.path[this.targetID])
      this.target = this.path[this.targetID];

    var dist = distance(this, this.target);
    this.maxSpeed = 150; // pixels per second

    this.velocity = {
      x: ((this.target.x - this.x) / dist) * this.maxSpeed,
      y: ((this.target.y - this.y) / dist) * this.maxSpeed,
    };

    this.elapsedTime = 0;
    this.animations = [];
    this.loadAnimations();
    this.updateHurtBox();
  }

  loadAnimations() {
    for (let i = 0; i < 2; i++) {
      // two phases (maybe three)
      this.animations.push([]);
      for (let j = 0; j < 3; j++) {
        // three states
        this.animations[i].push([]);
        for (let k = 0; k < 4; k++) {
          // four directions
          this.animations[i][j].push([]);
        }
      }
    }
    // phase 0 (no spear) idle down
    this.animations[0][0][0] = new Animator(
      this.spritesheet,
      27,
      66,
      75,
      46,
      4,
      0.9,
      0,
      false,
      true,
      false
    );

    // phase 0, idle left
    this.animations[0][0][1] = new Animator(
      this.spritesheet,
      24,
      225,
      55,
      50,
      1,
      0.33,
      0,
      false,
      true,
      false
    );

    // phase 0, idle up
    this.animations[0][0][2] = new Animator(
      this.spritesheet,
      20,
      170,
      64,
      48,
      1,
      0.33,
      0,
      false,
      true,
      false
    );

    // phase 0, idle right
    this.animations[0][0][3] = new Animator(
      this.spritesheet,
      21,
      278,
      67,
      47,
      1,
      0.33,
      0,
      false,
      true,
      false
    );

    // phase 0, state = 1 walking down
    this.animations[0][1][0] = new Animator(
      this.spritesheet,
      21,
      115,
      63,
      50,
      5,
      0.33,
      0,
      false,
      true,
      false
    );

    // phase 0, walking left
    this.animations[0][1][1] = new Animator(
      this.spritesheet,
      15,
      224,
      63,
      49,
      5,
      0.33,
      0,
      false,
      true,
      false
    );

    // phase 0, walking up
    this.animations[0][1][2] = new Animator(
      this.spritesheet,
      23,
      170,
      62,
      51,
      5,
      0.33,
      0,
      false,
      true,
      false
    );

    //phase 0, walking right
    this.animations[0][1][3] = new Animator(
      this.spritesheet,
      23,
      272,
      61,
      54,
      5,
      0.33,
      0,
      false,
      true,
      false
    );

    // phase 0, state = 2 attack, facing down
    this.animations[0][2][0] = new Animator(
      this.spritesheet,
      16,
      555,
      68,
      69,
      5,
      0.5,
      0,
      false,
      true,
      false
    );

    // phase 0, state 2, make every other direction a teleport
    this.animations[0][2][1] = new Animator(
      this.spritesheet,
      25,
      376,
      76,
      49,
      4,
      0.5,
      0,
      true,
      true,
      false
    );
    this.animations[0][2][2] = new Animator(
      this.spritesheet,
      25,
      376,
      76,
      49,
      4,
      0.5,
      0,
      true,
      true,
      false
    );
    this.animations[0][2][3] = new Animator(
      this.spritesheet,
      25,
      376,
      76,
      49,
      4,
      0.5,
      0,
      true,
      true,
      false
    );

    // phase = 1
    // idle animation for state = 0
    // facing down = 0
    this.animations[1][0][0] = new Animator(
      this.spritesheet,
      375,
      83,
      76,
      68,
      4,
      0.33,
      0,
      false,
      true,
      false
    );

    // idle animation for facing left
    this.animations[1][0][1] = new Animator(
      this.spritesheet,
      378,
      307,
      62,
      73,
      1,
      0.33,
      0,
      false,
      true,
      false
    );

    // idle animation for facing upskee
    this.animations[1][0][2] = new Animator(
      this.spritesheet,
      361,
      230,
      66,
      73,
      1,
      0.33,
      0,
      false,
      true,
      false
    );

    // idle animation for facing right
    this.animations[1][0][3] = new Animator(
      this.spritesheet,
      378,
      383,
      58,
      73,
      1,
      0.33,
      0,
      false,
      true,
      false
    );

    // walking animation for walking down
    this.animations[1][1][0] = new Animator(
      this.spritesheet,
      361,
      157,
      67,
      71,
      5,
      0.22,
      0,
      false,
      true,
      false
    );

    // walking animation walking left
    this.animations[1][1][1] = new Animator(
      this.spritesheet,
      378,
      307,
      62,
      73,
      5,
      0.2,
      0,
      false,
      true,
      false
    );

    // walk up
    this.animations[1][1][2] = new Animator(
      this.spritesheet,
      361,
      230,
      66,
      73,
      5,
      0.2,
      0,
      false,
      true,
      false
    );

    // walk right
    this.animations[1][1][3] = new Animator(
      this.spritesheet,
      378,
      383,
      56,
      73,
      5,
      0.2,
      0,
      false,
      true,
      false
    );

    // attack down (only direction - spear throw)
    this.animations[1][2][0] = new Animator(
      this.spritesheet,
      380,
      721,
      73,
      74,
      6,
      0.2,
      0,
      false,
      true,
      false
    );

      // phase 1, state 2, make remaining directions teleporting directions
      this.animations[1][2][1] = new Animator(
        this.spritesheet,
        360,
        513,
        83,
        49,
        4,
        0.2,
        0,
        true,
        true,
        false
      );
      this.animations[1][2][2] = new Animator(
        this.spritesheet,
        360,
        513,
        83,
        49,
        4,
        0.2,
        0,
        true,
        true,
        false
      );
      this.animations[1][2][3] = new Animator(
        this.spritesheet,
        360,
        513,
        83,
        49,
        4,
        0.2,
        0,
        true,
        true,
        false
      );

    // This animation when Ganon dies
    this.deadAnim = new Animator(
      this.spritesheet,
      17,
      689,
      77,
      44,
      4,
      0.33,
      0,
      false,
      false,
      false
    );
  }


  // Ganon's character bounding boxes for collisions with other entities
  updateHurtBox() {
    if (this.phase == 0 && this.animations[0][0][0]) {
      this.boundingBox = new BoundingBox(this.x + 10, this.y, 50, 45);
    } else if (
      this.phase == 0 &&
      (this.animations[0][0][1] || this.animations[0][0][3])
    ) {
      this.boundingBox = new BoundingBox(this.x, 0, 20, 10);
    } else if (this.phase == 0 && this.animations[0][0][2]) {
      this.boundingBox = new BoundingBox(this.x, this.y, 60, 40);
    } else if (
      this.phase == 0 &&
      (this.animations[0][1][0] || this.animations[0][1][2])
    ) {
      this.boundingBox = new BoundingBox(this.x, this.y, 60, 54);
    } else if (
      this.phase == 0 &&
      (this.animations[0][1][1] || this.animations[0][1][3])
    ) {
      this.boundingBox = new BoundingBox(this.x, this.y, 50, 49);
    } else if (this.phase == 0 && this.animations[0][2][0]) {
      this.boundingBox = new BoundingBox(this.x, this.y, 65, 67);
    } else if (this.phase == 1 && this.animations[1][0][0]) {
      this.boundingBox = new BoundingBox(this.x + 16, this.y + 20, 45, 47);
    } else if (this.phase == 1 && this.animations[1][0][1]) {
      this.boundingBox = new BoundingBox(this.x, this.y + 30, 50, 15);
    } else if (this.phase == 1 && this.animations[1][0][2]) {
      this.boundingBox = new BoundingBox(this.x, this.y, 10, 10);
    } else if (this.phase == 1 && this.animations[1][1][0]) {
      this.boundingBox = new BoundingBox(this.x + 12, this.y + 20, 53, 47);
    }
  }

  // Ganon's weapon doing the damage
  updateHitBox() {
    // if (
    //   this.weapons[0][0] &&
    //   this.animations[0][2][0].advanceAndGetCurrentFrame(
    //     this.game.clockTick
    //   ) === 3
    // ) {
    //   this.boundingHitBox = new BoundingBox(this.x - 5, this.y - 30, 36, 29);
    // }
  }

  update() {
    if (this.animations.frameCount == 3) {
      this.pauseAnimation(3);
      this.resumeAnimation();
    }
    if (this.currentHealth <= 0) {
      this.dead = true;
      this.game.camera.entityCount -= 1;
      this.removeFromWorld = true;
    }

    this.elapsedTime += this.game.clockTick;
    var dist = distance(this, this.target);
    let desiredDistance = 100;

    if (dist < 5) {
      if (
        this.targetID < this.path.length - 1 &&
        this.target === this.path[this.targetID]
      ) {
        this.targetID++;
      }
      this.target = this.path[this.targetID];
    }

    for (var i = 0; i < this.game.entities.length; i++) {
      var ent = this.game.entities[i];
      if (ent instanceof Link && canSee(this, ent)) {
        this.target = ent;
        if (this.state === 0) {
          if (this.state === 0 || this.state === 1) {
          this.state = 2;
          this.facing = 0;
          this.elapsedTime = 0;
          this.game.addEntity(new Orb(this.game, this.x, this.y - 10, ent));
  
        }
        } else if (this.phase === 1) {
          if (this.state === 0 || this.state === 1) {
          this.state = 2;
          this.facing = 0;
          this.elapsedTime = 0;
          this.game.addEntity(new Trident(this.game, this.x, this.y - 10, ent));
  
          }
        } else {
          this.deadAnim;
        }
        
      }
    }

    if (this.state !== 2) { // if not attack state
      // Calculate distance between this entity and the target (main entity)
      let dist = distance(this, this.target);

      // If the current distance is less than the desired distance, move away from the main entity
      if (dist < desiredDistance) {
        // Calculate the normalized direction vector from this entity to the main entity
        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;
        let length = Math.sqrt(dx * dx + dy * dy);
        let nx = dx / length;
        let ny = dy / length;

        // Calculate the movement vector to maintain the desired distance
        let moveX = nx * this.maxSpeed;
        let moveY = ny * this.maxSpeed;

        // Update the position by moving away from the main entity
        this.speed = 50;
        this.x -= moveX * this.game.clockTick;
        this.y -= moveY * this.game.clockTick;
      } else {
        // If the current distance is greater than or equal to the desired distance, move towards the main entity
        // Calculate the movement vector towards the main entity
        this.velocity = {
          x: ((this.target.x - this.x) / dist) * this.maxSpeed,
          y: ((this.target.y - this.y) / dist) * this.maxSpeed,
        };

        // Move towards the main entity
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
      }
    } else {
      this.updateHitBox();
    }

    // change facing if Link is above or below Ganon
    if (this.state === 2) {
      this.facing = 0;
    } else if (Math.abs(this.velocity.y) > Math.abs(this.velocity.x)) {
      if (this.velocity.y < 0) {
        this.facing = 2; // facing up
      } else {
        this.facing = 0; // facing down
      }
    } else {
      // change facing if Link is on left or right Ganon
      if (this.velocity.x > 0) {
        this.facing = 3; // face right
      } else {
        this.facing = 1; // face left
      }
    }

    this.updateHurtBox();
    //this.updateHitBox();
    };

    
  

  draw(ctx) {
    // Draw the weapon and the Ganon animation if it's not dead
    if (!this.dead) {
      // Check if Ganon is in the attacking state with the weapon (phase 0, state 2)
      if (this.phase === 0 && this.state === 2) {
        // Draw the weapon
        console.log(this.phase, this.state, this.facing);
        // Draw the Ganon animation
        this.animations[this.phase][this.state][this.facing].drawFrame(
          this.game.clockTick,
          ctx,
          this.x - this.game.camera.x,
          this.y - this.game.camera.y,
          this.scale
        );

        // Draw the red rectangle for the hitbox of the attack animation
        if (PARAMS.DEBUG && this.boundingBox) {
          ctx.strokeStyle = "Blue";
          ctx.strokeRect(
            this.boundingBox.x - this.game.camera.x,
            this.boundingBox.y - this.game.camera.y,
            this.boundingBox.width,
            this.boundingBox.height
          );
        }
      } else {
        // Draw the Ganon animation if it's not in the attacking state
        this.animations[this.phase][this.state][this.facing].drawFrame(
          this.game.clockTick,
          ctx,
          this.x - this.game.camera.x,
          this.y - this.game.camera.y,
          this.scale
        );
      }
    }

    // Draw other debug information if enabled
    if (PARAMS.DEBUG) {
      // Draw the boundingHitBox of the attack animation
      if (this.boundingHitBox) {
        ctx.strokeStyle = "Red";
        ctx.strokeRect(
          this.boundingHitBox.x - this.game.camera.x,
          this.boundingHitBox.y - this.game.camera.y,
          this.boundingHitBox.width,
          this.boundingHitBox.height
        );
      }

      // Draw other debug elements like radius and visualRadius
      ctx.strokeStyle = "Red";
      ctx.beginPath();
      ctx.arc(
        this.x - this.game.camera.x,
        this.y - this.game.camera.y,
        this.radius,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.stroke();

      ctx.setLineDash([5, 15]);
      ctx.beginPath();
      ctx.arc(
        this.x - this.game.camera.x,
        this.y - this.game.camera.y,
        this.visualRadius,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  pauseAnimation(durationInTicks) {
    this.paused = true;
    this.pauseDuration = durationInTicks;
  }

  resumeAnimation() {
    this.paused = false;
    this.pauseDuration = 0;
    this.pauseCount = 0;
  }
}

class Trident {
  constructor(game, x, y, target) {
    console.log("Ganon Trident");
    Object.assign(this, { game, x, y, target });
    this.spritesheet = ASSET_MANAGER.getAsset("./boss_sprites/Ganondorf.png");
    this.game.Trident = this;

    this.initialPoint = { x, y };
    this.maxSpeed = 100;

    this.radius = 50;

    this.updateHitBox();
    this.weapons = [];
    this.loadAnimations();
    this.elapsedTime = 0;
  };

  loadAnimations() {
    this.weapons[0].push(new Animator(this.spritesheet, 725, 95, 82, 69, 1, 1, 0, false, false, false));
    this.weapons[1].push(new Animator(this.spritesheet, 800, 95, 67, 69, 1, 1, 0, false, false, false));
    this.weapons[2].push(new Animator(this.spritesheet, 871, 93, 62, 71, 1, 1, 0, false, false, false));
    this.weapons[3].push(new Animator(this.spritesheet, 721, 165, 77, 66, 1, 1, 0, false, false, false));
    this.weapons[4].push(new Animator(this.spritesheet, 798, 63, 69, 69, 1, 1, 0, false, false, false));
    this.weapons[5].push(new Animator(this.spritesheet, 725, 95, 82, 69, 1, 1, 0, false, false, false));
    this.weapons[6].push(new Animator(this.spritesheet, 725, 95, 82, 69, 1, 1, 0, false, false, false));
    this.weapons[7].push(new Animator(this.spritesheet, 725, 95, 82, 69, 1, 1, 0, false, false, false));

  }

  update() {
    this.elapsedTime += this.game.clockTick;
    this.velocity = { X: Math.cos(this.elapsedTime), Y: Math.sin(this.elapsedTime) };

    this.facing = getRotationFacing(this.velocity);

  };

  drawAngle(ctx, angle) {
    if (angle < 0 || angle > 359) return;

    if (!this.cache[angle]) {
      let radians = angle / 360 * 2 * Math.PI;
      let offscreenCanvas = document.createElement('canvas');

      offscreenCanvas.width = 32;
      offscreenCanvas.height = 32;

      let offscreenCtx = offscreenCanvas.getContext('2d');

      offscreenCtx.save();
      offscreenCtx.translate(16, 16);
      offscreenCtx.rotate(radians);
      offscreenCtx.translate(-16, -16);
      offscreenCtx.drawImage(this.spritesheet, 80, 0, 32, 32, 0, 0, 32, 32);
      offscreenCtx.restore();
      this.cache[angle] = offscreenCanvas;
    }
    var xOffset = 16;
    var yOffset = 16;

    ctx.drawImage(this.cache[angle], this.x - xOffset, this.y - yOffset);
    if (PARAMS.DEBUG) {
      ctx.strokeStyle = 'Green';
      ctx.strokeRect(this.x - xOffset, this.y - yOffset, 32, 32);
    }
  }


  draw(ctx) {
    if (this.facing < 5) {
      this.weapons[this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
    } else {
      ctx.save();
      ctx.scale(-1, 1);
      this.weapons[8 - this.facing].drawFrame(this.game.clockTick, ctx, -(this.x), this.y, 2);
      ctx.restore();
    }

    let angle = Math.atan2(this.velocity.y, this.velocity.x);
    if (angle < 0) angle += Math.PI * 2;
    let degrees = Math.floor(angle / Math.PI / 2 * 360);

    this.drawAngle(ctx, degrees);
  };
}


class Orb {
  constructor(game, x, y, target) {
    console.log("Ganon Orb");
    Object.assign(this, { game, x, y, target });
    this.spritesheet = ASSET_MANAGER.getAsset("./boss_sprites/Ganondorf.png");
    this.game.Orb = this;
    var dist = distance(this, this.target);
    this.radius = 12;

    this.initialPoint = { x, y };
    this.maxSpeed = 100;
    this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

    this.radius = 50;

    this.updateHitBox();
    this.weapons = [];
    this.weapons.push(new Animator(this.spritesheet,
      30,
      523,
      37,
      27,
      8,
      0.33,
      0,
      false,
      true,
      false));
    this.elapsedTime = 0;
  };

  updateLastHitBox() {
    this.lastHitBox = this.hitBox;
}

updateHitBox() {
    this.hitBox = new BoundingBox(this.x, this.y, 37 * 5, 27 * 5);
}

update() {
    this.x += this.velocity.x * this.game.clockTick;
    this.y += this.velocity.y * this.game.clockTick;

    this.updateLastHitBox();
    this.updateHitBox();

    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent instanceof Link && this.hitBox.collide(ent.hurtBox) && !ent.damagedState) {
            console.log("ATTACK LANDED - PROJECTILE (Ganon) VS LINK");
            ent.damageEntity(1);
            // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
            this.removeFromWorld = true;
        }
    }

    // this.updateHitBox();
    // this.updateLastHitBox();
};

draw(ctx) {
    this.weapons[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 5);

     //drawing the hitbox of the attack animation
     if (PARAMS.DEBUG && this.hitBox) {
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.hitBox.x - this.game.camera.x, this.hitBox.y - this.game.camera.y, this.hitBox.width, this.hitBox.height);
    }
};
}
