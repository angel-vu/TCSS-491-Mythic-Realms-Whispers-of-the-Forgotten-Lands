class Link{

	constructor(game,x, y) {
		Object.assign(this, { game, x ,y});
		this.game.link = this;
		this.speed = 200;
		
		this.elapsedTime = 0;

		this.maxHealth = 5;
		this.currentHealth =5;
		this.comboCounter = 0;
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
		if(this.facing ===0){
			this.hurtBox = new BoundingBox(this.x, this.y, 26 * 3, 58 * 3);
		} else if(this.facing === 1 ){
			this.hurtBox = new BoundingBox(this.x+90, this.y, 29 * 3, 58 * 3);
		}
        
        
    
    };

	//function that updates the last hurtbox before our current one.
	updateLastHurtBox() {
        this.lastHurtBox = this.hurtBox;
    };

	//function that updates the current hitbox for when link is in an attack state
	updateHitBox() {

		//if he is in an attack1 state and during the frame that link swings.
		if(this.state === 5 && this.animations[1][this.state][this.facing].advanceAndGetCurrentFrame(this.game.clockTick) ===2){
			this.hitBox = new BoundingBox(this.x, this.y, 102 *3, 60 *3);
			
		 console.log("Hitbox created on 2nd frame");
		
		 //attack2 state
		 //have to be done within the if statement as it would cause error and not go away in time.
		}else if( this.animations[1][6][0].advanceAndGetCurrentFrame(this.game.clockTick) ===2 ){
			this.hitBox = new BoundingBox(this.x, this.y - 52, 115 *3, 30 *3);
		

		} else if(this.animations[1][6][0].advanceAndGetCurrentFrame(this.game.clockTick) === 3){
			this.hitBox = new BoundingBox(this.x + 200, this.y - 52, 55 *3, 70 *3);
		} else if(this.animations[1][6][1].advanceAndGetCurrentFrame(this.game.clockTick) ===2){
			this.hitBox = new BoundingBox(this.x-35, this.y - 52, 115 *3, 30 *3);
		} else if(this.animations[1][6][1].advanceAndGetCurrentFrame(this.game.clockTick) ===3){
			this.hitBox = new BoundingBox(this.x - 50, this.y - 52, 55 *3, 70 *3);
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
        this.animations[0][0][0] = new Animator(ASSET_MANAGER.getAsset("./Link_main_character.png"), 20, 144, 40, 60, 1, 0.2, 0, false, true,false);
        this.animations[0][1][0] = new Animator(ASSET_MANAGER.getAsset("./Link_main_character.png"), 20, 144, 40, 60, 6, 0.2, 0, false, true,false);
        // this.animations[0][2][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][3][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][4][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);d
		//no animations without attacking without a weapon, or blocking
		// this.animations[0][5][0] = null;
		// this.animations[0][6][0] = null;
		


		 // no weapons
        // facing left = 1
        this.animations[0][0][1] = new Animator(ASSET_MANAGER.getAsset("./Link_main_character.png"), 20, 144, 40, 60, 1, 0.2, 0, false, true,true);
        this.animations[0][1][1] = new Animator(ASSET_MANAGER.getAsset("./Link_main_character.png"), 20, 144, 40, 60, 6, 0.2, 0, false, true,true);
        // this.animations[0][2][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][3][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][4][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		//no animations without attacking without a weapon, or blocking
		// this.animations[0][5][1] = null;
		// this.animations[0][6][1] = null;
	

		 // mastersword and shield 
        // facing right = 0
        this.animations[1][0][0] = new Animator(ASSET_MANAGER.getAsset("./Link_main_character.png"), 297, 139, 51, 60, 1, 0.2, 0, false, true,false);
        this.animations[1][1][0] = new Animator(ASSET_MANAGER.getAsset("./Link_main_character.png"), 297, 139, 51, 60, 6, 0.2, 0, false, true,false);
        // this.animations[1][2][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][3][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][4][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][5][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		this.animations[1][5][0] = new Animator(ASSET_MANAGER.getAsset("./Link_attack_1.png"), 0, 20, 102, 60, 4, 0.2, 1, false, true, false);
		this.animations[1][6][0] = new Animator(ASSET_MANAGER.getAsset("./Link_attack_1.png"), 439, 2, 122, 73, 6, 0.2, 0, false, true, false);

		// mastersword and shield 
        // facing left = 1
        this.animations[1][0][1] = new Animator(ASSET_MANAGER.getAsset("./Link_main_character.png"), 646, 139, 60, 60, 1, 0.2, 0, false, true,false);
        this.animations[1][1][1] = new Animator(ASSET_MANAGER.getAsset("./Link_main_character.png"), 646, 139, 60, 60, 6, 0.2, 0, false, true,false);
        // this.animations[1][2][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][3][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][4][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][5][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		this.animations[1][5][1] = new Animator(ASSET_MANAGER.getAsset("./Link_attack_1.png"), 0, 20, 102, 60, 4, 0.2, 1, false, true, true);
		this.animations[1][6][1] = new Animator(ASSET_MANAGER.getAsset("./Link_attack_1.png"), 439, 2, 122, 73, 6, 0.2, 0, false, true, true);



        // this.deadAnim = new Animator(this.spritesheet, 0, 16, 16, 16, 1, 0.33, 0, false, true);
    };



	update() {
		this.updateHitBox();
		this.updateHurtBox();
		
        if (this.x > 1024) {
            this.x = -130;
        }

        if (this.x < -130) {
            this.x = 1024;
        }

        if (this.y > 1024) {
            this.y = -130;
        }

        if (this.y < -130) {
            this.y = 1024;
        }

        //this.state = 0;

        if (this.game.down && !this.game.up) {
            console.log("DOWN");
            this.state = 1;
            this.y = this.y + this.speed * this.game.clockTick;
        }

        else if (this.game.up && !this.game.down) {
            console.log("UP");
            this.state = 1;
            this.y = this.y - this.speed * this.game.clockTick;
        }

        else if (this.game.left && !this.game.right) {
            console.log("LEFT");
            this.facing = 1;
            this.state = 1;
            this.x = this.x - this.speed * this.game.clockTick;
        }

        else if (this.game.right && !this.game.left) {
            console.log("RIGHT");
            this.facing = 0;
            this.state = 1;
            this.x = this.x + this.speed * this.game.clockTick;
        }  else if(!this.game.right && !this.game.left && this.state === 1 ){
			this.state = 0;
			//enter only for the states before being damaged.
		} else if(this.game.attack && this.state < 3  ){
			console.log("Attack");
			this.elapsedTime= 0;
			//this.itemsEquipped = 1;
			if(this.comboCounter === 0){
				this.state = 5;
			} else if(this.comboCounter === 1 ){ //begin attack animation interval. 
				this.state = 6;
			}
			
		//creating  time windows for our combo system. 
		} else if(this.state > 4 ){  // after attacking at least once.
		this.elapsedTime+= this.game.clockTick;
			//when the elapsed time is greater than the animation state, go back to idle, and allow to continue combo
			if(this.elapsedTime > this.animations[1][this.state][this.facing].totalTime){
			this.state = 0;
			this.comboCounter++;
			} 
		} 
		
			
        if(this.game.damage) {
            this.state = 1; 
        }

    };

	draw(ctx) {
		if(this.state === 6 ){
			if(this.facing === 0){
				this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-20 , this.y -52, 3);
			} else if (this.facing === 1 ){
				this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x-40 , this.y -52, 3);
			}
		} else {
			this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x , this.y, 3);
		}
	
	
		 //drawing the hitbox of the attack animation
		 if (PARAMS.DEBUG && this.hitBox) {
		 	ctx.strokeStyle = 'Red';
		 	ctx.strokeRect(this.hitBox.x, this.hitBox.y, this.hitBox.width, this.hitBox.height);
		 }

		  //drawing the hurtbox of link
		  if (PARAMS.DEBUG && this.hurtBox) {
			ctx.strokeStyle = 'Blue';
			ctx.strokeRect(this.hurtBox.x, this.hurtBox.y, this.hurtBox.width, this.hurtBox.height);
		}
	};
	
}