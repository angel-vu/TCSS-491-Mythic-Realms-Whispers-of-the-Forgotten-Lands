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

//sounds
ASSET_MANAGER.queueDownload("./music/Undertale-Waterfall.mp3");


ASSET_MANAGER.queueDownload("./music/link_attack_1.mp3");
ASSET_MANAGER.queueDownload("./music/link_attack_2.mp3");
ASSET_MANAGER.queueDownload("./music/link_damage_1.mp3");
ASSET_MANAGER.queueDownload("./music/heal.mp3");

ASSET_MANAGER.downloadAll(() => {
  ASSET_MANAGER.autoRepeat("./music/Undertale-Waterfall.mp3");
  const popupOverlay = document.getElementById("popup");
  const secondPopupOverlay = document.getElementById("secondPopup");
  const thirdPopupOverlay = document.getElementById("thirdPopup");
  const canvas = document.getElementById("gameWorld");

  const ctx = canvas.getContext("2d");

  var gameStarted = false;

  function hideFirstPopup() {
    // Hide the first popup
    popupOverlay.style.display = "none";
    // Show the second popup
    secondPopupOverlay.style.display = "flex";
  }

  function hideSecondPopup() {
    // Hide the second popup
    secondPopupOverlay.style.display = "none";
    // Show the third popup
    thirdPopupOverlay.style.display = "flex";
  }

  function startGame() {
    // Hide all popups
    popupOverlay.style.display = "none";
    secondPopupOverlay.style.display = "none";
    thirdPopupOverlay.style.display = "none";
    // Show the game canvas
    canvas.style.display = "block";
    // Start the game
    canvas.focus();
    PARAMS.CANVAS_WIDTH = canvas.clientWidth;
    PARAMS.CANVAS_HEIGHT = canvas.clientHeight;

    gameEngine.addEntity(new SceneManager(gameEngine,canvas));

    gameEngine.init(ctx);

    gameEngine.start();
    // canvas.addEventListener("keydown", handleKeyDown);
  }

  // function handleKeyDown(e) {
  //   switch (e.code) {
  //     case "KeyA":
  //       this.left = true;
  //       console.log("left");
  //       break;
  //     case "KeyD":
  //       this.right = true;
  //       console.log("right");
  //       break;
  //     case "KeyW":
  //       this.up = true;
  //       console.log("up");
  //       break;
  //     case "KeyS":
  //       this.down = true;
  //       console.log("down");
  //       break;
  //   }
  // }

  popupOverlay.addEventListener("click", hideFirstPopup);
  secondPopupOverlay.addEventListener("click", hideSecondPopup);
  thirdPopupOverlay.addEventListener("click", startGame);
  ctx.imageSmoothingEnabled = true;
});
