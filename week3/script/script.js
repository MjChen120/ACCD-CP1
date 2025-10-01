let cStage = document.getElementById("colorStage")
let cButton = document.getElementById("colorButton")

const qImage = document.getElementById("OCImage")
const qButton = document.getElementById("imageToogle")
const tButton = document.getElementById("tImage")
let changeColor = () => {
let rComp = Math.floor(Math.random() * 256)
let gComp = Math.floor(Math.random() * 256)
let bComp = Math.floor(Math.random() * 256)

cStage.style.backgroundColor = "rgb(" + rComp + "," + gComp + ","+ bComp + ")"
}

let toggleImage = () => {
    if(qImage.src.includes("OC1")){ 
        qImage.src = "images/OC2.png"
    }else{
        qImage.src = "images/OC1.png"
    }
}

setInterval(changeColor, 1000)

tButton.addEventListener("click", toggleImage)
qButton.addEventListener("click", toggleImage)
cButton.addEventListener("click", changeColor)
window.addEventListener("load", changeColor)