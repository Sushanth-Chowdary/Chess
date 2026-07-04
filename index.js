const board = document.querySelector('.chess-board');
let side = "white"; 

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
            element.innerHTML = `<img src="./pieces/classic/${piece}.png" alt="${piece}" draggable="true" style="width:100%; height:100%; cursor:grab;">`;
        }
    }
}
function movePiece(fromSquare, toSquare) {
    const fromElement = document.getElementById(fromSquare);
    const toElement = document.getElementById(toSquare);
    
    toElement.innerHTML = fromElement.innerHTML;
    fromElement.innerHTML = '';
}
function getCoords(squareId) {
    const files = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8 };
    return {
        file: files[squareId[0]],          
        rank: parseInt(squareId[1], 10)    
    };
}
function isValidPawnMove(fromSquare, toSquare, pieceColor) {
    const from = getCoords(fromSquare);
    const to = getCoords(toSquare);
    
    const direction = pieceColor === 'w' ? 1 : -1;
    const startRank = pieceColor === 'w' ? 2 : 7;

    const fileDiff = to.file - from.file;
    const rankDiff = to.rank - from.rank;

    const targetElement = document.getElementById(toSquare);
    const isTargetOccupied = targetElement && targetElement.querySelector('img') !== null;
    if (fileDiff === 0) {
        if (rankDiff === direction && !isTargetOccupied) {
            return true;
        }
        if (rankDiff === 2 * direction && from.rank === startRank && !isTargetOccupied) {
            const midRank = from.rank + direction;
            const filesInversed = {1:'A', 2:'B', 3:'C', 4:'D', 5:'E', 6:'F', 7:'G', 8:'H'};
            const midSquareId = `${filesInversed[from.file]}${midRank}`;
            const isMidOccupied = document.getElementById(midSquareId).querySelector('img') !== null;
            
            if (!isMidOccupied) return true;
        }
    }
    if (Math.abs(fileDiff) === 1 && rankDiff === direction) {
        if (isTargetOccupied) {
            const targetImg = targetElement.querySelector('img').getAttribute('alt');
            if (targetImg[0] !== pieceColor) {
                return true; 
            }
        }
    }

    return false; 
}

board.addEventListener('dragstart', (event) => {
    if (event.target.tagName === 'IMG') {
        const square = event.target.closest('.row > div');
        event.dataTransfer.setData('text/plain', square.id);
    } else {
        event.preventDefault(); 
    }
});

board.addEventListener('dragover', (event) => {
    event.preventDefault(); 
});

board.addEventListener('drop', (event) => {
    event.preventDefault();
    
    const fromSquareId = event.dataTransfer.getData('text/plain');
    const targetSquare = event.target.closest('.row > div');
    if (!targetSquare) return;

    const toSquareId = targetSquare.id;

    if (fromSquareId && toSquareId && fromSquareId !== toSquareId) {
        const fromElement = document.getElementById(fromSquareId);
        const pieceImg = fromElement.querySelector('img');
        
        if (pieceImg) {
            const pieceType = pieceImg.getAttribute('alt'); 
            const pieceColor = pieceType[0]; 
            const isPawn = pieceType[1] === 'p';
            if (isPawn) {
                if (!isValidPawnMove(fromSquareId, toSquareId, pieceColor)) {
                    console.log("Illegal Pawn Move!");
                    return; 
                }
            }
        }
        movePiece(fromSquareId, toSquareId);
    }
});
renderBoard();