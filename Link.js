class Link{

	constructor(game) {
		this.game = game;
		//right walking animation 
		this.rightWalkAnimator = new Animator(ASSET_MANAGER.getAsset("./Link_main_character_walking_no_sword.png"), 6, 0, 26, 56, 6, 0.2, 15, false, true,false);

		//left walking animation 
		this.leftWalkAnimator = new Animator(ASSET_MANAGER.getAsset("./Link_main_character_walking_no_sword.png"), 6, 0, 26, 56, 6, 0.2, 15, false, true,true);



		//for animation assignment to make link walk across screen
		this.x = 0;
		this.y = 0;
		this.speed = 200;


		   // link's state variables
		   this.itemsEquipped = 0; // 0 = none, 1 = master sword and shield 
		   this.state = 0; // 0 = idle, 1 = walking, 2 = running, 3 = damaged, 4 = jumping/falling, 5 = attacking
		   this.facing = 0; // 0 = right, 1 = left
		   this.dead = false;


		   //links animations
		   this.animations = [];
		   this.loadAnimations();
	};

	//loads animations for link
	loadAnimations() {
        for (var i = 0; i < 2; i++) { //master
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
        // this.animations[0][0][0] = new Animator(this.spritesheet, 210, 0, 16, 16, 1, 0.33, 14, false, true);
        // this.animations[0][1][0] = new Animator(this.spritesheet, 209, 52, 16, 32, 1, 0.33, 14, false, true);
        // this.animations[0][2][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][3][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][4][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		//no animations without attacking without a weapon, or blocking
		// this.animations[0][5][0] = null;
		// this.animations[0][6][0] = null;


		 // no weapons
        // facing left = 1
        // this.animations[0][0][1] = new Animator(this.spritesheet, 210, 0, 16, 16, 1, 0.33, 14, false, true);
        // this.animations[0][1][1] = new Animator(this.spritesheet, 209, 52, 16, 32, 1, 0.33, 14, false, true);
        // this.animations[0][2][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][3][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[0][4][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		//no animations without attacking without a weapon, or blocking
		// this.animations[0][5][1] = null;
		// this.animations[0][6][1] = null;

		 // mastersword and shield 
        // facing right = 0
        // this.animations[1][0][0] = new Animator(this.spritesheet, 210, 0, 16, 16, 1, 0.33, 14, false, true);
        // this.animations[1][1][0] = new Animator(this.spritesheet, 209, 52, 16, 32, 1, 0.33, 14, false, true);
        // this.animations[1][2][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][3][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][4][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][5][0] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][5][0] = new Animator something
		// this.animations[1][6][0] = new Animator something;

		// mastersword and shield 
        // facing left = 1
        // this.animations[1][0][1] = new Animator(this.spritesheet, 210, 0, 16, 16, 1, 0.33, 14, false, true);
        // this.animations[1][1][1] = new Animator(this.spritesheet, 209, 52, 16, 32, 1, 0.33, 14, false, true);
        // this.animations[1][2][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][3][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][4][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][5][1] = new Animator(this.spritesheet, 209, 122, 16, 32, 1, 0.33, 14, false, true);
		// this.animations[1][5][1] = new Animator something
		// this.animations[1][6][1] = new Animator something;



        // this.deadAnim = new Animator(this.spritesheet, 0, 16, 16, 16, 1, 0.33, 0, false, true);
    };


	update() {
		//for animation assignment to make link walk across screen
		this.x += this.speed * this.game.clockTick;
		//keeps within the screen width
		if( this.x > 1024) {
			this.x =0;
		}
	};

	draw(ctx){
		this.rightWalkAnimator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
	
		this.leftWalkAnimator.drawFrame(this.game.clockTick, ctx, this.x * -1+ 1024,this.y+200, 3);

	};
	
}
}