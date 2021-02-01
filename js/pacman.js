'use strict'
const PACMAN = '<img class="pacman" src="imgs/pacman.jpg">';
var gDirectionOfPac;
var gPacman;



function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    var isFoodOnBoard = countFoodOnBoard()
    if (!isFoodOnBoard) {
        gGame.isOn = false;
        gGame.isVictory = true;
        gameOver()
    }
  
    var nextLocation = getNextLocation(ev)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
   
    if (nextCell === WALL) return;
    if (nextCell === FOOD) updateScore(1);
    if (nextCell === CHERRY) updateScore(10);

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return;
        gPacman.isSuper = true;
        setTimeout(function () {
            gPacman.isSuper = false;
            reviveGhosts()
        }, 5000)
    }
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            updateScore(20);
            killGhost(nextLocation);
        } else {
            gameOver();
            renderCell(gPacman.location, EMPTY)
            return;
        }
    }
    
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    
    renderCell(gPacman.location, EMPTY)
    
    gPacman.location = { i: nextLocation.i, j: nextLocation.j }
    
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    
    renderCell(nextLocation, PACMAN)

    var elPacman = document.querySelector('.pacman')
    elPacman.style = gDirectionOfPac;
}


// figure out nextLocation
function getNextLocation(eventKeyboard) {
    var nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            gDirectionOfPac = 'transform:rotate(270deg);'
            break
        case 'ArrowDown':
            nextLocation.i++
            gDirectionOfPac = 'transform:rotate(90deg);'
            break
        case 'ArrowLeft':
            nextLocation.j--
            gDirectionOfPac = 'transform: rotateY(180deg)'
            break
        case 'ArrowRight':
            nextLocation.j++
            gDirectionOfPac = ''
            break
    }
    return nextLocation;
}