const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/Link_main_character_walking_no_sword.png");
ASSET_MANAGER.queueDownload("./sprites/Link_main_character.png");
ASSET_MANAGER.queueDownload("./sprites/Link_attack_1.png");
ASSET_MANAGER.queueDownload("./sprites/Link_walk_mastersword_shield_right.png");
ASSET_MANAGER.queueDownload("./sprites/coins.png");
ASSET_MANAGER.queueDownload("./sprites/potion.png");
ASSET_MANAGER.queueDownload("./sprites/potions.png");
ASSET_MANAGER.queueDownload("./sprites/treasure.png");
ASSET_MANAGER.queueDownload("./sprites/grass.png");
ASSET_MANAGER.queueDownload("./enemies/skeleton.png");
ASSET_MANAGER.queueDownload("./enemies/Akagane.png");
ASSET_MANAGER.queueDownload("./enemies/goblin.png");
ASSET_MANAGER.queueDownload("./enemies/banshee.png");
ASSET_MANAGER.queueDownload("./enemies/knight.png");
ASSET_MANAGER.queueDownload("./enemies/wizard.png");
ASSET_MANAGER.queueDownload("./boss_sprites/Ganondorf.png");
ASSET_MANAGER.queueDownload("./sprites/grass.png");
ASSET_MANAGER.queueDownload("./sprites/wall.png");
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");

	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = true;

	
	// gameEngine.addEntity(new Skeleton(gameEngine));
    // gameEngine.addEntity(new Coin(gameEngine));
    // gameEngine.addEntity(new HealthPotion(gameEngine));
    // gameEngine.addEntity(new InvisiblePotion(gameEngine));
    // gameEngine.addEntity(new PowerPotion(gameEngine));
    // gameEngine.addEntity(new Treasure(gameEngine));
	// gameEngine.addEntity(new Goblin(gameEngine));
    gameEngine.addEntity(new Banshee(gameEngine, 1000, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]));
    // gameEngine.addEntity(new Knight(gameEngine));
	gameEngine.addEntity(new Wizard(gameEngine, 1000, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]));


	gameEngine.addEntity(new Ganon(gameEngine, 300, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]));
	// gameEngine.addEntity(new Akagane(gameEngine));
	//// gameEngine.addEntity(new Link(gameEngine,0,0));
	// gameEngine.addEntity(new Skeleton(gameEngine));
    // gameEngine.addEntity(new Coin(gameEngine));
    // gameEngine.addEntity(new HealthPotion(gameEngine));
    // gameEngine.addEntity(new InvisiblePotion(gameEngine));
    // gameEngine.addEntity(new PowerPotion(gameEngine));
    // gameEngine.addEntity(new Treasure(gameEngine));
	// gameEngine.addEntity(new Goblin(gameEngine));
    //gameEngine.addEntity(new Banshee(gameEngine, 1000, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]));
    // gameEngine.addEntity(new Knight(gameEngine));

	// gameEngine.addEntity(new Ganon(gameEngine, 0, 0));
	// gameEngine.addEntity(new Akagane(gameEngine));
	gameEngine.addEntity(new Link(gameEngine,0,0));
	gameEngine.addEntity(new Skeleton(gameEngine, 1000, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]));
    

	gameEngine.addEntity(new SceneManager(gameEngine));


	gameEngine.init(ctx);

	PARAMS.CANVAS_WIDTH = canvas.clientWidth
	PARAMS.CANVAS_HEIGHT = canvas.clientHeight;
	
	//gameEngine.addEntity(new SceneManager(gameEngine));

	gameEngine.start();
});