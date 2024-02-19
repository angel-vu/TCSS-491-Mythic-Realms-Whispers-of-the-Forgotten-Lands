const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/Link_main_character_walking_no_sword.png");
ASSET_MANAGER.queueDownload("./sprites/Link_main_character.png");
ASSET_MANAGER.queueDownload("./sprites/Link_attack_1.png");
ASSET_MANAGER.queueDownload("./sprites/Link_walk_mastersword_shield_right.png");
ASSET_MANAGER.queueDownload("./sprites/projectile.png");
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
ASSET_MANAGER.queueDownload("./sprites/stairs.png");
ASSET_MANAGER.queueDownload("./sprites/wall.png");
ASSET_MANAGER.queueDownload("./sprites/trees.png");
ASSET_MANAGER.queueDownload("./sprites/props.png");
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");

	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = true;
	PARAMS.CANVAS_WIDTH = canvas.clientWidth;
	PARAMS.CANVAS_HEIGHT = canvas.clientHeight;
	gameEngine.addEntity(new SceneManager(gameEngine));

	gameEngine.init(ctx);

	
	
	gameEngine.start();
});