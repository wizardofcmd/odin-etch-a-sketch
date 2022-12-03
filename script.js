const sketchBox = document.querySelector(".sketch-box");
const sketchBoxHeight = sketchBox.clientWidth;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let rainbowEnabled = false;
let blackEnabled = true;


function createNewSquares(numOfSquares) {
    let squareSize = sketchBoxHeight / numOfSquares;

    for (let i = 0; i < numOfSquares; i++) {
        row = document.createElement("div");
        row.classList.add("row");
        sketchBox.appendChild(row);

        for (let j = 0; j < numOfSquares; j++) {
            square = document.createElement("div");
            square.classList.add("canvas-square");
            square.setAttribute(
                'style', `width: ${squareSize}px; height: ${squareSize}px`);
            square.addEventListener("mouseover", setColour);
            square.addEventListener("mousedown", setColour);
            square.addEventListener("dragstart", (event)=>{
                event.preventDefault();
              })
            row.appendChild(square);
        }
    }
}

function setSquares() {
    let userChoice = prompt("Set the number of squares per side. (Max is 100!)")
    try {
        if (isNaN(parseInt(userChoice))) throw "not a number.";
        if (userChoice % 1 != 0) throw "a decimal."
        if (userChoice < 1) throw "too low.";
        if (userChoice > 100) throw "too high.";

        userChoice = parseInt(userChoice);
        tearDownSquares();
        createNewSquares(userChoice);
        
    }
    catch (err) {
        alert("Input is " + err);
    }
}

function tearDownSquares() {
    document.querySelectorAll('.row').forEach(e => e.remove());
}

function resetSketchBox() {
    tearDownSquares();
    createNewSquares(16);
}

function enableRainbow () {
    rainbowEnabled = true;
    blackEnabled = false;
}

function enableBlack () {
    rainbowEnabled = false;
    blackEnabled = true;
}

function setColour(event){
    if (event.type === 'mouseover' && !mouseDown) return;

    console.log(rainbowEnabled);
    console.log(blackEnabled);
    if (rainbowEnabled) {
        red_val = Math.floor(Math.random() * 256)
        green_val = Math.floor(Math.random() * 256)
        blue_val = Math.floor(Math.random() * 256)
        event.target.style.backgroundColor = `rgb(${red_val}, ${green_val}, ${blue_val})`;
    }
    else if (blackEnabled){
        event.target.style.backgroundColor = 'black';
    }
}

createNewSquares(16);