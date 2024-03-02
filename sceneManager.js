class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.entityCount = 5;
        this.x = 0;
        this.y = 0;

        this.gameOver = false;
        this.gameWin = false;

        this.midpointX = PARAMS.CANVAS_WIDTH / 2 - 26 * 3 / 2; // 26 * 3 (3 is Links Scale) this is his idle hurt box width
        this.midpointY = PARAMS.CANVAS_HEIGHT / 2 - 58 * 3/ 2; // 58 * 3 (3 is Links Scale) this is his idle hurt box height

        this.title = true;
        this.credits = false;
        this.level = 1;

        this.bansheeCounter = 0; 
        this.bansheeCounterImage = new Image(); 
        this.bansheeCounterImage.src = "./enemies/bansheecount.png";
        this.bansheeCounterImageWidth = 40; 
        this.bansheeCounterImageHeight = 40
        this.link = new Link(this.game, 100, 100);

        this.goblinCounter = 0; 
        this.goblinCounterImage = new Image(); 
        this.goblinCounterImage.src = "./enemies/goblincount.png";
        this.goblinCounterImageWidth = 40; 
        this.goblinCounterImageHeight = 40

        this.skeletonCounter = 0; 
        this.skeletonCounterImage = new Image(); 
        this.skeletonCounterImage.src = "./enemies/skeletoncount.png";
        this.skeletonCounterImageWidth = 30; 
        this.skeletonCounterImageHeight = 40

        this.wizardCounter = 0; 
        this.wizardCounterImage = new Image(); 
        this.wizardCounterImage.src = "./enemies/wizardcount.png";
        this.wizardCounterImageWidth = 30; 
        this.wizardCounterImageHeight = 40

        this.loadLevel(1, 0, 0, false, this.title, this.gameOver, this.gameWin)
       
        // this.inventory = new Inventory(PARAMS.CANVAS_WIDTH - 400, PARAMS.CANVAS_HEIGHT - 100, 600, 200);

        // Add health potion to the inventory
        // const healthPotion = new HealthPotion(this.game, 0, 0); // Create a health potion instance
        // this.inventory.addItem(healthPotion); // Add the health potion to the inventory
    
        // Coordinates and size for the play/pause button
        this.playPauseButtonWidth = 40;
        this.playPauseButtonHeight = 40;
        // X coordinate to position the button on the right side of the screen
        this.playPauseButtonX = PARAMS.CANVAS_WIDTH - this.playPauseButtonWidth - 20; // 20 padding from the right edge
        this.playPauseButtonY = 20;

        this.gamePaused = false;

        canvas.addEventListener('click', this.handlePlayPauseClick.bind(this));        
        
        
    };

    handlePlayPauseClick(event) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

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


    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, x, y, transition, title, gameOver, gameWin) {

    if(level === 1) {
        if(transition) {
            this.game.addEntity(new TransitionScreen(this.game, this.level, x, y, this.title, gameOver, gameWin));
        } else {
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

            this.healthPotion = new HealthPotion(this.game, 500, 700, levelOne);
            this.game.addEntity(this.healthPotion);

            this.healthPotion = new HealthPotion(this.game, 1500, 1500, levelOne);
            this.game.addEntity(this.healthPotion);

            this.healthPotion = new HealthPotion(this.game, 2000, 3000, levelOne);
            this.game.addEntity(this.healthPotion);

            this.healthPotion = new HealthPotion(this.game, 800, 2500, levelOne);
            this.game.addEntity(this.healthPotion);

            this.healthPotion = new HealthPotion(this.game, 0, 3000, levelOne);
            this.game.addEntity(this.healthPotion);

            // this.inventory = new Inventory(this.game, 500, 500, levelOne);
            // this.game.addEntity(this.inventory);

             this.skeleton1 = new Skeleton(this.game, 1000, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
             this.game.addEntity(this.skeleton1);

             this.wizard1 = new Wizard(this.game, 2500, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
             this.game.addEntity(this.wizard1);

            this.banshee1 = new Banshee(this.game, 2000, 2000, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
            this.game.addEntity(this.banshee1);

            this.banshee2 = new Banshee(this.game, 2800, 1500, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
            this.game.addEntity(this.banshee2);

            this.goblin1 = new Goblin(this.game, 100, 2000, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
            this.game.addEntity(this.goblin1);

            this.goblin2 = new Goblin(this.game, 700, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
            this.game.addEntity(this.goblin2);

            this.goblin3 = new Goblin(this.game, 2500, 2000, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
            this.game.addEntity(this.goblin3);

            // this.ganon = new Ganon(this.game, 600, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
            // this.game.addEntity(this.ganon);
            
            this.game.addEntity(this.link);
            this.ground.placeOuterBoundingBoxes();
        }
    }
}

    update() {
        if(this.link.dead) {
            this.gameOver = true;
            this.gameWin = false;
            this.loadLevel(1, 0, 0, true, this.title, this.gameOver, this.gameWin);
        } 

        if(this.entityCount === 0) {
            this.gameOver = false;       
            this.gameWin = true;
            this.loadLevel(1, 0, 0, true, this.title, this.gameOver, this.gameWin);
        }
        
        this.x = 0;
        this.y = 0;
        
        // Update the camera position based on the character's position and the midpoint
        this.x = this.link.x - this.midpointX;
        this.y = this.link.y - this.midpointY;

        if (!this.gamePaused) {
            // add in logic 
        }
        
        // Updating banshee counter
        this.bansheeCounter = this.game.entities.filter(entity => entity instanceof Banshee).length;
        // Updating goblin counter
        this.goblinCounter = this.game.entities.filter(entity => entity instanceof Goblin).length;
        // Updating skeletotn counter
        this.skeletonCounter = this.game.entities.filter(entity => entity instanceof Skeleton).length;
        // Updating wizard counter
        this.wizardCounter = this.game.entities.filter(entity => entity instanceof Wizard).length;
        if (this.bansheeCounter === 0 && this.goblinCounter === 0 && this.skeletonCounter === 0 && this.wizardCounter === 0) {
            this.gameOver = false;       
            this.gameWin = true;
            this.loadLevel(1, 0, 0, true, this.title, this.gameOver, this.gameWin);
        }
    };

    draw(ctx) {
        // ctx.fillStyle = this.inventory.color;
        // ctx.fillRect(this.inventory.x, this.inventory.y, this.inventory.w, this.inventory.h);
        // Draw the play/pause button
        ctx.fillStyle = '#ccc';
        ctx.fillRect(this.playPauseButtonX, this.playPauseButtonY, this.playPauseButtonWidth, this.playPauseButtonHeight);

        // Text for the button (using pause/play symbols)
        ctx.fillStyle = '#000';
        ctx.font = '24px Arial';

        // Calculate the position to center the symbol horizontally and vertically
        const symbol = this.gamePaused ? '\u25B6' : '\u23F8'; // Unicode for play and pause symbols
        const textX = this.playPauseButtonX + (this.playPauseButtonWidth - ctx.measureText(symbol).width) / 2; // calculates the x-coordinate for drawing the symbol to horizontally center it within the button
        const textY = this.playPauseButtonY + (this.playPauseButtonHeight + 20) / 2; // calculates the y-coordinate for drawing the symbol to vertically center it within the button

        ctx.fillText(symbol, textX, textY);

        ctx.drawImage(this.bansheeCounterImage, 10, 10, this.bansheeCounterImageWidth, this.bansheeCounterImageHeight);
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(`: ${this.bansheeCounter}`, 60, 35); 

        ctx.drawImage(this.goblinCounterImage, 90, 10, this.goblinCounterImageWidth, this.goblinCounterImageHeight);
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(`: ${this.goblinCounter}`, 140, 35); 

        ctx.drawImage(this.skeletonCounterImage, 170, 10, this.skeletonCounterImageWidth, this.skeletonCounterImageHeight);
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(`: ${this.skeletonCounter}`, 210, 35); 

        ctx.drawImage(this.wizardCounterImage, 240, 10, this.wizardCounterImageWidth, this.wizardCounterImageHeight);
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText(`: ${this.wizardCounter}`, 280, 35);
    };
};
