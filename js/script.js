// liste de mots
let hero = ["Thor", "Batman", "Spiderman", "Superman", "Ironman", "Venom", "Aquaman", "Antman"];

let lists = {
    Marvel: {
        Thor: "Ragnarok",
        Spiderman: "Grandes responsabilités",
        IronMan: "ACDC",
    }
};

let list, // liste selectionné par le joueur
    wordToFind, // le mot à trouver
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

// return lettres pour help
let lettersToHelp = function (arrayA, arrayB) {
    let lettersToHelp = [],
        i;
    for (i = 0; arrayA[i]; i++) {
        if (arrayA[i] !== arrayB[i]) {
            lettersToHelp.push(arrayA[i]);
        }
    }
    return lettersToHelp;
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
            let letter = event.target.textContent;
            rules(letter);

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
    let btn = document.getElementById('help');
    // Désactive l'aide
    document.addEventListener('click', function () {
        if (count <= 2) {
            helpDisplay("none");
        }
    });

    btn.addEventListener('click', function () {
        if (count > 2) {
            let joker = getRandomInArray(lettersToHelp(wordToFind, gamerLettersFind));
            count -= 2;
            rules(joker);
        }
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

// function affichage message
let messageDisplay = function (message) {
    return document.getElementById('message').innerHTML = message;
}

// function défini class à message
let messageClassname = function (className) {
    let elt = document.getElementById('message');
    if (className) {
        return elt.className = className;
    } else {
        return elt.removeAttribute("class");
    }
}

// functionnement du pendu
let rules = function (l) {
    let letter = l,
        result = letterFindInWord(l, wordToFind),
        c = true,
        i;
    // rajoute la lettre dans le tableau
    gamerLettersTry.push(l);

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
        gamerLettersTry = [];

    displayCount();
    helpDisplay(null);
    renderWordToFind();
    renderKeyboard();
}

// premier lancement
init();
reset();
help();

// test messageWindow

let StartGameWindow = function () {
    let WindowContainer = document.getElementById('window-container'),
        windowMessageElt = document.getElementById('window-message'),
        btnStart = document.createElement('button');

    btnStart.textContent = "Démarrer";
    btnStart.addEventListener('click', function () {
        let countSelect = document.getElementById('count-select'),
            listSelect = document.getElementById('list-select');

        count = countSelect.options[countSelect.selectedIndex].textContent;

        // list = lists.listSelect.options[listSelect.selectedIndex].textContent;

        init();
        WindowContainer.style.display = "none";
    });
    windowMessageElt.appendChild(listSelect(lists));
    windowMessageElt.appendChild(countSelect());
    windowMessageElt.appendChild(btnStart);
}


let countSelect = function () {
    let selectElt = document.createElement('select'),
        min = 2,
        max = 7,
        i;
    selectElt.setAttribute('id', "count-select");
    for (i = min; i <= max; i++) {
        let optionElt = document.createElement('option');
        optionElt.value = i;
        optionElt.textContent = i;
        if (i === max) {
            optionElt.setAttribute("selected", "selected");
        }
        selectElt.appendChild(optionElt);
    }
    return selectElt;
}

let listSelect = function (lists) {
    let selectElt = document.createElement('select'),
        listName = [],
        i;
    selectElt.setAttribute('id', "list-select");
    for (let name in lists) {
        listName.push(name);
    }
    for (i = 0; listName[i]; i++) {
        let optionElt = document.createElement('option');
        optionElt.value = listName[i];
        optionElt.textContent = listName[i];
        selectElt.appendChild(optionElt);
    }
    return selectElt;
}

StartGameWindow();

(function() {
    // let listTest = [],
    // i;
    console.log(Object.keys(lists.Marvel));
    console.log(Object.values(lists.Marvel));
    
})();