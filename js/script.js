(function(){

    function VPlayer (vContainer){

    this.video = vContainer.querySelector("video");
    this.playPause = vContainer.querySelector(".play-pause");
    this.stop = vContainer.querySelector(".stop");
    this.progressBar = vContainer.querySelector(".progress");
    this.loadedBar = vContainer.querySelector(".loaded-bar");
    this.playbackBar = vContainer.querySelector(".playback-bar");
    this.currentTime = vContainer.querySelector(".current-time");
    this.totalTime = vContainer.querySelector(".total-time");
    this.volume = vContainer.querySelector(".volume");

    this.assignEaventListner();
    }

    VPlayer.prototype.assignEaventListner = function(){
        this.playPause.onclick = this.play.bind(this);
        this.stop.onclick = this.stopPlay.bind(this);
        this.volume.onclick = this.changeVolume.bind(this);
        this.video.onprogress = this.upLoadingProgress.bind(this);
        this.video.addEventListener("timeupdate", this.upPlayingProgress.bind(this), false);
        this.video.addEventListener("timeupdate", this.upCurrentTime.bind(this), false);
        this.video.ondurationchange = this.setDuration.bind(this);
        this.progressBar.onclick = this.setCurrentPlayback.bind(this);
        this.video.onended = this.resetPlayer.bind(this);
    };

    VPlayer.prototype.upLoadingProgress = function(){

        if(this.video.buffered.length > 0){
            var precendLoaded = (this.video.buffered.end(0) / this.video.duration) * 100;
            this.loadedBar.style.width = precendLoaded + "%";
        }
    };

    VPlayer.prototype.upPlayingProgress = function(){
        var precendPlayed = (this.video.currentTime / this.video.duration) * 100;
        this.playbackBar.style.width = precendPlayed + "%";
    };

    VPlayer.prototype.play = function(e){
        if(this.video.paused){
            this.video.play();
            e.target.classList.remove("dripicons-media-play");
            e.target.classList.add("dripicons-media-pause");
        }else {
            this.video.pause();
            // e.target.classList.remove("dripicons-media-pause");
            // e.target.classList.add("dripicons-media-play");
            this.resetPlayer();
        }
    };

    VPlayer.prototype.stopPlay = function(){
        this.video.pause();
        // this.playPause.classList.remove("dripicons-media-pause");
        // this.playPause.classList.add("dripicons-media-play");
        this.video.currentTime = 0;
        this.resetPlayer();
    };

    VPlayer.prototype.changeVolume = function(e){
        if(this.video.volume === 0){
            this.video.volume = 1;

            e.target.classList.remove("dripicons-volume-off");
            e.target.classList.add("dripicons-volume-medium");

        }else {
            this.video.volume = 0;
            e.target.classList.remove("dripicons-volume-medium");
            e.target.classList.add("dripicons-volume-off");

        }
    };

   VPlayer.prototype.formatTime = function(times){
        var seconds = Math.round(times),
            hours = Math.floor(seconds / 3600),
            remainingSeconds = seconds - hours * 3600,
            minutes = Math.floor(remainingSeconds / 60);
        remainingSeconds -= minutes * 60;

        if(minutes == 0)
            minutes = "00";
        else if(minutes < 10)
            minutes = "0" + minutes;
        if(remainingSeconds == 0)
            remainingSeconds = "00";
        else if(remainingSeconds < 10)
            remainingSeconds = "0" + remainingSeconds;

    return hours + ":" + minutes + ":" + remainingSeconds;
    };

    VPlayer.prototype.setDuration = function(){
        this.totalTime.innerHTML = this.formatTime(this.video.duration);
    };

    VPlayer.prototype.upCurrentTime = function(){
        this.currentTime.innerHTML = this.formatTime(this.video.currentTime);
    };

    VPlayer.prototype.setCurrentPlayback = function(e) {
        var leftPos = this.progressBar.getBoundingClientRect().left,
            clickPos = e.pageX,
            pixelsFromLeft = clickPos - leftPos,
            percent = (pixelsFromLeft / this.progressBar.offsetWidth),
            newTime = this.video.duration * percent;

        this.video.currentTime = newTime;
    };

    VPlayer.prototype.resetPlayer = function() {
        this.playPause.classList.remove("dripicons-media-pause");
        this.playPause.classList.add("dripicons-media-play");
    };

    var vPlayer = new VPlayer(document.querySelector("#player"));
})();