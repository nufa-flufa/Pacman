'use strict'
const GHOST = `<img src="imgs/ghost1.jpg">`

var gGhosts;
var gDeadGhosts = [];
var gIntervalGhosts;
var gNextGhostId = 1

// TODO
function createGhost(board) {
    var ghost = {
        location: {
            i: 2,
            j: 4
        },
        id: gNextGhostId++,
        currCellContent: FOOD
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

// TODO: loop through ghosts
function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        moveGhost(currGhost)
    }
}
function moveGhost(ghost) {
    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j]

    if (nextCellContent === WALL) return;
    if (nextCellContent === GHOST) return;
    if (nextCellContent === SUPER_FOOD) return;
    if (nextCellContent === CHERRY) return;
    if (nextCellContent === PACMAN) {
        if (gPacman.isSuper) {
            return;
        } else gameOver();
    }

    var ghostHTML = getGhostHTML(ghost.id)
    // TODO: update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContent)
    // TODO: Move the ghost
    ghost.location = { i: nextLocation.i, j: nextLocation.j }
    ghost.currCellContent = nextCellContent
    // TODO: update the model
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // TODO: update the DOM
    renderCell(nextLocation, ghostHTML)
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(id) {
    if (gPacman.isSuper) return `<img src="imgs/Vulnerable-ghost.jpg">`;
    else return `<img src="imgs/ghost${id}.jpg">`;
}

function killGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
            var deadGhost = gGhosts.splice(i, 1)[0];
            gDeadGhosts.push(deadGhost);
        }
    }
}

function reviveGhosts() {
    if (gDeadGhosts) {
        for (var i = 0; i < gDeadGhosts.length; i++) {
            var currGhost = gDeadGhosts[i]
            currGhost.location.i = 2;
            currGhost.location.j = 4;
            gGhosts.push(currGhost)

        }
    }
    gDeadGhosts = [];
}