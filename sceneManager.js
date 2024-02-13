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

        this.game.addEntity(new Grass(this.game, 0, 0, levelOne));

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
        //this.drawEntities(ctx);
    };

    // drawEntities(ctx) {
    //     // Loop through all entities and draw them
    //     this.game.entities.forEach(function (entity) {
    //         entity.draw(ctx);
    //     });
    // }
}
