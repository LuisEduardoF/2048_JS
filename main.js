let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
let Allchallenges = {
    1: ["- Formar uma linha com mesmo número;", 200], // Testado OK
    2: ["- Formar uma linha com números diferentes;", 200], // Testado OK
    3: ["- Formar uma diagonal com números iguais;", 250], // Testado OK
    4: ["- Formar uma diagonal com números diferentes;", 250], // Testado OK
    5: ["- Ter número iguais em cada ponta do tabuleiro;", 250], // Testado OK
    6: ["- Sobreviver após ter tido o tabuleiro completo;", 50], // Testado OK
    7: ["- Ter metade do tabuleiro completo e metade vazia;", 200], // Testado OK
    8: ["- Ter em uma linha/coluna 2-0-4-8;", 100], // Testado OK
    9: ["- Ter 3 1024 em campo;", 75], // Testado OK
    10: ["2048", 300] // Testado OK
}
points = 0
lenBoard = 4
challenges = []
allDone = false

function getRandom(arr, n) {
    let keys = Object.keys(arr),
        len = keys.length,
        result = new Array(n);
    while (n--) {
        x = random(keys)
        console.log(x)
        result[n] = x
        keys = keys.filter(function(value, index, arr) {
            return value != x;
        });
        console.log(keys)
    }
    return result;
}

function catchChallenge(num) {
    switch (num) {
        case 1:
            return check1();
        case 2:
            return check2();
        case 3:
            return check3();
        case 4:
            return check4();
        case 5:
            return check5();
        case 6:
            return check6();
        case 7:
            return check7();
        case 8:
            return check8();
        case 9:
            return check9();
        case 10:
            return check10();
    }

}

function verifyChallenges() {
    if (challenges.length === 0 && allDone === false) {
        allDone = true
        document.getElementById(`Somatorio`).innerHTML = document.getElementById(`Somatorio`).innerHTML + " ✔️"
        document.getElementById(`Somatorio`).style.color = "rgb(22, 198, 12)"
        document.getElementById(`S`).style.color = "white"
        document.getElementById(`cSP`).style.backgroundColor = "green"
    }
    for (let i = 0; i < challenges.length; i++) {
        if (catchChallenge(Number(challenges[i]))) {
            challengeDone(i)
            console.log(Allchallenges[challenges[i]], "Deu certo")
            challenges = challenges.filter(function(value, index, arr) {
                return value != challenges[i];
            });
            console.log(challenges)
        }
    }
}

function addNumber() {
    verifyChallenges()
    let options = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] == 0) {
                options.push({
                    x: i,
                    y: j
                });
            }
        }
    }
    if (options.length > 0) {
        let spot = random(options);
        let coin = random([false, true])
        grid[spot.x][spot.y] = (coin === true ? 2 : 4);
        redraw()
        noFill()
        strokeWeight(2.5);
        stroke("black");
        rect(sep + spot.y * (len + sep), sep + spot.x * (len + sep), len, len, 10, 10)
        strokeWeight(1);
        stroke("black");
        verifyChallenges()
        console.log(grid)
        return true
    } else {
        return false
    }
}

function isGameOver() {
    let mvVer = 0;
    let mvHor = 0;
    for (let i = 0; i < lenBoard; i++) {
        for (let j = 0; j < lenBoard; j++) {
            if (i > 0 && i < lenBoard - 1) {
                if (grid[i][j] === grid[i - 1][j] || grid[i][j] === grid[i + 1][j]) {
                    mvVer += 1;
                }
            }
            if (j > 0 && j < lenBoard - 1) {
                if (grid[i][j] === grid[i][j + 1] || grid[i][j] === grid[i][j - 1]) {
                    mvHor += 1;
                }
            }
        }
    }
    return mvVer > 0 || mvHor > 0
}

function check1() {
    for (let i = 0; i < lenBoard; i++) {
        if (grid[i][0] !== 0 && grid[i][1] !== 0 && grid[i][2] !== 0 && grid[i][3] !== 0) {
            if (grid[i][0] === grid[i][1] && grid[i][0] === grid[i][2] && grid[i][0] === grid[i][3]) {
                return true;
            }
        }
    }
    return false;
}

