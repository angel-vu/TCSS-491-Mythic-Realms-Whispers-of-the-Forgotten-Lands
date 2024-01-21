class Link{
	constructor(game) {
		this.game = game;
		this.animator = new Animator(ASSET_MANAGER.getAsset("./Link_main_character_walking_no_sword.png"), 6, 0, 26, 56, 6, 0.2, 15, false, true);

		//for animation assignment to make link walk across screen
		this.x = 0;
		this.y = 0;
		this.speed = 200;
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
		this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y,3);
	};
	
}