class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        //objects stored in memory as "cache"
        this.cache = [];
        this.downloadQueue = [];
    };

    //Adds file path to download to our array of files.
    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    //Returns true or false if the downloads of successful files and failed files are equal
    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    //downlaods all of our files from the queue
    //This is called within main in order to perform call back when done downloading.

    downloadAll(callback) {
        //When we are downloading 0 things, use the callback function
        // used for simulation for research by professor.
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (let i = 0; i < this.downloadQueue.length; i++) {
            //image tag that will appear in document which will trigger download.

            const img = new Image();

            const path = this.downloadQueue[i];
            console.log(path);

            //listeners set up before actual download to be ready.
            //listeners usually take functions, using lambda syntax for 
            // anonymous functions.
            img.addEventListener("load", () => {
                console.log("Loaded " + img.src);
                this.successCount++;
                if (this.isDone()) callback();
            });

            img.addEventListener("error", () => {
                console.log("Error loading " + img.src);
                this.errorCount++;
                if (this.isDone()) callback();
            });

            //src is the source of the image to download
            img.src = path;
            //adding image wihtin the cache.
            this.cache[path] = img;
        }
    };

    getAsset(path) {
        return this.cache[path];
    };
};


