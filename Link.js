class Link{

	constructor(game,x, y) {
		Object.assign(this, { game, x ,y});
		this.game.link = this;
		this.speed = 200;


		this.maxHealth = 5;
		this.currentHealth =5;
		// link's state variables
		this.itemsEquipped = 0; // 0 = none, 1 = master sword and shield 
		this.state = 0; // 0 = idle, 1 = walking, 2 = running, 3 = damaged, 4 = jumping/falling, 5 = attack1
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
        this.hurtBox = new BoundingBox(this.x, this.y, 26 * 3, 56 * 3);
        
    
    };

	//function that updates the last hurtbox before our current one.
	updateLastHurtBox() {
        this.lastHurtBox = this.hurtBox;
    };

	//function that updates the current hitbox for when link is in an attack state
	updateHitBox() {

		//if he is in an attack1 state and during the frame that link swings.
		if(this.state === 5 && this.animations[1][5][0].currentFrame() === 2){
		 this.hitBox = new BoundingBox(this.x, this.y, 102 *3,90 *3);
		 //not working.
		 console.log("Hitbox created on 2nd frame");

		} else {
		this.hitBox = null; 
		}
	};

	//loads animations for link
	loadAnimations() {
        for (var i = 0; i < 2; i++) { //items equipped
            this.animations.push([]);
            for (var j = 0; j < 6; j++) { // 5 states
                this.animations[i].push([]);
                for (var k = 0; k < 2; k++) { // two directions facing
                    this.animations[i][j].push([]);
                }
            }
        }

        // no weapons
        // facing right = 0
        this.animations[0][0][0] = new Animator(ASSET_MANAGER.getAsset("./Link_main_character_walking_no_sword.png"), 6, 0, 26, 56, 1, 0.2, 15, false, true,false);
        this.animations[0][1][0] = new Animator(ASSET_MANAGER.getAsset("./Link_main_character_walking_no_sword.png"), 6, 0, 26, 56, 6, 0.2, 15, false, true,false);
        // this.animations[0][2][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][3][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][4][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		//no animations without attacking without a weapon, or blocking
		// this.animations[0][5][0] = null;
		// this.animations[0][6][0] = null;


		 // no weapons
        // facing left = 1
        this.animations[0][0][1] = new Animator(ASSET_MANAGER.getAsset("./Link_main_character_walking_no_sword.png"), 6, 0, 26, 56, 1, 0.2, 15, false, true,true);
        this.animations[0][1][1] = new Animator(ASSET_MANAGER.getAsset("./Link_main_character_walking_no_sword.png"), 6, 0, 26, 56, 6, 0.2, 15, false, true,true);
        // this.animations[0][2][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][3][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][4][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		//no animations without attacking without a weapon, or blocking
		// this.animations[0][5][1] = null;
		// this.animations[0][6][1] = null;

		 // mastersword and shield 
        // facing right = 0
        // this.animations[1][0][0] = new Animator(this.spritesheet, 210, 0, 16, 16, 1, 0.33, 14, false, true);
        this.animations[1][1][0] = new Animator(ASSET_MANAGER.getAsset("./Link_walk_mastersword_shield_right.png"), 0, 0, 60, 90, 6, 0.2, 1, false, true, false);
        // this.animations[1][2][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][3][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][4][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][5][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		this.animations[1][5][0] = new Animator(ASSET_MANAGER.getAsset("./Link_attack_1.png"), 0, 0, 102, 90, 4, 0.2, 1, false, true, false);
		// this.animations[1][6][0] = new Animator something;

		// mastersword and shield 
        // facing left = 1
        // this.animations[1][0][1] = new Animator(this.spritesheet, 210, 0, 16, 16, 1, 0.33, 14, false, true);
        // this.animations[1][1][1] = new Animator(this.spritesheet, 209, 52, 16, 32, 1, 0.33, 14, false, true);
        // this.animations[1][2][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][3][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][4][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][5][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		this.animations[1][5][1] = new Animator(ASSET_MANAGER.getAsset("./Link_attack_1.png"), 0, 0, 102, 90, 4, 0.2, 1, false, true, true);
		// this.animations[1][6][1] = new Animator something;



        // this.deadAnim = new Animator(this.spritesheet, 0, 16, 16, 16, 1, 0.33, 0, false, true);
    };



	update() {
		this.updateHitBox();
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

        this.state = 0;

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
        } else if(this.game.attack){
			console.log("Attack");
			this.itemsEquipped = 1;
			this.state = 5;
			//begin attack animation interval. 
		}

        else {
            this.state = 0;
			this.itemsEquipped = 0; 
        }


        if(this.game.damage) {
            this.state = 3; 
        }

    };

	draw(ctx) {
		this.animations[this.itemsEquipped][this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x , this.y, 3);
	
		// // drawing the hitbox of the attack animation
		// if (PARAMS.DEBUG && this.hitBox) {
		// 	ctx.strokeStyle = 'Red';
		// 	ctx.strokeRect(this.hitBox.x, this.hitBox.y, this.hitBox.width, this.hitBox.height);
		// }
	};
	
}