class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.gameOver = false;

        this.title = true;
        this.credits = false;
        this.level = null;

        // the -100 offsets Link to be in the middle shawty
        this.midpointX = PARAMS.CANVAS_WIDTH / 2 - 100;
        this.midpointY = PARAMS.CANVAS_HEIGHT / 2 - 100;
        
        this.link = new Link(this.game, 0, 0);
        this.game.addEntity(this.link);
        
        this.ground = new Grass(this.game, 0, 0, levelOne);
        this.game.addEntity(this.ground);

        // this.wall = new Wall(this.game, 0, 0, levelOne);
        // this.game.addEntity(this.wall);

        
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    update() {
        this.midpointX = PARAMS.CANVAS_WIDTH / 2;
        this.midpointY = PARAMS.CANVAS_HEIGHT / 2;

        this.x = 0;
        this.y = 0;
        
        // Update the camera position based on the character's position and the midpoint
        this.x = this.link.x - this.midpointX;
        this.y = this.link.y - this.midpointY;
    };

    draw(ctx) {
          
    };
};
