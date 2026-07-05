/* sketch.js */

const container = document.querySelector(".container");
const clearButton = document.querySelector("button");
const DEFAULT_SIZE = 16;

clearButton.addEventListener("click", () => {
    clearGrid(DEFAULT_SIZE);
})

function clearGrid(gridSize) {
    
    for (let i = 0; i < gridSize; i++) {
        const row = document.querySelector(".row");
        document.removeChild(row);
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
            gridBox.addEventListener("mousedown", () => {
                paint = true;
            })
            gridBox.addEventListener("mouseup", () => {
                paint = false;
            })
            gridBox.addEventListener("mouseenter", () => {
                if (paint) {
                    gridBox.style.backgroundColor = "black";
                }
            })
            row.appendChild(gridBox);
        }
    }
}

createGrid(16);