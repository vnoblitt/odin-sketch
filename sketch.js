/* sketch.js */

const container = document.querySelector(".container");
const clearButton = document.getElementById("clear");
const resizeButton = document.getElementById("resize");

const CONTAINER_SIZE = 642;
const DEFAULT_BOXES = 16;
const DEFAULT_PIXEL_SIZE = resizePixel(DEFAULT_BOXES);

let boxes = DEFAULT_BOXES;
let pixelSize = DEFAULT_PIXEL_SIZE;

clearButton.addEventListener("click", () => {
    clearGrid(boxes, boxes);
})

resizeButton.addEventListener("click", () => {
    let newSize = prompt("New size: ");
    
    if (newSize > 100) {
        console.log(newSize);
        newSize = resizeReprompt();
    }
    console.log(newSize);
    let oldSize = boxes;
    boxes = newSize;
    pixelSize = resizePixel(boxes);
    clearGrid(boxes, oldSize);
})

function resizeReprompt(){
    let newSize = prompt("Please enter a size less than 100: ")
    if (newSize > 100) {
        return resizeReprompt();
    } else {
        return newSize;
    }
}

function resizePixel(boxes) {
    let str = `${(container.offsetWidth - 2) / boxes}px`;
    return str;
}

function clearGrid(gridSize, oldSize) {
    
    for (let i = 0; i < oldSize; i++) {
        const row = document.querySelector(".row");
        container.removeChild(row);
    }
    
    createGrid(gridSize)
}

function createGrid(gridSize) {
    let paint = false;
    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
        for (let j = 0; j < gridSize; j++) {
            const gridBox = document.createElement('div');
            gridBox.classList.add('gridbox');
            gridBox.style.width = pixelSize;
            gridBox.style.height =  pixelSize;
            gridBox.addEventListener("pointerdown", () => {
                paint = true;
                gridBox.style.backgroundColor = "black";
            })
            gridBox.addEventListener("pointerup", () => {
                paint = false;
            })
            gridBox.addEventListener("pointerenter", () => {
                if (paint) {
                    gridBox.style.backgroundColor = "black";
                }
            })
            row.appendChild(gridBox);
        }
    }
}

createGrid(boxes);