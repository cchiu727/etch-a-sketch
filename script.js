let COLOR = 'black';

function setColor(color) {
    COLOR = color;
}

class ColorTool {
    constructor(container, color) {
        this.container = container;
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
        this.container.addEventListener('click', () => {
            console.log(`Changed to eraser tool`);
            setColor('white');
        });
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
            colorTool.container.id = `${color}-tool`;
            colorTool.container.classList.add('tool');
            colorTool.container.style.backgroundColor = color;
            this.container.appendChild(colorTool.container);
        }

        const eraseTool = new EraseTool(document.createElement('button'));
        eraseTool.container.id = 'erase-tool';
        eraseTool.container.classList.add('tool');
        eraseTool.container.textContent = 'Eraser';
        this.container.appendChild(eraseTool.container);
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
}

let toolbar = new Toolbar(document.getElementById('toolbar-container'));

let grid = new Grid(document.getElementById('grid-container'));

