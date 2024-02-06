class Link {

	constructor(game,x, y) {
		Object.assign(this, { game, x ,y});
		this.game.link = this;
		this.speed = 200;
		this.radius = 50;
		
		this.elapsedTime = 0;

		this.maxHealth = 5;
		this.currentHealth =5;
		this.comboCounter = 0;
		this.comboWindowTime = 0;
		this.enterComboWindow = false;
		this.maxComboCounter = 2;
		// link's state variables
		this.itemsEquipped = 1; // 0 = none, 1 = master sword and shield 
		this.state = 0; // 0 = idle, 1 = walking, 2 = running, 3 = damaged, 4 = jumping/falling, 5 = attack1 6= attack2
		this.facing = 0; // 0 = right, 1 = left
		this.dead = false;
	
		//bounding box where if it collides with another entity's hitbox we will receive damage.
		this.updateHurtBox();

		//bounding box where if it collides with abother entity's hurtbox they will receive damage.
		

		//links animations
		this.animations = [];
		this.loadAnimations();
		this.updateHitBox();
	};

	//function that updates the hurtbox of link
	updateHurtBox() {

		//Based off the size of Link's walking animation frame size.
		// * 3 since we draw Link Scaled up by 3 to drawFrame in animator class.
		if(this.state < 4 && this.facing ===0){
			this.hurtBox = new BoundingBox(this.x, this.y, 26 * 3, 58 * 3);
		} else if(this.state < 4 && this.facing === 1 ){
			this.hurtBox = new BoundingBox(this.x, this.y, 26 * 3, 58 * 3);
		} else if( this.state >= 4 && this.facing === 0){
			if(this.state ===5 && this.animations[1][5][0].advanceAndGetCurrentFrame(this.game.clockTick) === 0){
				this.hurtBox = new BoundingBox(this.x, this.y + 5, 33 * 3, 58 * 3);
			} else if(this.state ===5 && this.animations[1][5][0].advanceAndGetCurrentFrame(this.game.clockTick) === 1){
				this.hurtBox = new BoundingBox(this.x, this.y + 5, 42 * 3, 58 * 3);
			} else if(this.state ===5 && this.animations[1][5][0].advanceAndGetCurrentFrame(this.game.clockTick) === 2){
				this.hurtBox = new BoundingBox(this.x, this.y + 5, 33 * 3, 58 * 3);
			}else if(this.state ===5 && this.animations[1][5][0].advanceAndGetCurrentFrame(this.game.clockTick) === 3){
				this.hurtBox = new BoundingBox(this.x, this.y + 5, 30 * 3, 58 * 3);
			} 
			if(this.animations[1][6][0].advanceAndGetCurrentFrame(this.game.clockTick) >= 3){
				this.hurtBox = new BoundingBox(this.x, this.y + 5, 45 * 3, 58 * 3);
			}

		} else if(this.state >= 4 && this.facing === 1 ) {
			if(this.animations[1][5][1].advanceAndGetCurrentFrame(this.game.clockTick) === 0){
				this.hurtBox = new BoundingBox(this.x, this.y+5, 33 * 3, 58 * 3);
			}else if(this.animations[1][5][1].advanceAndGetCurrentFrame(this.game.clockTick) === 1){
				this.hurtBox = new BoundingBox(this.x -25, this.y+5, 42 * 3, 58 * 3);
			} else if(this.animations[1][5][1].advanceAndGetCurrentFrame(this.game.clockTick) === 2){
				this.hurtBox = new BoundingBox(this.x, this.y+5, 34 * 3, 58 * 3);
			} else if(this.animations[1][5][1].advanceAndGetCurrentFrame(this.game.clockTick) === 3){
				this.hurtBox = new BoundingBox(this.x + 10, this.y+5, 34 * 3, 58 * 3);
			} 
			if(this.animations[1][6][1].advanceAndGetCurrentFrame(this.game.clockTick) >= 3){
				 this.hurtBox = new BoundingBox(this.x -15, this.y+5, 39 * 3, 58 * 3);
			}
			
		}
        
    
    };

	//function that updates the last hurtbox before our current one.
	updateLastHurtBox() {
        this.lastHurtBox = this.hurtBox;
    };
	//function that updates the last hitbox before our current one.
	updateLastHitBox(){
		this.lastHitBox = this.hitBox;
	}

	//function that updates the current hitbox for when link is in an attack state
	updateHitBox() {

		//if he is in an attack1 state and during the frame that link swings.
		if(this.state ===5 && this.animations[1][5][0].advanceAndGetCurrentFrame(this.game.clockTick) === 1){
			this.hitBox = new BoundingBox(this.x + 130, this.y + 5, 30.2 *3, 60 *3);
		}else if(this.state ===5 && this.animations[1][5][0].advanceAndGetCurrentFrame(this.game.clockTick) === 2){
			//making hitbox spawn at the end of the last hitbox before this frame.
			// 215 by x coordinate(85) + the other x before this.
			// 85 by the start of where animation frame is being drawn
			this.hitBox = new BoundingBox(this.x-85, this.y + 5, 215, 60 *3);
		 	console.log("Hitbox created on 2nd frame");
		}else if( this.state ===5 &&this.animations[1][5][1].advanceAndGetCurrentFrame(this.game.clockTick) === 1){
			//got x coordinate from draw method of where the frame is being drawn
			this.hitBox = new BoundingBox(this.x - 122, this.y + 5, 30.2 *3, 60 *3);
		}else if(this.state ===5 && this.animations[1][5][1].advanceAndGetCurrentFrame(this.game.clockTick) === 2){
			//x coordinate from -45 + width of hitbox from last frame.
			//width from normal facing.
			this.hitBox = new BoundingBox(this.x -31.4, this.y + 5, 215, 60 *3);

		//attack2 state
		//have to be done within the if statement as it would cause error and not go away in time.
		}else if( this.animations[1][6][0].advanceAndGetCurrentFrame(this.game.clockTick) === 2 ){
			this.hitBox = new BoundingBox(this.x -102, this.y - 45, 80 *3, 30 *3);
		

		} else if(this.animations[1][6][0].advanceAndGetCurrentFrame(this.game.clockTick) === 3){
			//x coordinate from previous frame(-102)+ their width(240) for this x coordinate
			this.hitBox = new BoundingBox(this.x + 138, this.y - 45, 42 *3, 73 *3);

		} else if(this.animations[1][6][1].advanceAndGetCurrentFrame(this.game.clockTick) ===2){
			
			this.hitBox = new BoundingBox(this.x -31, this.y - 45, 80*3, 30 *3);

		} else if(this.animations[1][6][1].advanceAndGetCurrentFrame(this.game.clockTick) ===3){
			//x cordinate here is the start of the frame being drawn
			//width needs to connect to last frames hitbox left side -157 +(42*3) = -31.
			this.hitBox = new BoundingBox(this.x -157, this.y - 45, 42 *3, 73 *3);
		}
		else {
			this.hitBox = null; 
		}
	};

	//loads animations for link
	loadAnimations() {
        for (var i = 0; i < 2; i++) { //items equipped
            this.animations.push([]);
            for (var j = 0; j < 7; j++) { // 6 states
                this.animations[i].push([]);
                for (var k = 0; k < 2; k++) { // two directions facing
                    this.animations[i][j].push([]);
                }
            }
        }

        // no weapons
        // facing right = 0
        this.animations[0][0][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 20, 144, 40, 60, 1, 0.2, 0, false, true,false);
        this.animations[0][1][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 20, 144, 40, 60, 6, 0.2, 0, false, true,false);
        // this.animations[0][2][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][3][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][4][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);d
		//no animations without attacking without a weapon, or blocking
		// this.animations[0][5][0] = null;
		// this.animations[0][6][0] = null;
		


		 // no weapons
        // facing left = 1
        this.animations[0][0][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 20, 144, 40, 60, 1, 0.2, 0, false, true,true);
        this.animations[0][1][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 20, 144, 40, 60, 6, 0.2, 0, false, true,true);
        // this.animations[0][2][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][3][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][4][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		//no animations without attacking without a weapon, or blocking
		// this.animations[0][5][1] = null;
		// this.animations[0][6][1] = null;
	

		 // mastersword and shield 
        // facing right = 0
        this.animations[1][0][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 297, 139, 51, 60, 1, 0.2, 0, false, true,false);
        this.animations[1][1][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 297, 139, 51, 60, 6, 0.2, 0, false, true,false);
        // this.animations[1][2][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][3][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][4][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][5][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		this.animations[1][5][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_attack_1.png"), 0, 20, 102, 60, 4, 0.2, 1, false, true, false);
		this.animations[1][6][0] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_attack_1.png"), 439, 2, 122, 73, 6, 0.2, 0, false, true, false);

		// mastersword and shield 
        // facing left = 1
        this.animations[1][0][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 646, 139, 60, 60, 1, 0.2, 0, false, true,false);
        this.animations[1][1][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_main_character.png"), 646, 139, 60, 60, 6, 0.2, 0, false, true,false);
        // this.animations[1][2][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][3][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][4][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][5][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		this.animations[1][5][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_attack_1.png"), 0, 20, 102, 60, 4, 0.2, 1, false, true, true);
		this.animations[1][6][1] = new Animator(ASSET_MANAGER.getAsset("./sprites/Link_attack_1.png"), 439, 2, 122, 73, 6, 0.2, 0, false, true, true);



        // this.deadAnim = new Animator(this.spritesheet, 0, 16, 16, 16, 1, 0.33, 0, false, true);
    };



	update() {
		// console.log(this.comboCounter);
	
	
        // if (this.x > 1024) {
        //     this.x = -130;
        // }

        // if (this.x < -130) {
        //     this.x = 1024;
        // }

        // if (this.y > 1024) {
        //     this.y = -130;
        // }

        // if (this.y < -130) {
        //     this.y = 1024;
        // }

        //this.state = 0;
		//bug where if you moved during the attack animations, the animations times never reset back to 0.
		//  if (this.game.down && !this.game.up && this.comboCounter === 0) {
        if (this.game.down && !this.game.up && this.comboCounter === 0) {
            this.state = 1;
            this.y = this.y + this.speed * this.game.clockTick;
        }
	
        else if (this.game.up && !this.game.down && this.comboCounter === 0) {
            this.state = 1;
            this.y = this.y - this.speed * this.game.clockTick;
        }

        else if (this.game.left && !this.game.right && this.comboCounter === 0) {
            this.facing = 1;
            this.state = 1;
            this.x = this.x - this.speed * this.game.clockTick;
        }

        else if (this.game.right && !this.game.left && this.comboCounter === 0) {
            this.facing = 0;
            this.state = 1;
            this.x = this.x + this.speed * this.game.clockTick;
        }  else if(!this.game.right && !this.game.left && this.state === 1 ){
			this.state = 0;
			//enter only for the states before being damaged.
		} else if(this.game.attack && this.state < 3 ){
			console.log("Attack");
			this.elapsedTime= 0;
			
			
			//this.itemsEquipped = 1;
			if(this.comboCounter === 0){
				this.state = 5;
				//Line needed here in the case where I interupt my attack animation and I try to enter the attack animation again afterwards.
				// to begin in the start.
				//this.animations[1][5][this.facing].elapsedTime = 0;
				this.comboCounter++;
			} else if(this.comboCounter === 1 ){ //begin attack animation interval. 
				this.state = 6;
				this.comboCounter++;
			} else if(this.comboCounter ===this.maxComboCounter ){
				this.comboCounter = 0;
			}
			
			
			
		//creating  time windows for our combo system. 
		} else if(this.state > 4 ){  // after attacking at least once.
			this.elapsedTime+= this.game.clockTick;
			
			//does is done lag a little behind like in the same way that current frame does? 
			//when the elapsed time is greater than the animation state, go back to idle, and allow to continue combo
			//After animation is done leaves a little bit of the first frame after the last frame is done.
			if(this.animations[1][this.state][this.facing].isDoneOutsideOfAnimator(this.game.clockTick)){
				this.elapsedTime = 0;
				this.state = 0;
				this.enterComboWindow = true;
			} 
		}else if(this.enterComboWindow){
			
			if(!this.game.attack && this.state <4){
			this.comboWindowTime+= this.game.clockTick;
			} else if (this.game.attack && this.state > 4) {
				this.enterComboWindow = false;
				this.comboWindowTime = 0;
			}
			//When combo window is too long, reset comboCounter to 0 and elapsed time back to 0.
			if(this.comboWindowTime > 0.5){
				this.comboCounter = 0;
				this.comboWindowTime = 0;
				this.state = 0;
				this.enterComboWindow = false;
				this.elapsedTime = 0;
			}
		} 
		
			
        if(this.game.damage) {
            this.state = 1; 
        }
		this.updateLastHurtBox();
		this.updateLastHitBox();
		this.updateHitBox();
		this.updateHurtBox();

    };

	draw(ctx) {
		if(this.itemsEquipped === 1 && this.state <= 1){
			if(this.facing === 0){
				this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);
			} else if(this.facing === 1){
				this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x -90 - this.game.camera.x, this.y - this.game.camera.y, 3);
			}
		}else if(this.itemsEquipped === 1 && this.state === 5 ){
            if(this.facing === 0){
                this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x- 85-this.game.camera.x, this.y+5 - this.game.camera.y, 3);
            } else if(this.facing === 1){
                this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x- 122-this.game.camera.x , this.y+5 - this.game.camera.y, 3);
            }

        } else if(this.itemsEquipped === 1 && this.state === 6 ){
            if(this.facing === 0){
                this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-102-this.game.camera.x, this.y - 45 - this.game.camera.y, 3);
            } else if (this.facing === 1 ){
                this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-155 -this.game.camera.x , this.y - 45 - this.game.camera.y, 3);
            }
        } else {
            this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);
        }
    
         //drawing the hitbox of the attack animation
         if (PARAMS.DEBUG && this.hitBox) {
            
             ctx.strokeStyle = 'Red';
             ctx.strokeRect(this.hitBox.x - this.game.camera.x, this.hitBox.y - this.game.camera.y, this.hitBox.width, this.hitBox.height);
         }

          //drawing the hurtbox of link
          if (PARAMS.DEBUG && this.hurtBox) {
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.hurtBox.x - this.game.camera.x, this.hurtBox.y - this.game.camera.y, this.hurtBox.width, this.hurtBox.height);
        }

		if (PARAMS.DEBUG) {
 
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x, this.y - this.game.camera.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x, this.y - this.game.camera.y, this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);
        }
	};
	
}