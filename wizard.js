class Wizard {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });

        this.game.wizard = this;
        this.scale = 1.5;

        this.initialPoint = {x, y};

        this.damagedState = false;
        this.currentHealth = 3;
        this.maxHealth = 3;

        this.dead = false;

        //how long Link has been damagedfor in seconds.
        this.damagedCounter = 0;
        //Flag used to flicker when damaged.
        this.flickerFlag = true;

        this.healthbar = new HealthBar(this);

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./enemies/wizard.png");

        this.facing = 0; // 0 = down, 1 = up, 2 = left, 3 = right 
        this.state = 0; // 0 = walking, 1 = idle, 2 = running, 3 = attack, 4 = damaged, 5 = dead

        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

        var dist = distance(this, this.target);
        this.maxSpeed = 150; // pixels per second
     
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        // wizard's animations
        this.updateBB();
        this.updateHurtBox();
        this.updateHitBox();
        this.updatePathingCircle();
        this.animations = [];
        this.loadAnimations();
        this.elapsedTime = 0;
    };

    //Function that subtracts the entitie's health and sets their damage flag to true.
    damageEntity(damageNumber) {
        this.currentHealth -= damageNumber;
        this.damagedState = true;
        this.state = 0;
    }

    // Bounding sphere for enemy vision
    updatePathingCircle() {
        this.pathingCircle = new BoundingCircle(this.hurtBox.x + this.hurtBox.width / 2, this.hurtBox.y + this.hurtBox.height / 2, 100, 200);
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 50, 50);
    }

    updateLastBB() {
        this.lastBB = this.BB;
    }

    updateHurtBox() {
        this.hurtBox = new BoundingBox(this.x, this.y, 50, 50);
    }

    updateLastHurtBox() {
        this.lastHurtBox = this.hurtBox;
    }

    updateHitBox() {
        this.hitBox = new BoundingBox(this.x, this.y, 50, 50);
    }

    updateLastHitBox() {
        this.lastHitBox = this.hitBox;
    }

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
        if (!this.game.camera.gamePaused) {
            if(this.currentHealth <= 0) {
                this.dead = true;
                this.game.camera.entityCount -= 1;
                this.game.addEntity(new HealthPotion(this.game, this.x, this.y));
                this.removeFromWorld = true;
            }

            if (!this.damagedState) {
                var dist = distance(this, this.target);

                if (dist < 5) {
                    if(this.targetID === this.path.length - 1) {
                        this.targetID = 0;
                    }

                    if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
                        this.targetID++;
                    }

                    this.target = this.path[this.targetID];
                }

                if (this.state === 2) {
                    this.elapsedTime += this.game.clockTick;
                }

                for (var i = 0; i < this.game.entities.length; i++) {
                    var ent = this.game.entities[i];
                    if(ent instanceof Link && !ent.dead) {
                        if (ent instanceof Link && canSee(this.pathingCircle, ent.pathingCircle)) {
                            this.target = ent.pathingCircle;
                        } 
                        if (ent instanceof Link && collide(this.pathingCircle, ent.pathingCircle) && !ent.damagedState) {
                            if (this.state === 0 || this.state === 1) {
                                this.state = 2;
                                this.elapsedTime = 0;
                            } else if (this.elapsedTime > 1.6 && !ent.damagedState) {
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
                }

                if (this.state !== 2) {
                    dist = distance(this, this.target);
                    this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
                    this.x += this.velocity.x * this.game.clockTick;
                    this.y += this.velocity.y * this.game.clockTick;

                    if (this.velocity.x > 0){
                        this.facing = 3; // right
                    } else {
                        this.facing = 2; // left
                    }
                } else {
                    // Wizard Direction always faces Link
                    if (this.game.camera.link.x < this.x){
                        this.facing = 2;
                    } else {
                        this.facing = 3;
                    }
                }
                
                this.updateLastBB();
                this.updateBB();
                this.updateLastHurtBox();
                this.updatePathingCircle();
                this.updateHurtBox();
                this.updateLastHitBox();
                this.updateHitBox();
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
        
                // // Hit Box (Attack)          
                // ctx.strokeStyle = 'Red';
                // ctx.strokeRect(this.hitBox.x - this.game.camera.x, this.hitBox.y - this.game.camera.y, this.hitBox.width, this.hitBox.height);
        
                // // Hurt Box (Damage Taken)
                ctx.strokeStyle = 'Blue';
                ctx.strokeRect(this.hurtBox.x - this.game.camera.x, this.hurtBox.y - this.game.camera.y, this.hurtBox.width, this.hurtBox.height);
        
                // ctx.strokeStyle = 'Red';
                // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        
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
