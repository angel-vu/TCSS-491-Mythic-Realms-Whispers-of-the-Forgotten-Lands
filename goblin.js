class Goblin {
    constructor(game, x, y, path,startingHealth) {
        Object.assign(this, { game, x, y, path, startingHealth });

        this.game.goblin = this;

        this.initialPoint = { x, y };
        
        this.currentHealth = this.startingHealth;
        this.maxHealth = this.startingHealth;
        this.dead = false;
        this.damagedState = false;
        this.scale = 2;

        //how long Goblin has been damagedfor in seconds.
        this.damagedCounter = 0;
        //Flag used to flicker when damaged.
        this.flickerFlag = true;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./enemies/goblin.png");

        // goblins state variables
        this.facing = 3; //  2 = left, 3 = right 
        this.state = 0; // 0 = walking, 1 = idle, 2 = attack

        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

        var dist = distance(this, this.target);
        this.maxSpeed = 150; // pixels per second
     
        this.velocity = { x: this.maxSpeed, y: this.maxSpeed };

        // goblins's animations
        this.healthbar = new HealthBar(this);
        this.updateBB();
        this.updateMoveBox();
        this.updateHurtBox();
        this.updateHitBox();
        this.updatePathingCircle();
        this.animations = [];
        this.loadAnimations();
        this.elapsedTime = 0;
    };

    //Function that subtracts the entitie's health and sets their damage flag to true.
	damageEntity(damageNumber){
		this.currentHealth -= damageNumber;
		this.damagedState = true;
		this.state = 0;
	}

    // Bounding sphere for enemy vision
	updatePathingCircle(){
		this.pathingCircle = new BoundingCircle(this.hurtBox.x + this.hurtBox.width/2, this.hurtBox.y + this.hurtBox.height/2, 30, 200);
	}

    updateBB() {
        if(this.facing === 3) { // right
            if(this.state === 0) { // walking
                this.BB = new BoundingBox(this.x, this.y, 50, 65);
            } else if (this.state === 1) {
                this.BB = new BoundingBox(this.x, this.y, 50, 75);
            } else {
                this.BB = new BoundingBox(this.x, this.y, 50, 75);
            }
        } else { // left
            if(this.state === 0) { // walking
                this.BB = new BoundingBox(this.x, this.y, 50, 65);
            } else if (this.state === 1) {
                this.BB = new BoundingBox(this.x, this.y, 50, 75);
            } else {
                this.BB = new BoundingBox(this.x, this.y, 50, 75);
            }
        }
    };

    updateHitBox() {
        if(this.state !== 2) {
            this.hitBox = new BoundingBox(this.x, this.y, 0, 0);
        } else { // attack state
            if(this.facing === 3) { // right
                this.hitBox = new BoundingBox(this.x + 55, this.y, 10, 50);
            } else { // left
                this.hitBox = new BoundingBox(this.x, this.y, 10, 50);
            }
        }
    }

    updateHurtBox() {
        if(this.facing === 3) { // right
            if(this.state === 0) { // walking
                this.hurtBox = new BoundingBox(this.x, this.y, 50, 65);
            } else if (this.state === 1) {
                this.hurtBox = new BoundingBox(this.x, this.y, 50, 75);
            } else {
                this.hurtBox = new BoundingBox(this.x, this.y, 50, 75);
            }
        } else { // left
            if(this.state === 0) { // walking
                this.hurtBox = new BoundingBox(this.x, this.y, 50, 65);
            } else if (this.state === 1) {
                this.hurtBox = new BoundingBox(this.x, this.y, 50, 75);
            } else {
                this.hurtBox = new BoundingBox(this.x, this.y, 50, 75);
            }
        }
    }

    updateMoveBox() {
        this.moveBox = new BoundingBox(this.x, this.y + 30 * this.scale, 25 * this.scale, 5 * this.scale);
    }

    // Tracks last bounding box 
    updateLastBB() {
        this.lastBB = this.BB;
    };

    // Trakcs last hurt box 
	updateLastHurtBox() {
        this.lastHurtBox = this.hurtBox;
    };

	// Tracks last hit box
	updateLastHitBox(){
		this.lastHitBox = this.hitBox;
	}

    updateLastMoveBox() {
        this.lastMoveBox = this.moveBox;
    }

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
        this.animations[0][2] = new Animator(this.spritesheet,  93,    80, 29,   35, 3, 0.3, 0, false, true, false);
        this.animations[0][3] = new Animator(this.spritesheet,   5.4, 153, 32,   40, 1, 0.1, 0, false, true, false);
        this.animations[0][4] = new Animator(this.spritesheet,   5.4, 153, 32,   40, 2, 1,   0, false, true, false);

        // up (Walk, Idle, Attack, Injured, Dead)
        this.animations[1][0] = new Animator(this.spritesheet,  103.5,   0, 34.5, 40, 3, 0.1, 0, false, true, false);
        this.animations[1][1] = new Animator(this.spritesheet,  138,     0, 34.5, 40, 1, 0.1, 0, false, true, false);
        this.animations[1][2] = new Animator(this.spritesheet,    6,    80, 29,   35, 3, 0.3, 0, false, true, false);
        this.animations[1][3] = new Animator(this.spritesheet,    5.4, 153, 32,   40, 1, 0.1, 0, false, true, false);
        this.animations[1][4] = new Animator(this.spritesheet,    5.4, 153, 32,   40, 2, 1,   0, false, true, false);

        // left (Walk, Idle, Attack, Injured, Dead)
        this.animations[2][0] = new Animator(this.spritesheet,  100,   40,  29, 35, 3, 0.1, 0, false, true, true);
        this.animations[2][1] = new Animator(this.spritesheet,  100,   40,  29, 35, 1, 0.1, 0, false, true, true);
        this.animations[2][2] = new Animator(this.spritesheet,    3,   115, 33, 38, 3, 0.3, 0, false, true, true);
        this.animations[2][3] = new Animator(this.spritesheet,    5.4, 153, 32, 35, 1, 0.1, 0, false, true, true);
        this.animations[2][4] = new Animator(this.spritesheet,    5.4, 153, 32, 35, 2, 1,   0, false, true, true);

        // right (Walk, Idle, Attack, Injured, Dead)
        this.animations[3][0] = new Animator(this.spritesheet,   2,   40,  32, 35, 3, 0.1, 1, false, true, true);
        this.animations[3][1] = new Animator(this.spritesheet,   2,   40,  32, 35, 1, 0.1, 1, false, true, true);
        this.animations[3][2] = new Animator(this.spritesheet, 101,   115, 32, 38, 3, 0.3, 0, false, true, true);
        this.animations[3][3] = new Animator(this.spritesheet,   5.4, 153, 32, 35, 1, 0.1, 0, false, true, false);
        this.animations[3][4] = new Animator(this.spritesheet,   5.4, 153, 32, 35, 2, 1,   0, false, true, true);
    };

    update() {
        if (!this.game.camera.gamePaused) {

            if(this.currentHealth <= 0) {
                this.dead = true;
                this.game.camera.entityCount -= 1;
                this.game.addEntity(new HealthPotion(this.game, this.x, this.y));
                this.removeFromWorld = true;
            }

            if (!this.damagedState) {

                var dist = distance(this, this.target);

                // if (dist < 5) {
                // //     if(this.targetID === this.path.length - 1) {
                // //         this.targetID = 0;
                // //     }

                // //     if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
                // //         this.targetID++;
                // //     }

                //     this.target = this.path[this.targetID];
                // } 

                if (this.state === 2) {
                    this.elapsedTime += this.game.clockTick;
                }

                if (this.state !== 2) {
                    dist = distance(this, this.target);
                    // this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
                    this.x += this.velocity.x * this.game.clockTick;
                    this.y += this.velocity.y * this.game.clockTick;

                    if (this.velocity.x > 0){
                        this.facing = 3; // right
                    } else {
                        this.facing = 2; // left
                    }
                } else {
                    // Wizard Direction always faces Link
                    if (this.game.camera.link.x <= this.x){
                        this.facing = 2;
                    } else {
                        this.facing = 3;
                    }
                }
                
                this.updateLastBB();
                this.updateBB();
                this.updateLastMoveBox();
                this.updateMoveBox();
                this.updateLastHurtBox();
                this.updateHurtBox();
                this.updatePathingCircle();
                this.updateLastHitBox();
                this.updateHitBox();

                for (var i = 0; i < this.game.entities.length; i++) {
                    var ent = this.game.entities[i];
                    if(ent instanceof Link && !ent.dead) {
                        if (ent instanceof Link && canSee(this.pathingCircle, ent.pathingCircle)) {
                            this.target = ent.pathingCircle;
                            // move towards target when within visual radius
                            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
                        } 
                        if (ent instanceof Link && collide(this.pathingCircle, ent.pathingCircle) && !ent.damagedState) {
                            if (this.state === 0 || this.state === 1) {
                                this.state = 2;
                                this.elapsedTime = 0;
                            } else if (this.elapsedTime >= this.animations[this.facing][2].totalTime && !ent.damagedState) {
                                if (ent instanceof Link && this.hitBox.collide(ent.hurtBox)&& !ent.damagedState) {
                                    console.log("ATTACK LANDED - WIZARD VS LINK!");
                                    ent.damageEntity(1);
                                    this.elapsedTime = 0;
                                }
                            } 
                        }
                    }

                    if (ent instanceof Link && this.state === 2 && (!collide(this.pathingCircle, ent.pathingCircle)) || (ent instanceof Link && ent.dead)) {
                        this.state = 0;
                    }

                    if (this.moveBox && ent.BoundingBox && this.moveBox.collide(ent.BoundingBox)) {
                        if (ent instanceof CollisionBox) {
                          console.log(ent.row + " and " + ent.column + " tilenumber: " + ent.tileNumber);
                          if (this.lastMoveBox.left >= ent.BoundingBox.right) {
                            // collided with the right side of the CollisionBox
                            this.x = ent.BoundingBox.right;
                            this.velocity.x *= -1;
                            //collided with the left side of the CollisionBox.
                          } else if (this.lastMoveBox.right <= ent.BoundingBox.left) {
                            this.x = ent.BoundingBox.left - this.moveBox.width;
                            this.velocity.x *= -1;
                            //collided with the bottom of the CollisonBox.Was below the Collisionbox.
                          } else if (this.lastMoveBox.top >= ent.BoundingBox.bottom) {
                            this.y = ent.BoundingBox.bottom - 35 * this.scale + this.lastMoveBox.height;
                            this.velocity.y *= -1;
                            // collided with the top of the CollisionBox. Was above the CollisionBox.
                          } else if (this.lastMoveBox.bottom <= ent.BoundingBox.top) {
                            // based off the height of the idle height of the hurtbox of link
                            // added one pixel or else we would clip into the wall
                            this.y = ent.BoundingBox.top - 36 * this.scale;
                            this.velocity.y *= -1;
                          }
                        }
            
                        this.updateMoveBox();
                      }
                }
            }

            if (this.damagedState && !this.dead) {
                //When in a state of being damaged, create a window where you flicker for 1 second and you can't take damage.
                this.damagedCounter += this.game.clockTick;
                if (this.damagedCounter >= 1) {
                    this.damagedState = false;
                    this.state = 0;
                    this.damagedCounter = 0;
                    //stopping link from sliding when he is damaged.
                }
            }
            if (this.state === 1) {
                this.state = 0;
            }   
         } else {
            this.state = 1;
        }
    };

        draw(ctx) {        
            if (this.damagedState && !this.dead) {
                if (this.flickerFlag) {
                  this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
                }
                this.flickerFlag = !this.flickerFlag;
              } else {
                this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
              }

              if (!this.dead) {
                this.healthbar.draw(ctx);
              }
        
            if (PARAMS.DEBUG) {
                // Pathing 
                ctx.strokeStyle = "Black";
                ctx.beginPath();
                ctx.moveTo(this.initialPoint.x, this.initialPoint.y);
                for (var i = 0; i < this.path.length - 1; i++) {
                    ctx.lineTo(this.path[i].x - this.game.camera.x, this.path[i].y - this.game.camera.y);
                };
                ctx.stroke();
                
                // // Hurt Box (Damage Taken)
                ctx.strokeStyle = 'Blue';
                ctx.strokeRect(this.hurtBox.x - this.game.camera.x, this.hurtBox.y - this.game.camera.y, this.hurtBox.width, this.hurtBox.height);

                if (this.moveBox) {
                    ctx.strokeStyle = "Pink";
                    ctx.strokeRect(this.moveBox.x - this.game.camera.x, this.moveBox.y - this.game.camera.y, this.moveBox.width, this.moveBox.height);
                }
        
                if (this.hitBox) {
                    ctx.strokeStyle = 'Red';
                    ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
                }

                // Inner Circle 
                ctx.strokeStyle = "Yellow";
                ctx.beginPath();
                ctx.arc(this.pathingCircle.x - this.game.camera.x, this.pathingCircle.y - this.game.camera.y, this.pathingCircle.radius, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.stroke();
        
                // Vision Circle
                ctx.setLineDash([5, 15]);
                ctx.beginPath();
                ctx.arc(this.pathingCircle.x - this.game.camera.x, this.pathingCircle.y - this.game.camera.y, this.pathingCircle.visualRadius, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.stroke();
                ctx.setLineDash([]);
        
                // Bounding Box
                // ctx.strokeStyle = 'Red';
                // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            }
        }
    }