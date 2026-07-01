const board = document.querySelector('.chess-board');
let side = "black"; // Or "white"

if (side === "black") {
    board.classList.add('black-pov');
} else {
    board.classList.remove('black-pov');
}

const setup = {
    "A8": "br", "B8": "bn", "C8": "bb", "D8": "bq", "E8": "bk", "F8": "bb", "G8": "bn", "H8": "br",
    "A7": "bp", "B7": "bp", "C7": "bp", "D7": "bp", "E7": "bp", "F7": "bp", "G7": "bp", "H7": "bp",
    "A2": "wp", "B2": "wp", "C2": "wp", "D2": "wp", "E2": "wp", "F2": "wp", "G2": "wp", "H2": "wp",
    "A1": "wr", "B1": "wn", "C1": "wb", "D1": "wq", "E1": "wk", "F1": "wb", "G1": "wn", "H1": "wr"
};

function renderBoard() {
    for (let squareId in setup) {
        const piece = setup[squareId];
        const element = document.getElementById(squareId);
        
        if (element) {
            element.innerHTML = `<img src="./pieces/classic/${piece}.png" alt="${piece}">`;
        }
    }
}



// moce pieces from one square to another
function movePiece(fromSquare, toSquare) {
    const fromElement = document.getElementById(fromSquare);
    const toElement = document.getElementById(toSquare);
    toElement.innerHTML = fromElement.innerHTML;
    fromElement.innerHTML = '';
}


document.querySelectorAll('.chess-board .row div').forEach(square => {
    square.addEventListener('click', () => {
        const squareId = square.id;
        console.log(`Square clicked: ${squareId}`);
    })
});

renderBoard();

movePiece("E2", "E4");
