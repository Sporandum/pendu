// liste de mots
let hero = ["Thor", "Batman", "Spiderman", "Superman", "Ironman", "Venom", "Aquaman", "Antman"];

let word = null;

let pendu = {
    // Selectionne la liste
    wordList: hero,

    // Stock le dernier mot selectionner

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

    init: function () {
        let elt = document.getElementById('word-to-find'),
            letters = this.pickWord(this.wordList).split('');
        // insérer les divs dans le DOM elt #word-to-find
        elt.innerHTML = "";
        elt.appendChild(this.divLetters(letters));
    },

}

pendu.init();
let btn = document.getElementById('play');
btn.addEventListener('click', function () {
    pendu.init();
})