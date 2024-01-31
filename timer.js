// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class Timer {
    constructor() {
        this.gameTime = 0; //how much game time has passed
        this.maxStep = 0.05; // 1/20th of a second, how much we are allowed to update per tick. 
        this.lastTimestamp = 0; // the last time we updated the last tick
    };

    tick() {
        const current = Date.now(); //returns the current time in milliseconds.
        const delta = (current - this.lastTimestamp) / 1000; //difference between our current time and the last tick, in seconds.
        this.lastTimestamp = current;

        const gameDelta = Math.min(delta, this.maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
    };
};
