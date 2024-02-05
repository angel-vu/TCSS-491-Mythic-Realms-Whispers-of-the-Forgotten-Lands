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
           
           
            const path = this.downloadQueue[i];
            console.log(path);

            //extension of the file
            const ext = path.substring(path.length - 3);

            switch (ext) {
                case 'jpg':
                case 'png':
                     //image tag that will appear in document which will trigger download.
                    const img = new Image();
                    //listeners set up before actual download to be ready.
                    //listeners usually take functions, using lambda syntax for 
                    // anonymous functions, as we had to use that to refer to this object or it would've refered to function defined in header.
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
                    break;
                case 'wav':
                case 'mp3':
                case 'mp4':
                    //creating an audo tag
                    const aud = new Audio();
                    //loaddata tag means the first part of the music file has buffered enough for us to play it.
                    aud.addEventListener("loadeddata", ()=> {
                        console.log("Loaded " + this.src);
                        this.successCount++;
                        if (this.isDone()) callback();
                    });

                    aud.addEventListener("error", () => {
                        console.log("Error loading " + this.src);
                        this.errorCount++;
                        if (this.isDone()) callback();
                    });
                    //when audio has ended pause the audio and reset the current time of the audio to the beginning in order to
                    // replay it.
                    aud.addEventListener("ended", () => {
                        aud.pause();
                        aud.currentTime = 0;
                    });

                    aud.src = path;
                    aud.load();

                    this.cache[path] = aud;
                    break;
            }
        }
     
    };
    //function that plays an audio file.
    //Useful when interrupting a sound affect and we want to start it up again, like Mario Jump and we prepare for next jump.
    playAsset(path) {
        let audio = this.cache[path];
        audio.currentTime = 0;
        audio.play();
    };
    //
    muteAudio(mute) {
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.muted = mute;
            }
        }
    };
    adjustVolume(volume) {
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.volume = volume;
            }
        }
    };
    //
    autoRepeat(path) {
        var aud = this.cache[path];
        aud.addEventListener("ended", function () {
            aud.play();
        });
    };
    //Stopping Old background music before we start another one, like when we move int another level.
    //Call this function before we we play new back gorund music.
    pauseBackgroundMusic() {
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.pause();
                asset.currentTime = 0;
            }
        }
    };

    getAsset(path) {
        return this.cache[path];
    };
};


