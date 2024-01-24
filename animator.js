class Animator {

    //spritesheet to animate, x and y start are where the frame starts.
    //the width and the height of the frame, (frameCount)how many frames to draw, 
    //(frameDuration)how long each frame should be drawn on the screen for. Bigger means slower, smaller means faster.
    //0.5 frame duration means, 2 frames per second.
    // frame paddiing how far apart each frame is from each other on the sprite sheet.
    // reverse if facing left and starting from the last frame. 
    // loop if you want that animation to loop.
    //flipLeft flip  the currentSprite sheet to face left.
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop, flipLeft) {
        //assigns all the parameters into the object.
        Object.assign(this, { spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop, flipLeft });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;

    };

    //tick is how often are game updates
    //ctx is the context
    //x, y where to draw the frame.
    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            //looping animation
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
                //this should never call draw frame on animation that is done
                // produce error.
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        //if we reverse from the sheet, we start from the end.
        if (this.reverse) frame = this.frameCount - frame - 1;

        //if flipLeft is true scale it to the left.
        if(this.flipLeft){
            ctx.save();
            ctx.scale(-1,1);
        }
       
        ctx.drawImage(this.spritesheet,
            //the frame we are currently at.
            this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
            //width and height of the image within the sheet
            this.width, this.height,
            //where to draw the frame
            this.flipLeft ? -x - this.width * scale : x, y,
            //how big to draw the frames.
            this.width * scale,
            this.height * scale);

        ctx.restore(); // Restore the context to the previous state
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(x, y, this.width * scale, this.height * scale);
        }
    };
    //Difference between elapsed and total time is how we are going to determine what frame we are on.
    //Floor method gives 0 based indexing.
    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};