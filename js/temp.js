// liste de mots
let mainList = {
    marvel: {
        name: "Marvel Universe",
        list: [
            ["Captain America"],
            ["Hawkeye"],
            ["Iron Man"],
            ["Pepper Potts"],
            ["Jarvis"],
            ["Hulk"],
            ["Black Panther"],
            ["Thor"],
            ["Heimdall"],
            ["Loki"],
            ["Ant-Man"],
            ["The Wasp"],
            ["Nick Fury"],
            ["Captain Marvel"],
            ["Black Widow"],
            ["War Machine"],
            ["Luke Cage"],
            ["Jessica Jones"],
            ["Daredevil"],
            ["Elektra"],
            ["Iron Fist"],
            ["Spider-Man"],
            ["Wolverine"],
            ["Vision"],
            ["Star-Lord"],
            ["Warlock"],
            ["Groot"],
            ["Rocket Raccoon"],
            ["Phyla-Vell"],
            ["SHIELD"],
            ["Dr Strange"],
            ["Deadpool"],
            ["Ultron"],
            ["Dr Fatalis"],
            ["HYDRA"],
            ["Thanos"],
            ["Professor X"],
            ["cyclope"],
            ["Iceberg"],
            ["Angel"],
            ["Beast"],
            ["Strange Girl"],
            ["Mimic"],
            ["Diablo"],
            ["Tornade"],
            ["Havok"],
            ["Colossus"],
            ["Malicia"],
            ["Magneto"],
            ["Psylocke"],
            ["Gambit"],
            ["Cable"],
            ["Mystique"],
            ["Juggernaut"],
            ["Sabertooth"],
            ["Phoenix"],
            ["Domino"]
        ]
    },
    dc: {
        name: "DC Comics",
        list: [
            ["Aquaman"],
            ["Superman"],
            ["Batman"],
            ["Wonder Woman"],
            ["Green Lantern"],
            ["The Flash"],
            ["Cyborg"],
            ["Atom"],
            ["Bane"],
            ["Ares"],
            ["Arsenal"],
            ["BatGirl"],
            ["BatWoman"],
            ["Black Canary"],
            ["Black lightning"],
            ["CatWoman"],
            ["ClayFace"],
            ["Constantine"],
            ["James Gordon"],
            ["Darkseid"],
            ["DeadShot"],
            ["Deathstroke"],
            ["Doomsday"],
            ["Suicide Squad"],
            ["SuperBoy"],
            ["SuperGirl"],
            ["Titans"],
            ["Two-Face"],
            ["Watchmen"],
            ["Shazam"],
            ["Zod"],
            ["Zoom"],
            ["Constantine"],
            ["Constantine"],
            ["Constantine"],
        ]
    }

}

// Liste des propriétés de mainlist (dans un tableau)
let themesKeyList = function () {
    return Object.keys(mainList);
}

// Liste des themes
let themesNameList = function () {
    let nb = themesKeyList().length,
        themesName = [],
        i;
    for (i = 0; i < nb; i++) {
        themesName.push(themeName(i));
    }
    return themesName;
}


// Nombre de mots dans liste du theme en fournissant index theme
let nbWordsInList = function (indexTheme) {
    return mainList[themesKeyList()[indexTheme]].list.length;
}

// Nom d'un theme en fournissant un numéro index
let themeName = function (indexTheme) {
    return mainList[themesKeyList()[indexTheme]].name;
}

// Le mot en fournissant l'index du theme, l'index du mot
let word = function (indexTheme, indexWord) {
    return mainList[themesKeyList()[indexTheme]].list[indexWord][0];
}

// L' indice en fournissant l'index du theme, l'index de l'indice
let clue = function (indexTheme, indexclue) {
    return mainList[themesKeyList()[indexTheme]].list[indexclue][1];
}

// Nombre aléatoire à partir de la longueur d'un tableau
let randToMax = function (nbMax) {
    return parseInt(Math.random() * (0 - nbMax) + nbMax);
}


