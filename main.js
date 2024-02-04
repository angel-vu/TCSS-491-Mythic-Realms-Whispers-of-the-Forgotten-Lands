const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./boss_sprites/Ganondorf.png");
ASSET_MANAGER.queueDownload("./enemies/Akagane.png");


//Loading Link image walking withoutsword

ASSET_MANAGER.queueDownload("./Link_main_character_walking_no_sword.png");
ASSET_MANAGER.queueDownload("./Link_main_character.png");
ASSET_MANAGER.queueDownload("./Link_attack_1.png");
ASSET_MANAGER.queueDownload("./Link_walk_mastersword_shield_right.png");
ASSET_MANAGER.queueDownload("./skeleton.png");
ASSET_MANAGER.queueDownload("./coins.png");
ASSET_MANAGER.queueDownload("./potion.png");
ASSET_MANAGER.queueDownload("./potions.png");
ASSET_MANAGER.queueDownload("./treasure.png");
ASSET_MANAGER.queueDownload("./goblin.png");
ASSET_MANAGER.queueDownload("./banshee.png");
ASSET_MANAGER.queueDownload("./knight.png");
ASSET_MANAGER.queueDownload("./wizard.png");
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = true;

	gameEngine.addEntity(new Ganon(gameEngine));
	gameEngine.addEntity(new Akagane(gameEngine));
	gameEngine.addEntity(new Link(gameEngine,0,0));
	gameEngine.addEntity(new Skeleton(gameEngine));
    gameEngine.addEntity(new Coin(gameEngine));
    gameEngine.addEntity(new HealthPotion(gameEngine));
    gameEngine.addEntity(new InvisiblePotion(gameEngine));
    gameEngine.addEntity(new PowerPotion(gameEngine));
    gameEngine.addEntity(new Treasure(gameEngine));
	gameEngine.addEntity(new Goblin(gameEngine));
    gameEngine.addEntity(new Banshee(gameEngine));
    gameEngine.addEntity(new Knight(gameEngine));
	gameEngine.addEntity(new Wizard(gameEngine));

	gameEngine.init(ctx);

	gameEngine.start();
});