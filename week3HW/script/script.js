const qImage = document.getElementById("OCImage")
    const tButtons = document.querySelectorAll(".tImage");

    let toggleImage = (event) => {
        qImage.src = event.target.src
    }

    tButtons.forEach(button => {
        button.addEventListener("click", toggleImage)
    });