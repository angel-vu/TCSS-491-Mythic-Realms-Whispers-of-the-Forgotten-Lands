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

        this.link = new Link(this.game, 100, 100);


        this.loadLevel(1, 0, 0, false, this.title, this.gameOver, this.gameWin)
    };

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

            this.walls = new LevelOneWalls(this.game, 0, 0, levelOne);
            this.game.addEntity(this.walls);

            this.props = new LevelOneProps(this.game, 0, 0, levelOne);
            this.game.addEntity(this.props);

            this.banshee1 = new Banshee(this.game, 1000, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
            this.game.addEntity(this.banshee1);

            this.banshee2 = new Banshee(this.game, 900, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
            this.game.addEntity(this.banshee2);

            this.goblin1 = new Goblin(this.game, 800, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
            this.game.addEntity(this.goblin1);

            this.goblin2 = new Goblin(this.game, 700, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
            this.game.addEntity(this.goblin2);

            this.goblin3 = new Goblin(this.game, 600, 800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
            this.game.addEntity(this.goblin3);
            
            this.game.addEntity(this.link);
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

        // this.midpointX = PARAMS.CANVAS_WIDTH / 2 - 26 * 3 / 2; // 26 * 3 (3 is Links Scale) this is his idle hurt box width
        // this.midpointY = PARAMS.CANVAS_HEIGHT / 2 - 58 * 3/ 2; // 58 * 3 (3 is Links Scale) this is his idle hurt box height

        this.x = 0;
        this.y = 0;
        
        // Update the camera position based on the character's position and the midpoint
        this.x = this.link.x - this.midpointX;
        this.y = this.link.y - this.midpointY;
    };

    draw(ctx) {
          
    };
};
