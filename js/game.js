'use strict'
const WALL = '💎'
const FOOD = '.'
const SUPER_FOOD = '&#128170';
const CHERRY = '🍒'
const EMPTY = ' ';


var gBoard;
var gCherryInterval;
var gGame = {
    score: 0,
    isOn: false,
    isVictory: false,
}


function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gCherryInterval = setInterval(putCherryOnBoard, 15000);
    gGame.isOn = true
}

function restart() {
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gNextGhostId = 1;
    gGame.score = 0;
    updateScore(0)
    gGame.isVictory = false;
    gGame.isOn = true;
    modalDisplay();
    init()
}

function buildBoard() {
    var SIZE = 12;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][1] = SUPER_FOOD;
    board[SIZE - 2][1] = SUPER_FOOD;
    board[1][SIZE - 2] = SUPER_FOOD;
    board[SIZE - 2][SIZE - 2] = SUPER_FOOD;
    return board;
}



// update model and dom
function updateScore(diff) {
    gGame.score += diff
    var elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score
}

function countFoodOnBoard() {
    var countFood = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j]
            if (currCell === FOOD) {
                countFood++;
            }
        }
    }
    return countFood;
}

function putCherryOnBoard() {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j] === EMPTY) {
                var coord = { i, j }
                emptyCells.push(coord)
            }
        }
    }
    var rndIdx = getRandomIntInclusive(0, emptyCells.length - 1)
    var cherryLocation = emptyCells[rndIdx]
    gBoard[cherryLocation.i][cherryLocation.j] = CHERRY;
    renderCell(cherryLocation, CHERRY)
}


// TODO
function gameOver() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    gCherryInterval = null;
    gIntervalGhosts = null;
    var loseGameMsg = 'Oops, You lost!\n Want to try again?';
    var winGameMsg = 'You did it! well done\n you have collected all the food\n want to try and do it again?';
    modalDisplay()
    var elMoContent = document.querySelector('.modal-content p');
    elMoContent.innerText = gGame.isVictory ? winGameMsg : loseGameMsg;
}

function modalDisplay() {
    var elModal = document.querySelector('.bg-modal');
    elModal.style.display = gGame.isOn ? 'none' : 'flex'
}

function leaveGame() {
    gBoard = buildBoard()
    gNextGhostId = 1;
    createGhosts(gBoard);
    renderCell(gPacman.location, EMPTY)
    var elModal = document.querySelector('.bg-modal');
    elModal.style.display = 'none';
}
