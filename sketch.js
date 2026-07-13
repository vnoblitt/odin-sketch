/* sketch.js */

const container = document.querySelector(".container");
const clearButton = document.getElementById("clear");
const resizeButton = document.getElementById("resize");
const rainbowButton = document.getElementById("rainbow");

const CONTAINER_SIZE = 642;
const DEFAULT_BOXES = 16;
const DEFAULT_PIXEL_SIZE = resizePixel(DEFAULT_BOXES);

let boxes = DEFAULT_BOXES;
let pixelSize = DEFAULT_PIXEL_SIZE;
let color = "black";
let oldColor = "white";
let rainbow = false;

document.addEventListener('dragstart', (event) => {
    event.preventDefault();
});

rainbowButton.addEventListener("click", () => {
    rainbow = !rainbow;
    getRainbow();
})

clearButton.addEventListener("click", () => {
    rainbow = false;
    color = "black";
    oldColor = "white";
    clearGrid(boxes);
})

resizeButton.addEventListener("click", () => {
    let newSize = prompt("New size: ");
    
    if (newSize > 100) {
        newSize = resizeReprompt();
    }
    let oldSize = boxes;
    boxes = newSize;
    pixelSize = resizePixel(boxes);
    clearGrid(boxes, oldSize);
})

function getRainbow() {
    let rainbowColor = Math.floor(Math.random()*(16**6)).toString(16);
    return `#${rainbowColor}`;
}
function resizeReprompt() {
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

function clearGrid(gridSize) {
    
    container.innerHTML = ""
    
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
                gridBox.classList.add('painted');
                if (rainbow) {
                    color = getRainbow();
                }
                gridBox.style.backgroundColor = color;
            })
            document.addEventListener("pointerup", () => {
                paint = false;
            })
            gridBox.addEventListener("pointerenter", () => {
                oldColor = gridBox.style.backgroundColor;
                if (rainbow) {
                    color = getRainbow();
                }
                gridBox.style.backgroundColor = color;
                if (paint) {
                    gridBox.classList.add('painted');
                }
                // Hover effect resets color on leaving    
                gridBox.addEventListener("pointerleave", () => {
                    if(!paint) { 
                        gridBox.style.backgroundColor = oldColor;
                    }
                })
            })
            gridBox.addEventListener("pointerleave", () => {
                if (!paint && !gridBox.classList.contains('painted')) {
                    gridBox.style.backgroundColor = oldColor;
                }
            })

            row.appendChild(gridBox);
        }
    }
}

createGrid(boxes);