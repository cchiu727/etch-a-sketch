let COLOR = 'black';

function setColor(color) {
    COLOR = color;
}

class ColorTool {
    constructor(container, color) {
        this.container = container;
        this.container.id = `${color}-tool`;
        this.container.classList.add('tool');
        this.container.style.backgroundColor = color;
        this.color = color;
        this.container.addEventListener('click', () => {
            console.log(`Changed color tool to ${this.color}`);
            setColor(this.color);
        });
    }
}

class EraseTool {
    constructor(container) {
        this.container = container;
        this.container.id = 'erase-tool';
        this.container.classList.add('tool');
        this.container.textContent = 'Eraser';
        this.container.addEventListener('click', () => {
            console.log(`Changed to eraser tool`);
            setColor('white');
        });
    }
}

class ClearTool {
    constructor(container) {
        this.container = container;
        this.container.id = 'clear-tool';
        this.container.classList.add('tool');
        this.container.textContent = 'Clear';
        this.container.addEventListener('click', () => {
            console.log('Cleared grid');
            grid.clearGrid();
        })
    }
}

class Toolbar {
    constructor(container) {
        this.container = container;
        this.colorList = ['black', 'red', 'blue', 'green', 'yellow', 'purple'];
        this.populateTools();
    }

    populateTools() {
        for (const color of this.colorList) {
            const colorTool = new ColorTool(document.createElement('button'), color);
            this.container.appendChild(colorTool.container);
        }

        const eraseTool = new EraseTool(document.createElement('button'));
        this.container.appendChild(eraseTool.container);
        eraseTool.container 

        const clearTool = new ClearTool(document.createElement('button'));
        this.container.appendChild(clearTool.container);
    }
}

class Row {
    constructor(container, id) {
        this.container = container;
        this.id = id;
    }
}

class Square {
    constructor(container, row, id) {
        this.container = container;
        this.row = row;
        this.id = id;

        this.container.addEventListener('mouseover', () => {
            this.setColor(COLOR);
        });
    }

    setColor(color) {
        this.container.style.backgroundColor = color;
        this.container.style.border = `1px solid ${color}`;
    }
}

class Grid {
    constructor(container, width=16, height=16) {
        this.container = container;
        this.width = width;
        this.height = height;
        this.drawGrid();
    }

    drawGrid() {
        for (let i = 0; i < this.height; i++) {
            console.log(`Created row ${i}`);
            const row = new Row(document.createElement('div'), i);
            row.container.id = `row-${row.id}`;
            row.container.classList.add('row');
            this.container.appendChild(row.container);
            for (let j = 0; j < this.width; j++) {
                console.log(`Created row ${i} square ${j}`);
                const square = new Square(document.createElement('div'), i, j);
                square.container.classList.add('square');
                square.container.id = `square-${square.id}`;
                row.container.appendChild(square.container);
            }
        }
    }

    clearGrid() {
        let squares = this.container.querySelectorAll('#grid-container .square');

        squares.forEach(function(square) {
            square.style.backgroundColor = 'initial';
            square.style.border = '1px solid rgb(231, 231, 231)';
        });
    }
}

let toolbar = new Toolbar(document.getElementById('toolbar-container'));

let grid = new Grid(document.getElementById('grid-container'));

const gridSizeForm = document.getElementById('grid-size-form-container');

gridSizeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let width = document.getElementById('width-field').value;
    let height = document.getElementById('height-field').value;
    document.getElementById('grid-container').innerHTML = '';
    grid = new Grid(document.getElementById('grid-container'), width, height);
});