class Timer {
    constructor(duration, playBtn, pauseBtn) {
        this.duration = duration;
        this.playBtn = playBtn;
        this.pauseBtn = pauseBtn;

        this.playBtn.addEventListener("click", this.play);
        this.pauseBtn.addEventListener("click", this.pause);
    }

    play = () => {
        this.tick();
        this.timerId = setInterval(this.tick, 1000);
    }

    pause = () => {
        clearInterval(this.timerId);
    }

    tick = () => {
        if (this.duration.value <= 0) {
            this.pause();
        } else {
            this.duration.value -= 1;
        }
    }
}

const playBtn = document.getElementById("play")
const pauseBtn = document.getElementById("pause")
const duration = document.getElementById("duration");

const timer = new Timer(duration, playBtn, pauseBtn)
