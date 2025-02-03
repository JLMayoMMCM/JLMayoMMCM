const video = document.getElementById("video");
const asciiFrame = document.getElementById("ascii");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const restartButton = document.getElementById("restart");

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 70;
canvas.height = 50;

const asciiChars = "█▓▒░ ";

function videoToASCII() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frameData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let asciiArt = "";

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            const r = frameData.data[index];
            const g = frameData.data[index + 1];
            const b = frameData.data[index + 2];
            const avg = (r + g + b) / 3;

            const charIndex = Math.floor((avg / 255) * (asciiChars.length - 1));
            asciiArt += asciiChars[charIndex];
        }
        asciiArt += "\n";
    }
    
    asciiFrame.textContent = asciiArt;
    requestAnimationFrame(videoToASCII);
}

video.addEventListener("play", () => {
    requestAnimationFrame(videoToASCII);
});

playButton.addEventListener("click", () => {
    video.play();
});

pauseButton.addEventListener("click", () => {
    video.pause();
});

restartButton.addEventListener("click", () => {
    video.currentTime = 0;
    video.pause();
});
