document.addEventListener("DOMContentLoaded", () => {
    const qImage = document.getElementById("OCImage")
    const tButtons = document.querySelectorAll(".tImage");

    let i = 0;

    //so that the user knows which thumbnail is selected
    const updateActiveThumbnail = () => {
        tButtons.forEach((img, index) => {
        img.classList.toggle("active", index === i);
        });
    };

    const switchImage = () => {
        qImage.src = tButtons[i].src;
        updateActiveThumbnail();
        i = (i + 1) % tButtons.length;
    };
    //click toggle overwrite
    tButtons.forEach((img, index) => {
        img.addEventListener("click", () => {
        i = index;
        switchImage();
        });
    });

    // Initialize the first thumbnail as active and mark it as visited
    updateActiveThumbnail();
    intervalId = setInterval(switchImage, 3000);
});

