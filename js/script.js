// liste de mots


let words = ["Thor", "Batman", "Spiderman", "Superman", "Ironman", "Venom", "Aquaman", "Antman"];

// Stock le dernier mot selectionner
let word = null;

// prendre un mot au hasard dans la liste de mot

function foo(w) {

    let nbWords = w.length,
        i = parseInt(Math.random() * (0 - nbWords) + nbWords),
        newWord = w[i];

    if (word === null || word !== newWord) {
        return word = newWord;
    } else if (word !== null || word === newWord) {
        console.log('else')
        return foo(w);
    }
}

foo(words);
// séparer chaque lettre du mot individuellement

let letters = word.split('');

// créer une div pour chaque lettre du mot avec la classe .letter

function bar(letters) {
    let l = letters.length,
        lettersElts = document.createElement('div'),
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
}

// insérer les divs dans le DOM elt #word-to-find

let test = document.getElementById('word-to-find');
test.appendChild(bar(letters));