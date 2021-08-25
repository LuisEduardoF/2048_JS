document.onkeydown = function(e) {
    e.preventDefault(); //to prevent scroll of screen
    switch (e.keyCode) {
        case 37:
            slideLeft();
            break;
        case 38:
            slideUp();
            break;
        case 39:
            slideRight();
            break;
        case 40:
            slideDown();
            break;
    }
    if (addNumber() === false) {
        if (isGameOver() === false) {
            alert(`Game Over ! SCORE: ${points}`)
        }
    }
};

function concatNumbers(isMoved) {

    for (let j = isMoved.length - 1; j >= 0; j--) {
        if (isMoved[j] === isMoved[j - 1]) {
            points += isMoved[j - 1] * 2
            isMoved[j] *= 2
            isMoved.splice(j - 1, 1)
            j -= 1
        }
    }
    document.getElementById("score").innerHTML = points
}

function slideUp() {
    for (let i = 0; i < lenBoard; i++) {
        isMoved = []
        for (let j = lenBoard - 1; j >= 0; j--) {
            if (grid[j][i] !== 0)
                isMoved.push(grid[j][i])
        }
        concatNumbers(isMoved)
        for (let j = isMoved.length; j < 4; j++) {
            isMoved.unshift(0)
        }
        for (let k = 0; k < lenBoard; k++) {
            grid[k][i] = isMoved[lenBoard - (k + 1)]
        }
    }
}

function slideDown() {
    for (let i = 0; i < lenBoard; i++) {
        isMoved = []
        for (let j = 0; j < lenBoard; j++) {
            if (grid[j][i] != 0)
                isMoved.push(grid[j][i])
        }
        concatNumbers(isMoved)
        for (let j = isMoved.length; j < 4; j++) {
            isMoved.unshift(0)
        }
        for (let k = 0; k < lenBoard; k++) {
            grid[k][i] = isMoved[k]
        }
    }
}

function slideRight() {
    for (let i = 0; i < lenBoard; i++) {
        isMoved = []
        for (let j = 0; j < lenBoard; j++) {
            if (grid[i][j] != 0)
                isMoved.push(grid[i][j])
        }
        concatNumbers(isMoved)
        for (let j = isMoved.length; j < 4; j++) {
            isMoved.unshift(0)
        }
        for (let k = 0; k < lenBoard; k++) {
            grid[i][k] = isMoved[k]
        }
    }
}

function slideLeft() {
    for (let i = 0; i < lenBoard; i++) {
        isMoved = []
        for (let j = lenBoard - 1; j >= 0; j--) {
            if (grid[i][j] !== 0)
                isMoved.push(grid[i][j])
        }
        concatNumbers(isMoved)
        for (let j = isMoved.length; j < 4; j++) {
            isMoved.unshift(0)
        }
        for (let k = 0; k < lenBoard; k++) {
            grid[i][k] = isMoved[lenBoard - (k + 1)]
        }
    }
}