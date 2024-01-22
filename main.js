const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

//Loading Link image walking withoutsword

ASSET_MANAGER.queueDownload("./Link_main_character_walking_no_sword.png");
ASSET_MANAGER.queueDownload("./Link_attack_1.png");
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = true;

	gameEngine.addEntity(new Link(gameEngine));
	gameEngine.init(ctx);

	gameEngine.start();
});