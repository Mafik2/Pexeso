let emotess = ["😂", "🥰", "🤔", "🙂", "😍", "😎", "🤩", "😃"]
let previousCellIndex = null;
let grid = document.createElement("div");
let canPlay = false;
let card = [];
let wrapper = document.getElementById("board");
grid.classList.add("grid");
wrapper.appendChild(grid);
let correctincorrect = document.createElement("div");
correctincorrect.classList.add("info-panel");
wrapper.appendChild(correctincorrect);


for (let i = 0; i < 16; i += 2) {
    let emotes = randomemote();
    for (let j = 0; j < 2; j++) {
        let currentCellIndex = i + j;
        let cellElement = document.createElement("div");
        cellElement.innerText = emotes;
        cellElement.classList.add("cell");
        cellElement.style.width = (100 / 4) + "%"
        let cell = {
            emotes: emotes,
            element: cellElement,
            hasMatch: false
        }
        cellElement.classList.add("hide");
        if (currentCellIndex > 2) {
            let previousRandIndex = randomInt(0, i);

            card[currentCellIndex] = card[previousRandIndex];
            card[previousRandIndex] = cell;

        } else {
            card[currentCellIndex] = cell;
        }
    }
}

function gamemassage(message, type) {
    correctincorrect.innerHTML = `<span class="${type}">${message}</span>`;
}

for (let i = 0; i < card.length; i++) {
    card[i].element.addEventListener("click", () => {
        cellClick(i)
    });
    grid.appendChild(card[i].element);
    canPlay = true;
}

function randomemote() {
    let emotesIndex = randomInt(0, emotess.length - 1);
    let emotes = emotess[emotesIndex];
    emotess.splice(emotesIndex, 1);
    return emotes;
}

function randomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function end() {
    let gameIsOver = true;
    for (let i = 0; i < card.length; i++) {
        gameIsOver = card[i].hasMatch === false ? false : gameIsOver;
    }
    return gameIsOver;
}

function cellClick(cellIndex) {
    let cellElement = card[cellIndex].element;

    if (canPlay && cellElement.classList.contains("hide")) {
        canPlay = false;
        cellElement.classList.remove("hide");

        if (previousCellIndex === null) {

            previousCellIndex = cellIndex;
            canPlay = true
        } else {
            if (card[previousCellIndex].emotes === card[cellIndex].emotes) {
                card[previousCellIndex].hasMatch = true;
                card[cellIndex].hasMatch = true;

                gamemassage("✅");
                setTimeout(() => {
                    previousCellIndex = null;

                    let gameOver = end();
                    if (gameOver) {
                        gamemassage("Konec Hry, vyhrál jsi!");
                    } else {
                        canPlay = true;
                    }
                }, 500);
            } else {
                gamemassage("❌");
                setTimeout(() => {
                    card[previousCellIndex].element.classList.add("hide");
                    cellElement.classList.add("hide");
                    previousCellIndex = null;
                    canPlay = true;
                }, 1000);
            }
        }
    }
}

