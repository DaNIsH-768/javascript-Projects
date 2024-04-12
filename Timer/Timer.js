class Timer {
    constructor(duration, playBtn, pauseBtn, callbacks) {
        this.duration = duration;
        this.playBtn = playBtn;
        this.pauseBtn = pauseBtn;

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.playBtn.addEventListener("click", this.play);
        this.pauseBtn.addEventListener("click", this.pause);
    }

    play = () => {
        if (this.onStart) {
            this.onStart();
        }

        this.tick();
        this.timerId = setInterval(this.tick, 1000);
    }

    pause = () => {
        clearInterval(this.timerId);
    }

    tick = () => {
        if (this.duration.value <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete()
            }

        } else {
            this.duration.value = parseFloat(this.duration.value) - 1;
            if (this.onTick) {
                this.onTick();
            }
        }
    }
}
