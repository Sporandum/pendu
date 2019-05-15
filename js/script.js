// liste de mots
let hero = ["Thor", "Batman", "Spiderman", "Superman", "Ironman", "Venom", "Aquaman", "Antman"];

// Stock mot selectionné
let word = null;



let pendu = {
    // Selectionne la liste
    wordList: hero,

    // Fonction prendre un mot au hasard dans la liste de mot
    pickWord: function (wordList) {

        let nbWords = wordList.length,
            i = parseInt(Math.random() * (0 - nbWords) + nbWords),
            newWord = wordList[i];

        if (word === null || word !== newWord) {
            console.log('good');
            return word = newWord;
        } else if (word !== null || word === newWord) {
            console.log('else')
            return this.pickWord(wordList);
        }
    },

    // Fonction créer une div pour chaque lettre du mot avec la classe .letter

    divLetters: function (letters) {
        let lettersElts = document.createElement('div'),
            l = letters.length,
            i;

        lettersElts.className = "letters-content";

        for (i = 0; i < l; i++) {
            let letterElt = document.createElement('div');
            letterElt.className = "letter";
            //  Affiche la première et la dernière lettre
            if (i === 0 || i === l - 1) {
                letterElt.textContent = letters[i];
            }

            lettersElts.appendChild(letterElt)
        }
        return lettersElts;
    },

    initWord: function () {
        let elt = document.getElementById('word-to-find'),
            letters = this.pickWord(this.wordList).split('');
        // insérer les divs dans le DOM elt #word-to-find
        elt.innerHTML = "";
        elt.appendChild(this.divLetters(letters));
    },

}

// Keyboard

let keyboard = {
    foo: function () {
        let a = 65,
            z = 90;

        let keyElts = document.createElement('div'),
            keyboard = document.getElementById('keyboard');

        for (let i = a; i <= z; i++) {
            let keyElt = document.createElement('div');
            keyElt.className = 'key';
            keyElt.textContent = String.fromCharCode(i);
            keyElts.appendChild(keyElt);
        }

        keyElts.className = "keys";
        keyboard.appendChild(keyElts);

    }
}

// Initialisation
keyboard.foo();
pendu.initWord();

let btn = document.getElementById('play');
btn.addEventListener('click', function () {
    pendu.initWord();
});

let keys = document.getElementsByClassName('key');
for (let i = 0; keys[i]; i++) {
    keys[i].addEventListener('click', function (e) {

    })
};

function cho(testWord, letter) {
    let a = testWord.length,
        o = testWord.toLowerCase(),
        j = letter.toLowerCase(),
        result = [],
        i;
    for (i = 0; i < a; i++) {
        if (o[i].indexOf(j) === 0) {
            result[i] = 1;
        } else if (o[i].indexOf(j) === -1) {
            result[i] = 0;
        }
    }
    return result;
}