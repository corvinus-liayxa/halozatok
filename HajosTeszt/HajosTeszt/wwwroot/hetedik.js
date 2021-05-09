var kerdesek;
var sorszam = 0;
var leptetes = 1;
var osszesKerdesSzama;
var aktualisKerdes;

var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában

window.onload = function () {
    letoltes();
    kerdesBetoltes(leptetes);
};

function letoltes() {
    fetch('/guestions.json')
        .then(response => response.json())
        .then(data => letoltesBefejezodott(data))
};

fetch('/questions/1')
    .then(respons => respons.json())
    .then(data => kerdesMegjelenites(data))

fetch('/questions/mind')
    .then(response => response.json())
    .then(output => {
        var data = output
        osszesKerdesSzama = data
    }
    )

function letoltesBefejezodott(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kerdesek = d
    kerdesMegjelenites(0)
};

function kerdesMegjelenites(kerdes) {
    console.log(kerdes);
    aktualisKerdes = kerdes
    document.getElementById("kerdes_szoveg").innerHTML = kerdes.questionText
    document.getElementById("valasz1").innerHTML = kerdes.answer1
    document.getElementById("valasz2").innerHTML = kerdes.answer2
    document.getElementById("valasz3").innerHTML = kerdes.answer3
    document.getElementById("kep1").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image
};

function init() {
    for (let i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswer: 0
        }
    }

    for (let i = 0; i < questionsInHotList; i++) {
        kerdesBetoltes(nextQuestion, i)
        nextQuestion++;
    }
}



function kerdesBetoltes(id, destination) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(q => {
            hotList[destination] = q;
            hotList[destination].goodAnswer = 0;
            console.log(`a ${id}. kérdés letöltésre került a hotList ${id}. helyére`) 
            if (displayedQuestion === undefined && destination === 0) {
                displayedQuestion = 0;
                kerdesMegjelenites();
            }
        })
}


function vissza() {
    if (leptetes == 1) {
        leptetes = osszesKerdesSzama
    }
    else {
        leptetes = leptetes - 1;
    }
    kerdesBetoltes(leptetes);
    torles()
};

function elore() {
    if (leptetes == osszesKerdesSzama) {
        leptetes = 1
    }
    else {
        leptetes = leptetes + 1;
    }
    kerdesBetoltes(leptetes);
    torles();
};

function klikk() {
    if (this.innerHTML == "Vissza") {
        if (sorszam != 0) {
            sorszam = sorszam - 1;
            kerdesMegjelenites(sorszam)
        } else {
            sorszam = 2; kerdesMegjelenites(sorszam)
        }
    } else {
        if (sorszam != 2) {
            sorszam = sorszam + 1;
            kerdesMegjelenites(sorszam);
        } else { sorszam = 0; kerdesMegjelenites(sorszam) };
    };
}

function megoldas(ki) {
    let kerdes = hotList[displayedQuestion].question;
    if (ki === kerdes.correctAnswer) {
        document.getElementById(`valasz${ki}`).classList.add("jo")
        if (hotList[displayedQuestion].goodAnswer === 3) {
            kerdesBetoltes(nextQuestion, displayedQuestion)
            nextQuestion++;
            //kerdeslista vege
        }
    }
    else {
        document.getElementById("valasz" + ki).classList.add("rossz")
        document.getElementById("valasz" + kerdes.correctAnswer).classList.add("jo")
        hotList[displayedQuestion].goodAnswer = 0;
    }

    localStorage.setItem("hotlist", JSON.stringify(hotList));
    localStorage.setItem("displayedquestion", displayedQuestion);
    localStorage.setItem("hotlist", nextQuestion);

}


function torles() {
    for (let i = 1; i < 4; i++) {
        document.getElementById(`valasz${i}`).classList.remove("rossz")
        document.getElementById(`valasz${i}`).classList.remove("jo")
    }
} 