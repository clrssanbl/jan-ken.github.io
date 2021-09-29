let scoreKen = 0;
let scorePlayer = 0;
let timeOut = "";
let results = "-";

let ken = document.getElementById("ninja-ken");
let splashScreen = document.getElementsByClassName("splash")[0];
let startGame = document.getElementsByClassName("start")[0];
let displayScoreKen = document.getElementsByClassName("score-ken")[0];
let displayScorePlayer = document.getElementsByClassName("score-player")[0];
let displayResult = document.getElementById("results");

let reset = document.getElementById("reset");
let rock = document.getElementById("rock");
let scissors = document.getElementById("scissors");
let paper = document.getElementById("paper");

if (localStorage.getItem("scoreKen")){
    scoreKen = localStorage.getItem("scoreKen");
    displayScoreKen.innerHTML = scoreKen;
}

if (localStorage.getItem("scorePlayer")){
    scorePlayer = localStorage.getItem("scorePlayer");
    displayScorePlayer.innerHTML = scorePlayer;
}

startGame.addEventListener("click", () => {
    splashScreen.style.top = "120vh";
    splashScreen.style.transition = ".75s";
});

rock.addEventListener("click", () => {
    janken(0);
});

scissors.addEventListener("click", () => {
    janken(1);
});

paper.addEventListener("click", () => {
    janken(2);
});

reset.addEventListener("click", () => {
    if (confirm("ini akan memulai ulang permainan, anda yakin?")) {
        scoreKen = 0;
        scorePlayer = 0;
        results = "-";
        displayScoreKen.innerHTML = scoreKen;
        displayScorePlayer.innerHTML = scorePlayer;
        displayResult.innerHTML = results;
        localStorage.clear();
    };
});

function janken(hand) {
    let fingerKen = Math.floor(Math.random() * 3);

    switch (fingerKen) {
        case 0:
            ken.style.backgroundImage = "url(img/ken-batu.png)";
            break;
        case 1:
            ken.style.backgroundImage = "url(img/ken-gunting.png)";
            break;
        default:
            ken.style.backgroundImage = "url(img/ken-kertas.png)";
            break;
    }

    ken.classList.remove("shake");

    switch (hand) {
        case 0:
            if (fingerKen == 0) {
                result("draw");
            } else if (fingerKen == 1) {
                result("player");
            } else {
                result("ken");
            }
            break;
        case 1:
            if (fingerKen == 0) {
                result("ken");
            } else if (fingerKen == 1) {
                result("draw");
            } else {
                result("player");
            }
            break;
        default:
            if (fingerKen == 0) {
                result("player");
            } else if (fingerKen == 1) {
                result("ken");
            } else {
                result("draw");
            }
            break;
    }
}

function result(who) {
    clearTimeout(timeOut);
    switch(who) {
        case "ken":
            scoreKen++;
            localStorage.setItem("scoreKen", scoreKen);
            displayScoreKen.innerHTML = scoreKen;
            results = "Ninja Ken Menang";
            displayResult.innerHTML = results;
            console.log(results);
            break;
        case "player":
            scorePlayer++;
            localStorage.setItem("scorePlayer", scorePlayer);
            displayScorePlayer.innerHTML = scorePlayer;
            results = "Anda Menang";
            displayResult.innerHTML = results;
            console.log(results);
            break;
        default:
            results = "Seri";
            displayResult.innerHTML = results;
            console.log(results);
            break;
    }

    timeOut = setTimeout(() => {
        ken.style.removeProperty("background-image");
        ken.classList.add("shake");
        results = "-";
        displayResult.innerHTML = results;
    }, 3000);
}
