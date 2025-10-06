document.addEventListener("DOMContentLoaded", () => {

    const qImage = document.getElementById("OCImage")
    const tButtons = document.querySelectorAll(".tImage");
    const visited = new Set();
    let intervalId = null;
    const pauseBtn = document.getElementById("pauseBtn");
    const playBtn = document.getElementById("playBtn");
    const completeBtn = document.getElementById("completeBtn");

    let i = 0;

    //so that the user knows which thumbnail is selected
    const updateActiveThumbnail = () => {
        tButtons.forEach((img, index) => {
        img.classList.toggle("active", index === i);
        });
    };

    const checkCompletion = () => {
        if (visited.size === tButtons.length) {
            document.getElementById("completeBtn").disabled = false;
            
        }
    };

    completeBtn.addEventListener("click", () => {
        window.location.href = "congratulations.html";
    });

    
    const switchImage = () => {
        qImage.src = tButtons[i].src;
        visited.add(i);
        updateActiveThumbnail();
        checkCompletion();
        i = (i + 1) % tButtons.length;
    };

    const startSlideshow = () => {
        if (!intervalId) {
        intervalId = setInterval(switchImage, 3000);
        }
    };

    const stopSlideshow = () => {
        clearInterval(intervalId);
        intervalId = null;
    };


    //click toggle overwrite
    tButtons.forEach((img, index) => {
        img.addEventListener("click", () => {
        i = index;
        switchImage();
        });
    });

    // Button controls
    pauseBtn.addEventListener("click", stopSlideshow);
    playBtn.addEventListener("click", startSlideshow);

    // Initialize the first thumbnail as active and mark it as visited
    visited.add(i);
    updateActiveThumbnail();
    startSlideshow();
});