function check2() {
    for (let i = 0; i < lenBoard; i++) {
        if (grid[i][0] !== 0 && grid[i][1] !== 0 && grid[i][2] !== 0 && grid[i][3] !== 0) {
            for (let k = 0; k < lenBoard; k++) {
                for (let j = k + 1; j < lenBoard; j++) {
                    if (grid[i][k] === grid[i][j]) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }
}

function check3() {
    if (grid[0][0] !== 0 && grid[1][1] !== 0 && grid[2][2] !== 0 && grid[3][3] !== 0) {
        if (grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2] && grid[0][0] === grid[3][3]) {
            return true;
        }
    }
    if (grid[0][3] !== 0 && grid[1][2] !== 0 && grid[2][1] !== 0 && grid[3][0] !== 0) {
        if (grid[0][3] === grid[1][2] && grid[0][3] === grid[2][1] && grid[0][3] === grid[3][0]) {
            return true;
        }
    }
    return false;
}

function check4() {
    if (grid[0][0] !== 0 && grid[1][1] !== 0 && grid[2][2] !== 0 && grid[3][3] !== 0) {
        for (let i = 0; i < lenBoard; i++) {
            for (let j = i + 1; j < lenBoard; j++) {
                if (grid[i][i] === grid[j][j]) {
                    return false;
                }
            }
        }
        return true;
    }
    console.log(grid[0][3] !== 0, grid[0][3], grid[1][2] !== 0, grid[1][2], grid[2][1] !== 0, grid[2][1], grid[3][0] !== 0, grid[3][0])
    if (grid[0][3] !== 0 && grid[1][2] !== 0 && grid[2][1] !== 0 && grid[3][0] !== 0) {
        for (let i = 0; i < lenBoard; i++) {
            for (let j = i + 1; j < lenBoard; j++) {
                if (grid[i][lenBoard - (i + 1)] === grid[j][lenBoard - (j + 1)]) {
                    return false
                }
            }
        }
        return true;
    }
    return false;
}

function check5() {
    if (grid[0][0] !== 0 && grid[3][0] !== 0 && grid[3][3] !== 0 && grid[0][3] !== 0) {
        if (grid[0][0] === grid[3][0] && grid[0][0] === grid[3][3] && grid[0][0] === grid[0][3]) {
            return true;
        }
    }
    return false;
}

function check6() {
    let options = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] == 0) {
                options.push({
                    x: i,
                    y: j
                });
            }
        }
    }
    if (options.length === 0) {
        if (isGameOver()) {
            return true;
        }
    }
    return false;
}

function check7() {
    if (grid[0][0] === grid[1][0] && grid[0][0] === grid[2][0] && grid[0][0] === grid[3][0] && grid[0][0] === grid[0][1] && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][1] && grid[0][0] === grid[3][1] && grid[0][0] === 0) {
        if (grid[0][2] !== 0 && grid[1][2] !== 0 && grid[2][2] !== 0 && grid[3][2] !== 0 && grid[0][3] !== 0 && grid[1][3] !== 0 && grid[2][3] !== 0 && grid[3][3] !== 0) {
            return true;
        }
    }
    if (grid[0][0] === grid[0][1] && grid[0][0] === grid[0][2] && grid[0][0] === grid[0][3] && grid[0][0] === grid[1][0] && grid[0][0] === grid[1][1] && grid[0][0] === grid[1][2] && grid[0][0] === grid[1][3] && grid[0][0] === 0) {
        if (grid[2][0] !== 0 && grid[2][1] !== 0 && grid[2][2] !== 0 && grid[2][3] !== 0 && grid[3][0] !== 0 && grid[3][1] !== 0 && grid[3][2] !== 0 && grid[3][3] !== 0) {
            return true;
        }
    }
    if (grid[0][2] === grid[1][2] && grid[0][2] === grid[2][2] && grid[0][2] === grid[3][2] && grid[0][2] === grid[0][3] && grid[0][2] === grid[1][3] && grid[0][2] === grid[2][3] && grid[0][2] === grid[3][3] && grid[0][2] === 0) {
        if (grid[0][0] !== 0 && grid[1][0] !== 0 && grid[2][0] !== 0 && grid[3][0] !== 0 && grid[0][1] !== 0 && grid[1][1] !== 0 && grid[2][1] !== 0 && grid[3][1] !== 0) {
            return true;
        }
    }
    if (grid[2][0] === grid[2][1] && grid[2][0] === grid[2][2] && grid[2][0] === grid[2][3] && grid[2][0] === grid[3][0] && grid[2][0] === grid[3][1] && grid[2][0] === grid[3][2] && grid[2][0] === grid[3][3] && grid[2][0] === 0) {
        if (grid[0][0] !== 0 && grid[0][1] !== 0 && grid[0][2] !== 0 && grid[0][3] !== 0 && grid[1][0] !== 0 && grid[1][1] !== 0 && grid[1][2] !== 0 && grid[1][3] !== 0) {
            return true;
        }
    }
    return false;
}

function check8() {
    for (let i = 0; i < lenBoard; i++) {
        if (grid[i][0] === 2 && grid[i][1] === 0 && grid[i][2] === 4 && grid[i][3] === 8) {
            return true;
        }
        if (grid[i][3] === 2 && grid[i][2] === 0 && grid[i][1] === 4 && grid[i][0] === 8) {
            return true;
        }
        if (grid[0][i] === 2 && grid[1][i] === 0 && grid[2][i] === 4 && grid[3][i] === 8) {
            return true;
        }
        if (grid[3][i] === 2 && grid[2][i] === 0 && grid[1][i] === 4 && grid[0][i] === 8) {
            return true;
        }
    }
    return false;
}

function check9() {
    let cont = 0;
    for (let i = 0; i < lenBoard; i++) {
        for (let j = 0; j < lenBoard; j++) {
            if (grid[i][j] === 1024) {
                cont += 1
            }
        }
    }
    if (cont === 3) {
        return true;
    } else {
        return false;
    }
}

function check10() {
    for (let i = 0; i < lenBoard; i++) {
        for (let j = 0; j < lenBoard; j++) {
            if (grid[i][j] === 2048) {
                return true;
            }
        }
    }
    return false;
}