let listIndex, // Index de la liste selectionné par le joueur
    themeChosen, // Nom du thème
    wordToFind, // Le mot à trouver
    gamerLettersFind, // Tableau avec lettres trouvé par le joueur
    gamerLettersTry, // Tableau avec lettres essayé par le joueur
    count; // Décompte avant Game Over


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

        childElt.textContent = gamerLettersFind[i];

        console.log(childElt.textContent);

        switch (childElt.textContent) {
            case "-":
                childElt.className = "letter letter-tiret";
                break;
            case " ":
                childElt.className = "letter letter-space";
                break;
            default:
                childElt.className = "letter";
        }

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
    btn.addEventListener('click', StartGameWindow);
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
    gamerLettersFind = Array(wordToFind.length).fill('');
    
    // insertion des tirets et des espaces dans gamerLettersFind
    for (let i = 0; wordToFind[i]; i++) {
        if (wordToFind[i] === " ") {
            gamerLettersFind[i] = " ";
        } else if (wordToFind[i] === "-") {
            gamerLettersFind[i] = "-";
        }
    }

    gamerLettersTry = [];

    displayCount();
    helpDisplay(null);
    renderWordToFind();
    renderKeyboard();
}

// Fenetre de lancement
let StartGameWindow = function () {
    let windowContainerElt = document.getElementById('window-container'),
        windowMessageElt = document.getElementById('window-message'),
        windowHeaderElt = document.createElement('div'),
        selectElt = document.createElement('div'),
        btnStartElt = document.createElement('button'),
        themeTitleElt = document.getElementById('theme-title');
    // modifie le titre de la fenetre du navigateur
    document.querySelector('head title').innerHTML = "Jeu du Pendu";

    windowContainerElt.style.display = "block";
    // Header windows Message
    windowHeaderElt.setAttribute('id', "window-message-header");
    windowHeaderElt.innerHTML = "Menu de Selection";

    // Select
    selectElt.className = "window-select";
    selectElt.appendChild(labelListSelect());
    selectElt.appendChild(listSelectElts());
    selectElt.appendChild(labelCountSelect());
    selectElt.appendChild(countSelectElt());

    // Bouton démarrer
    btnStartElt.setAttribute("id", "window-message-button");
    btnStartElt.textContent = "Démarrer";
    btnStartElt.addEventListener('click', function () {
        let listSelect = document.getElementById('list-select'),
            countSelect = document.getElementById('count-select');

        listIndex = listSelect.options[listSelect.selectedIndex].value;
        count = countSelect.options[countSelect.selectedIndex].value;

        themeChosen = themeName(listIndex);

        wordToFind = wordToArray(word(listIndex, randToMax(nbWordsInList(listIndex))));

        windowContainerElt.style.display = "none";
        themeTitleElt.innerHTML = themeChosen.toUpperCase();

        document.querySelector('head title').innerHTML = "Jeu du Pendu" + " - " + themeChosen;

        init();

    });
    windowMessageElt.innerHTML = "";
    windowMessageElt.appendChild(windowHeaderElt);
    windowMessageElt.appendChild(selectElt);
    windowMessageElt.appendChild(btnStartElt);
}

// label pour count-select
let labelCountSelect = function () {
    let labelElt = document.createElement('label');
    labelElt.setAttribute('for', "count-select");
    labelElt.textContent = "Nombre de chance";
    return labelElt;
}

// Créé <select> avec choix du nombre de coups
let countSelectElt = function () {
    let selectElt = document.createElement('select'),
        min = 2,
        max = 9,
        i;
    selectElt.setAttribute('id', "count-select");
    for (i = min; i <= max; i++) {
        let optionElt = document.createElement('option');
        optionElt.value = i;
        optionElt.textContent = i;
        if (i === 7) {
            optionElt.setAttribute("selected", "selected");
        }
        selectElt.appendChild(optionElt);
    }
    return selectElt;
}


// label pour list-select
let labelListSelect = function () {
    let labelElt = document.createElement('label');
    labelElt.setAttribute('for', "list-select");
    labelElt.textContent = "Choisissez un theme";
    return labelElt;
}



// Créé <select> avec liste des themes
let listSelectElts = function () {
    let selectElt = document.createElement('select'),
        l = themesKeyList().length,
        i;

    selectElt.setAttribute('id', "list-select");
    for (i = 0; i < l; i++) {
        let optionElt = document.createElement('option');
        optionElt.value = [i];
        optionElt.name = themesKeyList()[i];
        optionElt.textContent = themesNameList()[i];
        selectElt.appendChild(optionElt);
    }
    return selectElt;
}

// lancement
StartGameWindow();

reset();
help();