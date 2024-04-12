const playBtn = document.getElementById("play")
const pauseBtn = document.getElementById("pause")
const duration = document.getElementById("duration");

const timer = new Timer(duration, playBtn, pauseBtn, {
    onStart() {
        console.log("Timer Started");
    },
    onTick() {
        console.log("Time Ticking");
    },
    onComplete() {
        console.log("Time completed");
    }
})
