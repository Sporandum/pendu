// liste de mots
let hero = ["Thor", "Batman", "Spiderman", "Superman", "Ironman", "Venom", "Aquaman", "Antman"];

let wordToFind, // le mot à trouver
    gamerLettersFind, // tableau avec lettres trouvé par le joueur
    gamerLettersTry, // tableau avec lettres essayé par le joueur
    count; // décompte avant Game Over


// Retourne un resultat aléatoire pris dans tableau (array)
let getRandomInArray = function (array) {
    let wl = array.length,
        i = parseInt(Math.random() * (0 - wl) + wl);
    return array[i];
}

// Céer alphabet (a => z) dans tableau
// lettres en minuscule
let alphabetInArray = function () {
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
        arrayAlpha = possibleLetters(alphabetInArray(), gamerLettersFind),
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

    if (count > 1) {
        messageDisplay("Il vous reste " + count + " coups à jouer");
        messageClassname(null);
    } else if (count === 1) {
        messageDisplay("Attention dernière chance");
        messageClassname('caution');
    }
}


// fonctionnement bouton reset
let reset = function () {
    let btn = document.getElementById('reset');
    btn.addEventListener('click', init);
}


// fonctionnement bouton help
let help = function () {
    let btn = document.getElementById('help'),
        i;
    btn.addEventListener('click', function () {
        if (count > 2) {
            helpDisplay("none");
            let letter = wordToFind[0].toUpperCase();
            messageDisplay(`Le mot commence par la lettre : ${letter}`);
            count -= 2;
            setTimeout( function() {
                messageDisplay("L'aide coûte 2 coups")
            }, 2500);
            setTimeout( function() {
                displayCount()
            }, 5000);
            
        } else {
            helpDisplay("none");
            messageDisplay("Hé, trop facile ;-)");
            setTimeout(function () {
                displayCount();
            }, 2500);
        }

        renderWordToFind();
        renderKeyboard();

    });
}
// function affiche / cache le bouton help
let helpDisplay = function (state) {
    let elt = document.getElementById('help');
    if (state === null) {
        elt.style.display = null;
    } else if (state === "none") {
        elt.style.display = "none";
    }
}

let messageDisplay = function (message) {
    return document.getElementById('message').innerHTML = message;
}

let messageClassname = function (className) {
    let elt = document.getElementById('message');
    if (className) {
        return elt.className = className;
    } else {
        return elt.removeAttribute("class");
    }
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
    renderWordToFind();
    renderKeyboard();

    if (wordToFind.join('') === gamerLettersFind.join('')) {
        messageDisplay("Gagné !! Voulez vous recommencer ?");
        messageClassname('success');
        document.getElementById('keyboard').innerHTML = "";
        helpDisplay("none");
    }

    if (count === 0) {

        for (let i = 0; wordToFind[i]; i++) {
            gamerLettersFind[i] = wordToFind[i];
            renderWordToFind();
        }

        messageDisplay("Perdu !! Voulez vous recommencer ?");
        messageClassname('failure');
        document.getElementById('keyboard').innerHTML = "";
        helpDisplay("none");

    }
}

// function initialisation de la partie
let init = function () {
    wordToFind = wordToArray(getRandomInArray(hero)),
        gamerLettersFind = Array(wordToFind.length).fill(''),
        gamerLettersTry = [],
        count = 7;

    displayCount();
    helpDisplay(null);
    renderWordToFind();
    renderKeyboard();
}

// premier lancement
init();
reset();
help();