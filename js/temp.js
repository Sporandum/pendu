// liste de mots
let hero = ["Thor", "Batman", "Spiderman", "Superman", "Ironman", "Venom", "Aquaman", "Antman"];

let wordToFind,
    gamerLettersFind,
    gamerLettersTry,
    count;

// return = un mot au hasard pris dans wordlist
// wordlist est un tableau

let pickWord = function (wordList) {
    let wl = wordList.length,
        i = parseInt(Math.random() * (0 - wl) + wl);
    return wordList[i];
}

// return = alphabet (a => z) dans tableau
// lettres en minuscule
let alphabet = function () {
    let alphabet = [],
        i, a = 65,
        z = 90;
    for (i = a; i <= z; i++) {
        alphabet.push(String.fromCharCode(i).toLowerCase());
    }
    return alphabet;
}

// return = lettres word dans tableau
// lettres en minuscule
let wordToArray = function (word) {
    let wordToArray = [],
        i;
    for (i = 0; word[i]; i++) {
        wordToArray.push(word[i].toLowerCase());
    }
    return wordToArray;
}

// return = alphabet moins lettres déjà trouvé
// alphabet et wordToSearch sont des tableaux
let possibleLetters = function (alphabet, wordToSearch) {
    let possibleLetters = [],
        i;
    for (i = 0; alphabet[i]; i++) {
        if (wordToSearch.indexOf(alphabet[i]) === -1) {
            possibleLetters.push(alphabet[i]);
        }

    }
    return possibleLetters;
}

// return tableau avec les lettres trouvé dans le mot
let letterFindInWord = function (letter, wordInArray) {
    let letterFindInWord = [],
        i;
    for (i = 0; wordInArray[i]; i++) {
        if (wordInArray[i].toLowerCase() === letter.toLowerCase()) {
            letterFindInWord[i] = letter;
        } else {
            letterFindInWord[i] = "";
        }
    }
    return letterFindInWord;
}

// function rendu du mot à trouver
let renderWordToFind = function () {
    let insertElt = document.getElementById('word-to-find'),
        parentElt = document.createElement('div');
    parentElt.className = "letters-content";

    for (let i = 0; i < gamerLettersFind.length; i++) {
        let childElt = document.createElement('div');
        childElt.className = "letter";
        childElt.textContent = gamerLettersFind[i];
        parentElt.appendChild(childElt);

    }
    insertElt.innerHTML = "";
    insertElt.appendChild(parentElt);
}

// funtion rendu du clavier
let renderKeyboard = function () {
    let insertElt = document.getElementById('keyboard'),
        parentElt = document.createElement('div'),
        arrayAlpha = possibleLetters(alphabet(), gamerLettersFind),
        arrayBeta = possibleLetters(arrayAlpha, gamerLettersTry);
    parentElt.className = "keys";

    for (let i = 0; arrayBeta[i]; i++) {
        let childElt = document.createElement('div');
        childElt.className = "key";
        childElt.textContent = arrayBeta[i];
        childElt.addEventListener('click', function (event) {
            rules(event);

        })
        parentElt.appendChild(childElt);

    }
    insertElt.innerHTML = "";
    insertElt.appendChild(parentElt);
}

// affiche le nombre de tour (count)
let displayCount = function () {
    let countElt = document.getElementById('count');
    countElt.innerHTML = count;
}


// fonctionnement bouton reset
let reset = function () {
    let btn = document.getElementById('reset');
    btn.addEventListener('click', init);
}

// functionnement du pendu
let rules = function (e) {
    let letter = e.target.textContent,
        result = letterFindInWord(letter, wordToFind),
        c = true,
        i;
    // rajoute la lettre dans le tableau
    gamerLettersTry.push(letter);

    for (i = 0; i < result.length; i++) {
        if (result[i]) {
            gamerLettersFind[i] = result[i];
            c = false;
        }
    }
    if (c) {
        count--;
    }
    displayCount();
    if (count === 0) {
        setTimeout(function () {
            if (confirm("Perdu !! Voulez Vous recommencer ?")) {
                init();
            } else {
                for (let i = 0; wordToFind[i]; i++) {
                    gamerLettersFind[i] = wordToFind[i];
                    renderWordToFind();
                    document.getElementById('keyboard').innerHTML = "";
                }
            }
        }, 150);
    }
    renderWordToFind();
    if (wordToFind.join('') === gamerLettersFind.join('')) {
        setTimeout(function () {
            if (confirm("Gagné !! Voulez Vous recommencer ?")) {
                init();
            } else {
                document.getElementById('keyboard').innerHTML = "";
            }
        }, 150);
    }
    renderKeyboard();
}

// initialisation partie
let init = function () {
    wordToFind = wordToArray(pickWord(hero)),
        gamerLettersFind = Array(wordToFind.length).fill(''),
        gamerLettersTry = [],
        count = 7;

    displayCount();
    renderWordToFind();
    renderKeyboard();
    reset();
}
init();