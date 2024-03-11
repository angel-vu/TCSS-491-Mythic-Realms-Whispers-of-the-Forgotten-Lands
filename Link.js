class Link {
  constructor(game, x, y) {
    Object.assign(this, { game, x, y });
    this.game.link = this;

    this.velocity = { x: 0, y: 0 };
    //to instantly apply the accumulated velcoity for instance when moving right for awhile and then going up and right at the same time
    // or else gives a sliding affect as there was different velocities in those different directions.
    this.accumulatedVelocity = 0;
    this.radius = 20;

    this.maxHealth = 5;
    this.currentHealth = 5;
    this.healthbar = new HealthBar(this);

    this.comboCounter = 0;
    this.comboWindowTime = 0;
    this.enterComboWindow = false;
    this.maxComboCounter = 2;
    // link's state variables
    this.itemsEquipped = 1; // 0 = none, 1 = master sword and shield
    this.state = 0; // 0 = idle, 1 = walking, 2 = running, 3 = damaged, 4 = dead, 5 = attack1 6= attack2
    this.facing = 0; // 0 = right, 1 = left
    this.dead = false;
    //how long Link has been damaged for in seconds.
    this.damagedCounter = 0;
    //Flag used to flicker when damaged.
    this.flickerFlag = true;
    this.animations = [];
    //links animations
    this.loadAnimations();
    //bounding box where if it collides with another entity's hitbox we will receive damage.
    this.updateHurtBox();

    //bounding box where if it collides with abother entity's hurtbox they will receive damage.
    this.updateHitBox();

    //bounding box where to keep within bounds of the map.
    this.updateMoveBox();

    //a bounding sphere to attract enemy entities toward us.
    this.updatePathingCircle();
  }

  //Function that subtracts the entitie's health and sets their damage flag to true.
  damageEntity(damageNumber) {
    this.currentHealth -= damageNumber;
    this.damagedState = true;
    this.state = 0;
    ASSET_MANAGER.playAsset("./music/link_damage_1.mp3");
  }
  //a bounding sphere to attract enemy entities toward us.
  updatePathingCircle() {
    this.pathingCircle = new BoundingCircle(this.hurtBox.x + this.hurtBox.width / 2, this.hurtBox.y + this.hurtBox.height / 2, 20, 0);
  }
  //the boundingbox to keep him within bounds of the map

  //Try to keep it around his feet to allow overlap.
  updateMoveBox() {
    if (this.itemsEquipped === 0) {
      if (this.state <= 1) {
        this.moveBox = new BoundingBox(this.x, this.y + 48 * 3, 26 * 3, 10 * 3);
      } else if (this.state === 2) {
        this.moveBox = new BoundingBox(this.x, this.y + 48 * 3, 52 * 3, 10 * 3);
      }
    } else if (this.itemsEquipped === 1) {
      if (this.state <= 1) {
        this.moveBox = new BoundingBox(this.x, this.y + 48 * 3, 26 * 3, 10 * 3);
      } else if (this.state === 2) {
        this.moveBox = new BoundingBox(this.x, this.y + 48 * 3, 55 * 3, 10 * 3);
      } else if (this.state === 5) {
        this.moveBox = new BoundingBox(this.x, this.y + 48 * 3, 30 * 3, 10 * 3);
      } else if (this.state === 6) {
        this.moveBox = new BoundingBox(this.x, this.y + 48 * 3, 32 * 3, 10 * 3);
      }
    }
  }

  //function that updates the hurtbox of link
  updateHurtBox() {
    //Based off the size of Link's walking animation frame size.
    // * 3 since we draw Link Scaled up by 3 to drawFrame in animator class.

    // if(this.itemsEquipped === 0){
    // 	if( this.state < 4){

    // 	}

    // } else if( this.itemsEquipped === 1){

    // }

    if (this.state < 4 && this.facing === 0) {
      if (this.state === 2) {
        if (this.itemsEquipped === 0) {
          if (this.animations[0][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 0) {
            this.hurtBox = new BoundingBox(this.x, this.y + 20, 50 * 3, 50 * 3);
          } else if (this.animations[0][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 1) {
            this.hurtBox = new BoundingBox(this.x + 20, this.y + 20, 45 * 3, 50 * 3);
          } else if (this.animations[0][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 2) {
            this.hurtBox = new BoundingBox(this.x + 25, this.y + 20, 38 * 3, 50 * 3);
          } else if (this.animations[0][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 3) {
            this.hurtBox = new BoundingBox(this.x + 10, this.y + 20, 39 * 3, 50 * 3);
          } else if (this.animations[0][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 4) {
            this.hurtBox = new BoundingBox(this.x, this.y + 20, 50 * 3, 50 * 3);
          } else if (this.animations[0][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 5) {
            this.hurtBox = new BoundingBox(this.x + 20, this.y + 20, 45 * 3, 50 * 3);
          } else if (this.animations[0][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 6) {
            this.hurtBox = new BoundingBox(this.x + 25, this.y + 20, 38 * 3, 50 * 3);
          } else if (this.animations[0][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 7) {
            this.hurtBox = new BoundingBox(this.x + 10, this.y + 20, 38 * 3, 50 * 3);
          }
        } else if (this.itemsEquipped === 1) {
          if (this.animations[1][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 0) {
            this.hurtBox = new BoundingBox(this.x, this.y + 20, 51 * 3, 50 * 3);
          } else if (this.animations[1][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 1) {
            this.hurtBox = new BoundingBox(this.x + 15, this.y + 20, 48 * 3, 50 * 3);
          } else if (this.animations[1][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 2) {
            this.hurtBox = new BoundingBox(this.x + 35, this.y + 20, 38 * 3, 50 * 3);
          } else if (this.animations[1][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 3) {
            this.hurtBox = new BoundingBox(this.x + 30, this.y + 20, 39 * 3, 50 * 3);
          } else if (this.animations[1][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 4) {
            this.hurtBox = new BoundingBox(this.x + 10, this.y + 20, 51 * 3, 50 * 3);
          } else if (this.animations[1][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 5) {
            this.hurtBox = new BoundingBox(this.x + 20, this.y + 20, 46 * 3, 50 * 3);
          } else if (this.animations[1][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 6) {
            this.hurtBox = new BoundingBox(this.x + 40, this.y + 20, 38 * 3, 50 * 3);
          } else if (this.animations[1][2][0].advanceAndGetCurrentFrame(this.game.clockTick) === 7) {
            this.hurtBox = new BoundingBox(this.x + 35, this.y + 20, 38 * 3, 50 * 3);
          }
        }
      } else {
        //default hitbox that fits the weaponless idle animation.
        this.hurtBox = new BoundingBox(this.x, this.y, 26 * 3, 58 * 3);
      }
    } else if (this.state < 4 && this.facing === 1) {
      if (this.state === 2) {
        if (this.itemsEquipped === 0) {
          if (this.animations[0][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 0) {
            this.hurtBox = new BoundingBox(this.x, this.y + 20, 50 * 3, 50 * 3);
          } else if (this.animations[0][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 1) {
            this.hurtBox = new BoundingBox(this.x + 20, this.y + 20, 45 * 3, 50 * 3);
          } else if (this.animations[0][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 2) {
            this.hurtBox = new BoundingBox(this.x + 25, this.y + 20, 38 * 3, 50 * 3);
          } else if (this.animations[0][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 3) {
            this.hurtBox = new BoundingBox(this.x + 10, this.y + 20, 39 * 3, 50 * 3);
          } else if (this.animations[0][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 4) {
            this.hurtBox = new BoundingBox(this.x, this.y + 20, 50 * 3, 50 * 3);
          } else if (this.animations[0][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 5) {
            this.hurtBox = new BoundingBox(this.x + 20, this.y + 20, 45 * 3, 50 * 3);
          } else if (this.animations[0][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 6) {
            this.hurtBox = new BoundingBox(this.x + 25, this.y + 20, 38 * 3, 50 * 3);
          } else if (this.animations[0][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 7) {
            this.hurtBox = new BoundingBox(this.x + 10, this.y + 20, 38 * 3, 50 * 3);
          }
        } else if (this.itemsEquipped === 1) {
          if (this.animations[1][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 0) {
            this.hurtBox = new BoundingBox(this.x, this.y + 20, 51 * 3, 50 * 3);
          } else if (this.animations[1][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 1) {
            this.hurtBox = new BoundingBox(this.x + 15, this.y + 20, 48 * 3, 50 * 3);
          } else if (this.animations[1][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 2) {
            this.hurtBox = new BoundingBox(this.x + 35, this.y + 20, 38 * 3, 50 * 3);
          } else if (this.animations[1][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 3) {
            this.hurtBox = new BoundingBox(this.x + 20, this.y + 20, 39 * 3, 50 * 3);
          } else if (this.animations[1][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 4) {
            this.hurtBox = new BoundingBox(this.x - 1, this.y + 20, 51 * 3, 50 * 3);
          } else if (this.animations[1][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 5) {
            this.hurtBox = new BoundingBox(this.x + 20, this.y + 20, 45 * 3, 50 * 3);
          } else if (this.animations[1][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 6) {
            this.hurtBox = new BoundingBox(this.x + 25, this.y + 20, 33 * 3, 50 * 3);
          } else if (this.animations[1][2][1].advanceAndGetCurrentFrame(this.game.clockTick) === 7) {
            this.hurtBox = new BoundingBox(this.x + 15, this.y + 20, 38 * 3, 50 * 3);
          }
        }
      } else {
        //default hitbox that fits the weaponless idle animation.
        this.hurtBox = new BoundingBox(this.x, this.y, 26 * 3, 58 * 3);
      }
    } else if (this.state >= 4 && this.facing === 0) {
      if (this.state === 5 && this.animations[1][5][0].advanceAndGetCurrentFrame(this.game.clockTick) === 0) {
        this.hurtBox = new BoundingBox(this.x, this.y + 5, 33 * 3, 58 * 3);
      } else if (this.state === 5 && this.animations[1][5][0].advanceAndGetCurrentFrame(this.game.clockTick) === 1) {
        this.hurtBox = new BoundingBox(this.x, this.y + 5, 42 * 3, 58 * 3);
      } else if (this.state === 5 && this.animations[1][5][0].advanceAndGetCurrentFrame(this.game.clockTick) === 2) {
        this.hurtBox = new BoundingBox(this.x, this.y + 5, 33 * 3, 58 * 3);
      } else if (this.state === 5 && this.animations[1][5][0].advanceAndGetCurrentFrame(this.game.clockTick) === 3) {
        this.hurtBox = new BoundingBox(this.x, this.y + 5, 30 * 3, 58 * 3);
      } else if (this.state === 6 && this.animations[1][6][0].advanceAndGetCurrentFrame(this.game.clockTick) >= 3) {
        this.hurtBox = new BoundingBox(this.x, this.y + 5, 45 * 3, 58 * 3);
      } else {
        //default hitbox that fits the weaponless idle animation.
        this.hurtBox = new BoundingBox(this.x, this.y, 26 * 3, 58 * 3);
      }
    } else if (this.state >= 4 && this.facing === 1) {
      if (this.state === 5 && this.animations[1][5][1].advanceAndGetCurrentFrame(this.game.clockTick) === 0) {
        this.hurtBox = new BoundingBox(this.x, this.y + 5, 33 * 3, 58 * 3);
      } else if (this.state === 5 && this.animations[1][5][1].advanceAndGetCurrentFrame(this.game.clockTick) === 1) {
        this.hurtBox = new BoundingBox(this.x - 25, this.y + 5, 42 * 3, 58 * 3);
      } else if (this.state === 5 && this.animations[1][5][1].advanceAndGetCurrentFrame(this.game.clockTick) === 2) {
        this.hurtBox = new BoundingBox(this.x, this.y + 5, 34 * 3, 58 * 3);
      } else if (this.state === 5 && this.animations[1][5][1].advanceAndGetCurrentFrame(this.game.clockTick) === 3) {
        this.hurtBox = new BoundingBox(this.x + 10, this.y + 5, 34 * 3, 58 * 3);
      } else if (this.state === 6 && this.animations[1][6][1].advanceAndGetCurrentFrame(this.game.clockTick) >= 3) {
        this.hurtBox = new BoundingBox(this.x - 15, this.y + 5, 39 * 3, 58 * 3);
      } else {
        //default hitbox that fits the weaponless idle animation.
        this.hurtBox = new BoundingBox(this.x, this.y, 26 * 3, 58 * 3);
      }
    }
  }

  //function that updates the last hurtbox before our current one.
  updateLastHurtBox() {
    this.lastHurtBox = this.hurtBox;
  }
  //function that updates the last hitbox before our current one.
  updateLastHitBox() {
    this.lastHitBox = this.hitBox;
  }
  //function that updates the last movebox before our current one.
  updateLastMoveBox() {
    this.lastMoveBox = this.moveBox;
  }

  //function that updates the current hitbox for when link is in an attack state
  updateHitBox() {
    //if he is in an attack1 state and during the frame that link swings.
    if (this.state === 5 && this.animations[1][5][0].advanceAndGetCurrentFrame(this.game.clockTick) === 1) {
      this.hitBox = new BoundingBox(this.x + 130, this.y + 5, 30.2 * 3, 60 * 3);
    } else if (this.state === 5 && this.animations[1][5][0].advanceAndGetCurrentFrame(this.game.clockTick) === 2) {
      //making hitbox spawn at the end of the last hitbox before this frame.
      // 215 by x coordinate(85) + the other x before this.
      // 85 by the start of where animation frame is being drawn
      this.hitBox = new BoundingBox(this.x - 85, this.y + 5, 215, 60 * 3);
      //console.log("Hitbox created on 2nd frame");
    } else if (this.state === 5 && this.animations[1][5][1].advanceAndGetCurrentFrame(this.game.clockTick) === 1) {
      //got x coordinate from draw method of where the frame is being drawn
      this.hitBox = new BoundingBox(this.x - 122, this.y + 5, 30.2 * 3, 60 * 3);
    } else if (this.state === 5 && this.animations[1][5][1].advanceAndGetCurrentFrame(this.game.clockTick) === 2) {
      //x coordinate from -45 + width of hitbox from last frame.
      //width from normal facing.
      this.hitBox = new BoundingBox(this.x - 31.4, this.y + 5, 215, 60 * 3);

      //attack2 state
      //have to be done within the if statement as it would cause error and not go away in time.
    } else if (this.animations[1][6][0].advanceAndGetCurrentFrame(this.game.clockTick) === 2) {
      this.hitBox = new BoundingBox(this.x - 102, this.y - 45, 80 * 3, 30 * 3);
    } else if (this.animations[1][6][0].advanceAndGetCurrentFrame(this.game.clockTick) === 3) {
      //x coordinate from previous frame(-102)+ their width(240) for this x coordinate
      this.hitBox = new BoundingBox(this.x + 138, this.y - 45, 42 * 3, 73 * 3);
    } else if (this.animations[1][6][1].advanceAndGetCurrentFrame(this.game.clockTick) === 2) {
      this.hitBox = new BoundingBox(this.x - 31, this.y - 45, 80 * 3, 30 * 3);
    } else if (this.animations[1][6][1].advanceAndGetCurrentFrame(this.game.clockTick) === 3) {
      //x cordinate here is the start of the frame being drawn
      //width needs to connect to last frames hitbox left side -157 +(42*3) = -31.
      this.hitBox = new BoundingBox(this.x - 157, this.y - 45, 42 * 3, 73 * 3);
    } else {
      this.hitBox = null;
    }
  }

  //loads animations for link
  loadAnimations() {
    for (var i = 0; i < 2; i++) {
      //items equipped
      this.animations.push([]);
      for (var j = 0; j < 7; j++) {
        // 6 states
        this.animations[i].push([]);
        for (var k = 0; k < 2; k++) {
          // two directions facing
          this.animations[i][j].push([]);
        }
      }
    }

    // no weapons
    // facing right = 0
    this.animations[0][0][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 20, 144, 40, 60, 1, 0.2, 0, false, true, false);
    this.animations[0][1][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 20, 144, 40, 60, 6, 0.2, 0, false, true, false);
    this.animations[0][2][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 28, 335, 52, 50, 8, 0.15, 0, false, true, false);
    // this.animations[0][3][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
    this.animations[0][4][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 250, 720, 56, 50, 1, 0.15, 0, false, true, false);
    //no animations without attacking without a weapon, or blocking
    // this.animations[0][5][0] = null;
    // this.animations[0][6][0] = null;

    // no weapons
    // facing left = 1
    this.animations[0][0][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 20, 144, 40, 60, 1, 0.2, 0, false, true, true);
    this.animations[0][1][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 20, 144, 40, 60, 6, 0.2, 0, false, true, true);
    this.animations[0][2][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 503, 335, 52, 50, 8, 0.15, 0, false, true, false);
    // this.animations[0][3][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
    this.animations[0][4][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 250, 720, 56, 50, 1, 0.15, 0, false, true, true);
    //no animations without attacking without a weapon, or blocking
    // this.animations[0][5][1] = null;
    // this.animations[0][6][1] = null;

    // mastersword and shield
    // facing right = 0
    this.animations[1][0][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 297, 139, 51, 60, 1, 0.2, 0, false, true, false);
    this.animations[1][1][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 297, 139, 51, 60, 6, 0.2, 0, false, true, false);
    this.animations[1][2][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 28, 403, 55, 50, 8, 0.15, 0, false, true, false);
    // this.animations[1][3][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
    this.animations[1][4][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 588, 720, 86, 50, 1, 0.15, 0, false, true, false);
    // this.animations[1][5][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
    this.animations[1][5][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_attack_1.png"), 0, 20, 102, 60, 4, 0.15, 1, false, true, false);
    this.animations[1][6][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_attack_1.png"), 439, 2, 122, 73, 6, 0.15, 0, false, true, false);

    // mastersword and shield
    // facing left = 1
    this.animations[1][0][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 646, 139, 60, 60, 1, 0.2, 0, false, true, false);
    this.animations[1][1][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 646, 139, 60, 60, 6, 0.2, 0, false, true, false);
    this.animations[1][2][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 502, 403, 54, 50, 8, 0.15, 0, false, true, false);
    // this.animations[1][3][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
    this.animations[1][4][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 997, 720, 86, 50, 1, 0.15, 0, false, true, false);
    this.animations[1][5][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_attack_1.png"), 0, 20, 102, 60, 4, 0.15, 1, false, true, true);
    this.animations[1][6][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_attack_1.png"), 439, 2, 122, 73, 6, 0.15, 0, false, true, true);

    // this.deadAnim = new Animator(this.spritesheet, 0, 16, 16, 16, 1, 0.33, 0, false, true);
  }

  update() {
    if (!this.game.camera.gamePaused) {
      // Check if the game is not paused
      //Constants to use for movement physcs for Mario.
      const MIN_WALK_VEL = 4.453125;
      const MAX_WALK_VEL = 93.75;
      const MAX_RUN_VEL = 200;
      const WALK_ACC = 133.59375;
      const RUN_ACC = 270;

      //movement physics
      if (!this.damagedState) {
        // can't move or attack when we are being damaged.
        //walking, idle or running.
        if (this.state <= 2) {
          //((Math.abs(this.velocity.x) < MIN_WALK_VEL || Math.abs(this.velocity.y) < MIN_WALK_VEL )&& this.comboCounter === 0)
          if (Math.abs(this.velocity.y) < MIN_WALK_VEL) {
            this.velocity.y = 0;
            if (this.game.up) {
              this.velocity.y -= MIN_WALK_VEL;
            }
            if (this.game.down) {
              this.velocity.y += MIN_WALK_VEL;
            }
          } else if (Math.abs(this.velocity.y) >= MIN_WALK_VEL) {
            //velocity and acceleration when we are moving up and down.
            if (this.game.up && !this.game.down) {
              if (this.game.run) {
                this.state = 2;
                this.velocity.y -= RUN_ACC * this.game.clockTick;
              } else if (!this.game.run) {
                this.state = 1;
                this.velocity.y -= WALK_ACC * this.game.clockTick;
              }
            } else if (this.game.down && !this.game.up) {
              if (this.game.run) {
                this.state = 2;
                this.velocity.y += RUN_ACC * this.game.clockTick;
              } else if (!this.game.run) {
                this.state = 1;
                this.velocity.y += WALK_ACC * this.game.clockTick;
              }
            }
          }
          if (Math.abs(this.velocity.x) < MIN_WALK_VEL) {
            // slower than a walk // starting, stopping or turning around and not in a attack state
            this.velocity.x = 0;
            //this.state = 0;
            //instaneous acceleration.
            if (this.game.left && !this.game.right) {
              this.facing = 1;
              this.velocity.x -= MIN_WALK_VEL;
            }
            if (this.game.right && !this.game.left) {
              this.facing = 0;
              this.velocity.x += MIN_WALK_VEL;
            }

            //((Math.abs(this.velocity.x) >= MIN_WALK_VEL || Math.abs(this.velocity.y) >= MIN_WALK_VEL ) && this.comboCounter === 0)
          } else if (Math.abs(this.velocity.x) >= MIN_WALK_VEL) {
            //faster  than a walk // starting, stopping or turning around and not in a attack state;
            if (this.facing === 0) {
              if (this.game.right && !this.game.left) {
                if (this.game.run) {
                  this.state = 2;
                  this.velocity.x += RUN_ACC * this.game.clockTick;
                } else if (!this.game.run) {
                  this.state = 1;
                  this.velocity.x += WALK_ACC * this.game.clockTick;
                }
                //when we are facing left and in the middle of walking or running we switch hit right
              } else if (this.game.left && !this.game.right) {
                this.facing = 1;
              }
            } else if (this.facing === 1) {
              if (this.game.left && !this.game.right) {
                if (this.game.run) {
                  this.state = 2;
                  this.velocity.x -= RUN_ACC * this.game.clockTick;
                } else if (!this.game.run) {
                  this.state = 1;
                  this.velocity.x -= WALK_ACC * this.game.clockTick;
                }
                //when we are facing left and in the middle of walking or running we switch hit right
              } else if (this.game.right && !this.game.left) {
                this.facing = 0;
              }
            }
          }
          //if the user is not moving at all set the velocity to 0
          if (!this.game.down && !this.game.up && !this.game.left && !this.game.right) {
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.accumulatedVelocity = 0;
            this.state = 0;
          }
        }

        //Attack Physics.
        if (this.game.attack && this.state < 3 && this.itemsEquipped === 1) {
         // console.log("Attack");
          this.velocity.x = 0;
          this.velocity.y = 0;
          this.accumulatedVelocity = 0;

          if (this.comboCounter === 0) {
            this.state = 5;
            ASSET_MANAGER.playAsset("./music/link_attack_1.mp3");
            //Line needed here in the case where I interupt my attack animation and I try to enter the attack animation again afterwards.
            // to begin in the start.
            //this.animations[1][5][this.facing].elapsedTime = 0;
            this.comboCounter++;
          } else if (this.comboCounter === 1) {
            //begin attack animation interval.
            this.state = 6;
            ASSET_MANAGER.playAsset("./music/link_attack_2.mp3");
            this.comboCounter++;
          } else if (this.comboCounter === this.maxComboCounter) {
            this.comboCounter = 0;
          }

          //creating  time windows for our combo system.
        } else if (this.state > 4) {
          // after attacking at least once.

          //when the elapsed time is greater than the animation state, go back to idle, and allow to continue combo
          //After animation is done leaves a little bit of the first frame after the last frame is done.
          if (this.animations[1][this.state][this.facing].isDoneOutsideOfAnimator(this.game.clockTick)) {
            this.state = 0;
            this.enterComboWindow = true;
          }
        } else if (this.enterComboWindow) {
          if (!this.game.attack && this.state < 4) {
            this.comboWindowTime += this.game.clockTick;
          } else if (this.game.attack && this.state > 4) {
            this.enterComboWindow = false;
            this.comboWindowTime = 0;
          }
          //When combo window is too long, reset comboCounter to 0 and elapsed time back to 0.
          if (this.comboWindowTime > 0.5) {
            this.comboCounter = 0;
            this.comboWindowTime = 0;
            //this.state = 0;
            this.enterComboWindow = false;
          }
        }
        // max speed calculation

        if (this.velocity.y >= MAX_RUN_VEL) this.velocity.y = MAX_RUN_VEL;
        if (this.velocity.y <= -MAX_RUN_VEL) this.velocity.y = -MAX_RUN_VEL;
        if (this.velocity.y >= MAX_WALK_VEL && !this.game.run) this.velocity.y = MAX_WALK_VEL;
        if (this.velocity.y <= -MAX_WALK_VEL && !this.game.run) this.velocity.y = -MAX_WALK_VEL;

        if (this.velocity.x >= MAX_RUN_VEL) this.velocity.x = MAX_RUN_VEL;
        if (this.velocity.x <= -MAX_RUN_VEL) this.velocity.x = -MAX_RUN_VEL;
        if (this.velocity.x >= MAX_WALK_VEL && !this.game.run) this.velocity.x = MAX_WALK_VEL;
        if (this.velocity.x <= -MAX_WALK_VEL && !this.game.run) this.velocity.x = -MAX_WALK_VEL;

        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
        this.updateLastHurtBox();
        this.updateLastHitBox();
        this.updateLastMoveBox();
        this.updateHitBox();
        this.updateHurtBox();
        this.updateMoveBox();
        this.updatePathingCircle();
        //collision logic
        let that = this;

        this.game.entities.forEach(function (entity) {
          //if link attacks collide with another entities hitbox.
          if (entity.hurtBox && that.hitBox && that.hitBox.collide(entity.hurtBox) && !entity.damagedState) {
            if (entity instanceof Banshee || entity instanceof Ganon || entity instanceof Akagane || entity instanceof Goblin || entity instanceof Knight || entity instanceof Skeleton || entity instanceof Wizard) {
              // Sword dealing 1 point of damage.
              entity.damageEntity(1);
              //console.log(entity.currentHealth);
            }
          }
          //running into health potions
          if (entity.BB && that.hurtBox && that.hurtBox.collide(entity.BB)) {
            if (entity instanceof HealthPotion) {
              if (that.currentHealth < that.maxHealth) {
                
                //so Link doesn't heal over the max health.
                that.currentHealth = Math.min(that.currentHealth + 2, that.maxHealth);
              }
              ASSET_MANAGER.playAsset("./music/heal.mp3");
              entity.removeFromWorld = true;
            } else if (entity instanceof ShieldPotion) {
              // Activate shield bubble on Link
              entity.activateShieldBubbleOnLink();
              ASSET_MANAGER.playAsset("./music/yeah.mp3");
              entity.removeFromWorld = true;
            }
          }
          //Boundary checking for when link walks into a wall.
          if (that.moveBox && entity.BoundingBox && that.moveBox.collide(entity.BoundingBox)) {
            if (entity instanceof CollisionBox) {
              //console.log(entity.row + " and " + entity.column + " tilenumber: " + entity.tileNumber);
              if (that.lastMoveBox.left >= entity.BoundingBox.right) {
                // collided with the right side of the CollisionBox
                that.x = entity.BoundingBox.right;
                //collided with the left side of the CollisionBox.
              } else if (that.lastMoveBox.right <= entity.BoundingBox.left) {
                that.x = entity.BoundingBox.left - that.moveBox.width;
                //collided with the bottom of the CollisonBox.Was below the Collisionbox.
              } else if (that.lastMoveBox.top >= entity.BoundingBox.bottom) {
                that.y = entity.BoundingBox.bottom - 58 * 3 + that.lastMoveBox.height;
                // collided with the top of the CollisionBox. Was above the CollisionBox.
              } else if (that.lastMoveBox.bottom <= entity.BoundingBox.top) {
                //based off the height of the idle height of the hurtbox of link
                // added one pixel or else we would clip into the wall
                that.y = entity.BoundingBox.top - 58 * 3;
              }
            }

            that.updateMoveBox();
          }
        });
      } else if (this.damagedState && !this.dead) {
        //When in a state of being damaged, create a window where you flicker for 0.5 second and you can't take damage.
        this.damagedCounter += this.game.clockTick;
        if (this.damagedCounter >= 0.5) {
          this.damagedState = false;
          this.damagedCounter = 0;
          //stopping link from sliding when he is damaged.
        }
      }
      // If our health goes to 0 or below we set our state to 4 to draw the dead animation.
      if (this.currentHealth <= 0) {
        this.dead = true;
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.accumulatedVelocity = 0;
        this.damagedState = false;
        // DEATH ANIMATION?
        this.state = 4;
        //console.log("LINK DEAD");
      }
    } else {
      this.state = 0;
    }
  }

  draw(ctx) {
 

    //if we haven't been hit draw as normal
    if (!this.damagedState) {
      if (this.itemsEquipped === 1 && this.state <= 1) {
        if (this.facing === 0) {
          this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);
        } else if (this.facing === 1) {
          this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 90 - this.game.camera.x, this.y - this.game.camera.y, 3);
        }
      } else if (this.itemsEquipped === 1 && this.state === 2) {
        this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 20 - this.game.camera.y, 3);
      } else if (this.itemsEquipped === 1 && this.state === 4) {
        if (this.facing === 0) {
          this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 90 - this.game.camera.x, this.y + 30 - this.game.camera.y, 3);
        } else if (this.facing === 1) {
          this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 90 - this.game.camera.x, this.y + 30 - this.game.camera.y, 3);
        }
      } else if (this.itemsEquipped === 1 && this.state === 5) {
        if (this.facing === 0) {
          this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 85 - this.game.camera.x, this.y + 5 - this.game.camera.y, 3);
        } else if (this.facing === 1) {
          this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 122 - this.game.camera.x, this.y + 5 - this.game.camera.y, 3);
        }
      } else if (this.itemsEquipped === 1 && this.state === 6) {
        if (this.facing === 0) {
          this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 102 - this.game.camera.x, this.y - 45 - this.game.camera.y, 3);
        } else if (this.facing === 1) {
          this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 155 - this.game.camera.x, this.y - 45 - this.game.camera.y, 3);
        }
      } else if (this.itemsEquipped === 0 && this.state <= 1) {
        this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 20 - this.game.camera.x, this.y - this.game.camera.y + 10, 3);
      } else if (this.itemsEquipped === 0 && this.state === 2) {
        this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y + 20, 3);
      } else if (this.itemsEquipped === 0 && this.state === 4) {
        this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + 30 - this.game.camera.y, 3);
      } else {
        this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);
      }
      //If we have been damaged flicker for 2 seconds.
      //has a unique damaged animation
    } else if (this.damagedState && !this.dead) {
      if (this.flickerFlag) {
        if (this.itemsEquipped === 1) {

          if(this.facing === 0){
          this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);
          } else if(this.facing === 1){
            this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 90 - this.game.camera.x, this.y - this.game.camera.y, 3);
          }
        } else {
          this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - 20 - this.game.camera.x, this.y - this.game.camera.y + 10, 3);
        }
      }
      this.flickerFlag = !this.flickerFlag;
    }

    if (!this.dead) {
      this.healthbar.draw(ctx);
    }

    //drawing the hitbox of the attack animation
    if (PARAMS.DEBUG && this.hitBox) {
      ctx.strokeStyle = "Red";
      ctx.strokeRect(this.hitBox.x - this.game.camera.x, this.hitBox.y - this.game.camera.y, this.hitBox.width, this.hitBox.height);
    }

    //drawing the hurtbox of link
    if (PARAMS.DEBUG && this.hurtBox) {
      ctx.strokeStyle = "Blue";
      // ctx.strokeRect(this.hurtBox.x - this.game.camera.x, this.hurtBox.y - this.game.camera.y, this.hurtBox.width, this.hurtBox.height);
      ctx.strokeRect(this.hurtBox.x - this.game.camera.x, this.hurtBox.y - this.game.camera.y, this.hurtBox.width, this.hurtBox.height);
    }
    if (PARAMS.DEBUG && this.moveBox) {
      ctx.strokeStyle = "Pink";
      ctx.strokeRect(this.moveBox.x - this.game.camera.x, this.moveBox.y - this.game.camera.y, this.moveBox.width, this.moveBox.height);
    }

    if (PARAMS.DEBUG && this.pathingCircle) {
      ctx.strokeStyle = "Red";
      ctx.beginPath();
      ctx.arc(this.pathingCircle.x - this.game.camera.x, this.pathingCircle.y - this.game.camera.y, this.pathingCircle.radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();

      // ctx.setLineDash([5, 15]);
      // ctx.beginPath();
      // ctx.arc(this.pathingCircle.x- this.game.camera.x, this.pathingCircle.y - this.game.camera.y, this.pathingCircle.radius, 0, 2 * Math.PI);
      // ctx.closePath();
      // ctx.stroke();
      // ctx.setLineDash([]);
    }
  }
}
