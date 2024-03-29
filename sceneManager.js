class SceneManager {
  constructor(game, canvas) {
    this.game = game;
    this.canvas = canvas;
    this.game.camera = this;
    this.totalEnemies = 0;
    this.x = 0;
    this.y = 0;

    this.gameOver = false;
    this.gameWin = false;

    this.timeDuration = 300;
    this.elapsedTime = this.timeDuration;

    this.startTimer();

    this.midpointX = PARAMS.CANVAS_WIDTH / 2 - (26 * 3) / 2; // 26 * 3 (3 is Links Scale) this is his idle hurt box width
    this.midpointY = PARAMS.CANVAS_HEIGHT / 2 - (58 * 3) / 2; // 58 * 3 (3 is Links Scale) this is his idle hurt box height

    this.title = true;
    this.credits = false;
    this.level = 1;
    this.Ganon1Spawn = false;
    this.Ganon2Spawn = false;

    this.bansheeCounter = 0;
    this.bansheeCounterImage = new Image();
    this.bansheeCounterImage.src = "./enemies/bansheecount.png";
    this.bansheeCounterImageWidth = 40;
    this.bansheeCounterImageHeight = 40;

    this.goblinCounter = 0;
    this.goblinCounterImage = new Image();
    this.goblinCounterImage.src = "./enemies/goblincount.png";
    this.goblinCounterImageWidth = 40;
    this.goblinCounterImageHeight = 40;

    this.skeletonCounter = 0;
    this.skeletonCounterImage = new Image();
    this.skeletonCounterImage.src = "./enemies/skeletoncount.png";
    this.skeletonCounterImageWidth = 30;
    this.skeletonCounterImageHeight = 40;

    this.wizardCounter = 0;
    this.wizardCounterImage = new Image();
    this.wizardCounterImage.src = "./enemies/wizardcount.png";
    this.wizardCounterImageWidth = 30;
    this.wizardCounterImageHeight = 40;

    this.link = new Link(this.game, 100, 100);

    this.loadLevel(1, 0, 0, false, this.title, this.gameOver, this.gameWin);

    // this.inventory = new Inventory(PARAMS.CANVAS_WIDTH - 400, PARAMS.CANVAS_HEIGHT - 100, 600, 200);

    // Add health potion to the inventory
    // const healthPotion = new HealthPotion(this.game, 0, 0); // Create a health potion instance
    // this.inventory.addItem(healthPotion); // Add the health potion to the inventory

    // Coordinates and size for the play/pause button
    this.playPauseButtonWidth = 40;
    this.playPauseButtonHeight = 40;
    // X coordinate to position the button on the right side of the screen
    this.playPauseButtonX =
      PARAMS.CANVAS_WIDTH - this.playPauseButtonWidth - 20; // 20 padding from the right edge
    this.playPauseButtonY = 20;
    this.gamePaused = false;
    this.canvas.addEventListener("click", this.handlePlayPauseClick.bind(this));

    // Coordinates and size for the options button
    this.optionsButtonWidth = 80;
    this.optionsButtonHeight = 40;
    // X coordinate to position the options button to the left of the play/pause button
    this.optionsButtonX = this.playPauseButtonX - this.optionsButtonWidth - 10; // 10 pixels spacing between buttons
    this.optionsButtonY = 20;
    this.canvas.addEventListener("click", this.handleOptionsClick.bind(this));
  }

  handlePlayPauseClick(event) {
    const mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

    // Check if the click is within the boundaries of the play/pause button
    if (
      mouseX >= this.playPauseButtonX &&
      mouseX <= this.playPauseButtonX + this.playPauseButtonWidth &&
      mouseY >= this.playPauseButtonY &&
      mouseY <= this.playPauseButtonY + this.playPauseButtonHeight
    ) {
      // Toggle the gamePaused flag
      this.gamePaused = !this.gamePaused;
      console.log("pause clicked!");
    }
  }

  handleOptionsClick(event) {
    const mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

    // Check if the click is within the boundaries of the options button
    if (
      mouseX >= this.optionsButtonX &&
      mouseX <= this.optionsButtonX + this.optionsButtonWidth &&
      mouseY >= this.optionsButtonY &&
      mouseY <= this.optionsButtonY + this.optionsButtonHeight
    ) {
      // Handle options button click action here
      console.log("Options clicked!");
      this.showDropdownMenu = !this.showDropdownMenu;
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (!this.gamePaused) { 
        this.elapsedTime--; 
        if (this.elapsedTime <= 0) {
          this.stopTimer();
          console.log("Time's up!");
        }
      }
    }, 1000);
  }

  stopTimer() {
      clearInterval(this.timerInterval);
  }


    // Stop the timer
    stopTimer() {
      clearInterval(this.timerInterval);
    }

    // Reset the timer
    resetTimer() {
      this.elapsedTime = this.timerDuration;
    }

  clearEntities() {
    this.game.entities.forEach(function (entity) {
      entity.removeFromWorld = true;
    });
  }

  loadLevel(level, x, y, transition, title, gameOver, gameWin) {
    if (level === 1) {
      if (transition) {
        this.game.addEntity(
          new TransitionScreen(
            this.game,
            this.level,
            x,
            y,
            this.title,
            gameOver,
            gameWin
          )
        );
      } else {
        //play music
        ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playAsset("./music/Undertale-Waterfall.mp3");
        this.concrete = new Concrete(this.game, 0, 0, levelOne);
        this.game.addEntity(this.concrete);

        this.stairs = new Stairs(this.game, 0, 0, levelOne);
        this.game.addEntity(this.stairs);

        this.ground = new Grass(this.game, 0, 0, levelOne);
        this.game.addEntity(this.ground);

        this.walls = new LevelOneWalls(this.game, 0, 0, levelOne);
        this.game.addEntity(this.walls);

        this.props = new LevelOneProps(this.game, 0, 0, levelOne);
        this.game.addEntity(this.props);

        this.healthPotion = new HealthPotion(this.game, 500, 700);
        this.game.addEntity(this.healthPotion);

        this.healthPotion = new HealthPotion(this.game, 1500, 1500);
        this.game.addEntity(this.healthPotion);

        this.healthPotion = new HealthPotion(this.game, 2000, 3000);
        this.game.addEntity(this.healthPotion);

        this.healthPotion = new HealthPotion(this.game, 800, 2500);
        this.game.addEntity(this.healthPotion);

        this.healthPotion = new HealthPotion(this.game, 0, 3000);
        this.game.addEntity(this.healthPotion);

        this.fire = new Fire(this.game, 0, 300);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 10, 600);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 500, 400);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 800, 600);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 950, 300);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 2500, 100);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 2800, 300);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 2600, 800);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 2800, 2000);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 1500, 800);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 250, 1385);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 1000, 1200);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 2000, 1500);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 1000, 1500);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 1200, 1800);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 1400, 1600);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 1100, 2000);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 0, 1000);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 20, 2200);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 0, 2500);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 100, 3000);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 2000, 300);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 2500, 3000);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 2000, 2500);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 2200, 2800);
        this.game.addEntity(this.fire);

        // fire by statue
        this.fire = new Fire(this.game, 250, 1385);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 575, 1385);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 250, 1500);
        this.game.addEntity(this.fire);

        this.fire = new Fire(this.game, 575, 1500);
        this.game.addEntity(this.fire);

        this.lightning = new Lightning(this.game, 300, 300);
        this.game.addEntity(this.lightning);
        
        // this.shieldPotion = new ShieldPotion(this.game, 300, 300);
        // this.game.addEntity(this.shieldPotion);

        // this.inventory = new Inventory(this.game, 500, 500, levelOne);
        // this.game.addEntity(this.inventory);

        this.skeleton1 = new Skeleton(this.game, 1000, 1000, [
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: 0, y: 0 },
        ]);
        this.game.addEntity(this.skeleton1);

        this.skeleton2 = new Skeleton(this.game, 2000, 600, [
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: 0, y: 0 },
        ]);
        this.game.addEntity(this.skeleton2);

        this.wizard1 = new Wizard(this.game, 2000, 800, [
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: 0, y: 0 },
        ]);
        this.game.addEntity(this.wizard1);

        this.wizard2 = new Wizard(this.game, 500, 200, [
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: 0, y: 0 },
        ]);
        this.game.addEntity(this.wizard2);

        this.banshee1 = new Banshee(this.game, 500, 300, [
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: 0, y: 0 },
        ]);
        this.game.addEntity(this.banshee1);

        this.banshee2 = new Banshee(this.game, 300, 400, [
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: 0, y: 0 },
        ]);
        this.game.addEntity(this.banshee2);

        this.banshee3 = new Banshee(this.game, 1500, 1500, [
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: 0, y: 0 },
        ]);
        this.game.addEntity(this.banshee3);

        this.goblin1 = new Goblin(this.game, 250, 250, [
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: 0, y: 0 }],
          3);
        this.game.addEntity(this.goblin1);

        this.goblin2 = new Goblin(this.game, 700, 800, [
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: 0, y: 0 }],
          3);
        this.game.addEntity(this.goblin2);

        this.goblin3 = new Goblin(this.game, 700, 500, [
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: 0, y: 0 }],
         3);
        this.game.addEntity(this.goblin3);

        this.goblin4 = new Goblin(this.game, 800, 1000, [
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: 0, y: 0 }],
          3);
        this.game.addEntity(this.goblin4);

        this.goblin5 = new Goblin(this.game, 300, 0, [
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: randomInt(800), y: randomInt(800) },
          { x: 0, y: 0 }],
          3);
        this.game.addEntity(this.goblin5);

        this.game.addEntity(this.link);
        // this.shieldBubble = new ShieldBubble(this.game);
        // this.game.addEntity(this.shieldBubble);
        this.ground.placeOuterBoundingBoxes();
      }
    }
  }

  //checks to see if the document mute button was checked or if the volume slider has changed.
  //And if the debug statement has been checked
  updateAudio() {
    var mute = document.getElementById("mute").checked;
    var volume = document.getElementById("volume").value;
    PARAMS.DEBUG = document.getElementById("debug").checked;
    ASSET_MANAGER.muteAudio(mute);
    ASSET_MANAGER.adjustVolume(volume);
  }
  update() {
    this.updateAudio();

    if (this.link.dead) {
      this.gameOver = true;
      this.gameWin = false;
      this.loadLevel(1, 0, 0, true, this.title, this.gameOver, this.gameWin);
    }

    this.x = 0;
    this.y = 0;

    // Update the camera position based on the character's position and the midpoint
    this.x = this.link.x - this.midpointX;
    this.y = this.link.y - this.midpointY;

    if (!this.gamePaused) {
      // add in logic
      //ASSET_MANAGER.playAsset("./music/Undertale-Waterfall.mp3");
    }

    // Count total number of enemies
    this.totalEnemies = this.game.entities.filter(
      (entity) =>
        entity instanceof Banshee ||
        entity instanceof Goblin ||
        entity instanceof Skeleton ||
        entity instanceof Wizard ||
        entity instanceof Ganon
    ).length;

    if (this.totalEnemies == 0) {
      //if (GanonSpawn <= 2) {
        if (this.level == 1 && !this.Ganon1Spawn) {
          ASSET_MANAGER.pauseBackgroundMusic();
          ASSET_MANAGER.playAsset("./music/Final-Boss_ExcisionxDionTimmer.mp3");
          // Spawn Ganon with phase 0
          //console.log("1st phase spawn");
          this.ganon1 = new Ganon(
            this.game, 
            2000,
            2500,
            [
              { x: randomInt(800), y: randomInt(800) },
              { x: randomInt(800), y: randomInt(800) },
              { x: randomInt(800), y: randomInt(800) },
              { x: 0, y: 0 },
            ],
            0
          );
          this.game.addEntity(this.ganon1);
          this.Ganon1Spawn = true;
          //console.log("Link transitioned to the 1st phase of Ganon's spawn location");
          this.link.x = this.ganon1.x - 300; 
          this.link.y = this.ganon1.y;
          
        } else if (this.level == 1 && !this.Ganon2Spawn && this.Ganon1Spawn) {
          // Spawn Ganon with phase 1
         //console.log("2nd phase Ganon appeared");
          this.ganon2 = new Ganon(
            this.game,
            550,
            1375,
            [
              { x: randomInt(800), y: randomInt(800) },
              { x: randomInt(800), y: randomInt(800) },
              { x: randomInt(800), y: randomInt(800) },
              { x: 0, y: 0 },
            ],
            1
          );
          this.game.addEntity(this.ganon2);
          this.Ganon2Spawn = true;
          //console.log("Link transitioned to the 2nd phase of Ganon's spawn location");
          this.link.x = this.ganon2.x - 300; 
          this.link.y = this.ganon2.y;
        }
        // Check for Ganon's death and transition to the next level or phase
        if (this.ganon2 && this.ganon2.dead && this.Ganon1Spawn && this.Ganon2Spawn) {

          this.stopTimer();
          //ASSET_MANAGER.pauseBackgroundMusic();
          this.gameWin = true;
          this.loadLevel(
            1,
            0,
            0,
            true,
            this.title,
            this.gameOver,
            this.gameWin
          );
          // ASSET_MANAGER.pauseBackgroundMusic();
          //ASSET_MANAGER.playAsset("./music/End-Credits_Ocarina-of-Time.mp3");
        }
      //}
    }

    // Updating counters for each enemy type
    this.bansheeCounter = this.game.entities.filter(
      (entity) => entity instanceof Banshee
    ).length;
    this.goblinCounter = this.game.entities.filter(
      (entity) => entity instanceof Goblin
    ).length;
    this.skeletonCounter = this.game.entities.filter(
      (entity) => entity instanceof Skeleton
    ).length;
    this.wizardCounter = this.game.entities.filter(
      (entity) => entity instanceof Wizard
    ).length;

    // Check if the timer has reached the duration
    if (this.elapsedTime <= 0) {
      this.stopTimer();
     // console.log("Time's up!");
      this.gameOver = true;
      this.loadLevel(1, 0, 0, true, this.title, this.gameOver, this.gameWin);
    }
  }

  draw(ctx) {
    // ctx.fillStyle = this.inventory.color;
    // ctx.fillRect(this.inventory.x, this.inventory.y, this.inventory.w, this.inventory.h);

    // play/pause button
    ctx.fillStyle = "#ccc";
    ctx.fillRect(
      this.playPauseButtonX,
      this.playPauseButtonY,
      this.playPauseButtonWidth,
      this.playPauseButtonHeight
    );
    // Add border around the button
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      this.playPauseButtonX, 
      this.playPauseButtonY, 
      this.playPauseButtonWidth, 
      this.playPauseButtonHeight
      );
    // Text for the button (using pause/play symbols)
    ctx.fillStyle = "#000";
    ctx.font = "24px Arial";
    // Calculate the position to center the symbol horizontally and vertically
    const symbol = this.gamePaused ? "\u25B6" : "\u23F8"; // Unicode for play and pause symbols
    const textX =
      this.playPauseButtonX +
      (this.playPauseButtonWidth - ctx.measureText(symbol).width) / 2; // calculates the x-coordinate for drawing the symbol to horizontally center it within the button
    const textY = this.playPauseButtonY + (this.playPauseButtonHeight + 20) / 2; // calculates the y-coordinate for drawing the symbol to vertically center it within the button
    ctx.fillText(symbol, textX, textY);

    // option button
    ctx.fillStyle = "#ccc";
    ctx.fillRect(
      this.optionsButtonX,
      this.optionsButtonY,
      this.optionsButtonWidth,
      this.optionsButtonHeight
    );
    // Add border around the button
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      this.optionsButtonX, 
      this.optionsButtonY, 
      this.optionsButtonWidth, 
      this.optionsButtonHeight);
    ctx.fillStyle = "#000";
    ctx.font = "18px Arial";
    ctx.fillText("Options", this.optionsButtonX + 10, this.optionsButtonY + 30);


    if (this.showDropdownMenu) {
      // Set styles for dropdown menu items
      ctx.font = "12px Arial";
  
      // Define the position and size of the dropdown menu
      const menuX = this.optionsButtonX;
      const menuY = this.optionsButtonY + this.optionsButtonHeight + 10;
      const menuItemHeight = 30;
      const menuItemWidth = 80;
      const menuItemSpacing = 0;
  
      // Define the menu items
      const menuItems = ["Play Again", "Instructions", "Credits"];
  
      // Loop through menu items and draw them in a table-like format
      for (let i = 0; i < menuItems.length; i++) {
          const menuItemX = menuX;
          const menuItemY = menuY + (menuItemHeight + menuItemSpacing) * i;
  
          // Draw menu item border
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 1;
          ctx.strokeRect(menuItemX, menuItemY, menuItemWidth, menuItemHeight);
  
          // Draw menu item background
          ctx.fillStyle = "#ccc";
          ctx.fillRect(menuItemX, menuItemY, menuItemWidth, menuItemHeight);
  
          // Measure text width to center it
          const textWidth = ctx.measureText(menuItems[i]).width;
  
          // Draw menu item text
          ctx.fillStyle = "#000";
          ctx.fillText(menuItems[i], menuItemX + (menuItemWidth - textWidth) / 2, menuItemY + menuItemHeight / 2 + 5);
  
          // Add event listener for click event to each menu item
          this.canvas.addEventListener("click", (event) => {
              const mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
              const mouseY = event.clientY - this.canvas.getBoundingClientRect().top;
  
              // Check if the click occurred within the boundaries of the current menu item
              if (
                  mouseX >= menuItemX &&
                  mouseX <= menuItemX + menuItemWidth &&
                  mouseY >= menuItemY &&
                  mouseY <= menuItemY + menuItemHeight
              ) {
                  //console.log("Clicked on menu item:", menuItems[i]);
                  switch (menuItems[i]) {
                      case "Play Again":  
                          //console.log("play again clicked!");
                          window.location.reload();
                          break;
                      case "Instructions":
                         // console.log("instructions clicked!");
                          const instructionsWindow = window.open("", "", "width=500,height=400");
                          instructionsWindow.document.write("<h1>Game Instructions</h1>");
                          instructionsWindow.document.write("<p>Link must kill all enemies to reach his way to the boss enemy, Ganon where his presence threatens the Mystic Realms. To complete the quest, kill all enemies before the timer or before they kill you! <br> Keyboard Movements: <br> Up = W, <br> Down = S, <br> Left = A, <br> Right = D <br> Run = Hold Shift <br> Attack = Mouse left click <br> Hint: Pick up potions long the way to restore health!</p>");
                          break;
                      case "Credits":
                          //console.log("credits clicked!");
                          const creditsWindow = window.open("", "_blank", "width=500,height=400");
                          creditsWindow.document.write("<h1>Credits</h1>");
                          creditsWindow.document.write("<p>TCSS 491: Game Simulation and Design (Winter 2024) <br> Team: Black 1 <br> Members: David Hoang, Avreen Kaur, Jay Phommakot, Angel Vu</p>");
                          break;
                      default:
                          break;
                  }
                  this.showDropdownMenu = false;
              }
          });
      }
  }
  
    // Banshee counter image
    ctx.drawImage(
      this.bansheeCounterImage,
      10,
      10,
      this.bansheeCounterImageWidth,
      this.bansheeCounterImageHeight
    );
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(`: ${this.bansheeCounter}`, 60, 35);

    // Goblin counter image
    ctx.drawImage(
      this.goblinCounterImage,
      90,
      10,
      this.goblinCounterImageWidth,
      this.goblinCounterImageHeight
    );
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(`: ${this.goblinCounter}`, 140, 35);

    // Skeleton counter image
    ctx.drawImage(
      this.skeletonCounterImage,
      170,
      10,
      this.skeletonCounterImageWidth,
      this.skeletonCounterImageHeight
    );
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(`: ${this.skeletonCounter}`, 210, 35);

    // Wizard counter image
    ctx.drawImage(
      this.wizardCounterImage,
      240,
      10,
      this.wizardCounterImageWidth,
      this.wizardCounterImageHeight
    );
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(`: ${this.wizardCounter}`, 280, 35);
    // Draw the timer on the screen
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(`Timer: ${this.formatTime(this.elapsedTime)}`, 750, 50);

    if (this.gameOver || this.gameWin) {
      ctx.fillStyle = "#ccc";
      ctx.fillRect(PARAMS.CANVAS_WIDTH / 2 - 100, PARAMS.CANVAS_HEIGHT / 2 + 50, 200, 50);
      // Add border around the button
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.strokeRect(PARAMS.CANVAS_WIDTH / 2 - 100, PARAMS.CANVAS_HEIGHT / 2 + 50, 200, 50);
      ctx.fillStyle = "#000";
      ctx.font = "24px Arial";
      ctx.fillText("Play Again", PARAMS.CANVAS_WIDTH / 2 - 60, PARAMS.CANVAS_HEIGHT / 2 + 85);

      this.canvas.addEventListener("click", (event) => {
        const mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

        const buttonX = PARAMS.CANVAS_WIDTH / 2 - 100; 
        const buttonY = PARAMS.CANVAS_HEIGHT / 2 + 50; 
        const buttonWidth = 200; 
        const buttonHeight = 50; 
        if (
            mouseX >= buttonX &&
            mouseX <= buttonX + buttonWidth &&
            mouseY >= buttonY &&
            mouseY <= buttonY + buttonHeight
        ) {
            console.log("play again clicked");
            window.location.reload();
        }
    });
  }
  }

  // Helper function to format time (convert seconds to MM:SS format)
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }
}

// 3-6 update 