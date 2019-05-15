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

// séparer chaque lettre du mot individuellement

// créer une div pour chaque lettre du mot avec la classe .letter

// insérer les divs dans le DOM elt #word-to-find