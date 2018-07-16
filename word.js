let Letter = require("./letter");

function Word(word) {
    this.letters = [];
    for (let i = 0; i < word.length; i++) {
        this.letters.push(new Letter(word.charAt(i)));
    };
    this.guess = function(ch) {
        let currentWord = this.toString();
        this.letters.forEach((letter) => { letter.guess(ch)});

        // See if anything changed. If so, it was a correct guess.
        return (currentWord !== this.toString()) ? true : false;
    };
    this.guessed = function() {
        return this.toString().indexOf(Letter.prototype.PLACE_HOLDER) < 0;
    }
    this.toString = function() {
        return this.letters.join(" ");
    };
}

module.exports = Word;

// console.log("Set word to 'hello'");
// let wd = new Word('hello');
// console.log("wd: " + wd);

// console.log("Guess e");
// let correct = wd.guess('e');
// let guessed = wd.guessed();
// console.log("wd: " + wd + " " + correct + " " + guessed);

// console.log("Guess x");
// correct = wd.guess('x');
// console.log("wd: " + wd + " " + correct);;

// console.log("Guess l");
// correct = wd.guess('l');
// console.log("wd: " + wd + " " + correct);

// console.log("Guess h");
// correct = wd.guess('h');
// guessed = wd.guessed();
// console.log("wd: " + wd + " " + correct + " " + guessed);

// console.log("Guess o");
// correct = wd.guess('o');
// guessed = wd.guessed();
// console.log("wd: " + wd + " " + correct + " " + guessed);

