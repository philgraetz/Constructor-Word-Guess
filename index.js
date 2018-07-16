//
// This is the main logic for the Word Guess Game
//
let Word = require('./word');
let inquirer = require('inquirer');
let chalk = require('chalk');
const GUESSES_ALLOWED = 15;
const WORD_LIST = [
    "Aerosmith",
    "Black Sabbath",
    "Alice Cooper",
    "Credence Clearwater Revival",
    "Eric Clapton",
    "Jethro Tull",
    "Journey",
    "The Doors",
    "The Grateful Dead",
    "Kiss",
    "Lynyrd Skynyrd",
    "Red Hot Chili Peppers",
];
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// letter prompt
let letter_prompt = {
    type: "input",
    name: "letter",
    message: "Enter a single letter",
    validate: function(val) {
        patt = /^[a-z]$/i;
        return patt.test(val) ||
            "That was not a single letter";
    }
};

// Continue prompt
let continue_prompt = {
    type: "confirm",
    name: "continue",
    message: "Continue?",
    default: true,
};

function Game() {
    this.word = null;
    this.remainingWords = [];

    this.printHelp = function() {
        console.log("==== CLASSIC ROCK BANDS ====");
        console.log("");
        console.log("Guess the artist/band one letter at a time.");
        console.log("");
    }

    this.startUp = function() {
        this.printHelp();
        this.newWord();
    };

    this.getRandomWord = function() {
        // After getting "Jethro Tull" 3 times in a row,
        // I decided I needed a method that would
        // ensure all words are picked before repeating.
        if (this.remainingWords.length === 0) {
            this.remainingWords = WORD_LIST.slice();
        }
        let index = Math.floor(Math.random()*this.remainingWords.length);
        let word = this.remainingWords[index];
        this.remainingWords.splice(index,1);
        return word;
    }
    // Start a new word
    this.newWord = function() {
        inquirer.prompt(continue_prompt).then((result) => {
            if (!result.continue)
                return console.log("Thanks for playing!");
            this.guessesLeft = GUESSES_ALLOWED;
            this.word = new Word(this.getRandomWord());
            this.lettersGuessed = new Word(ALPHABET);
            this.getALetter();
        });
    };

    // Get a guess from user
    this.getALetter = function() {
        console.log("\n");
        console.log("Current Word   : " + this.word);
        console.log("Guesses Left   : " + this.guessesLeft);
        console.log("Letters Guessed: " + this.lettersGuessed);
        console.log("\n");
        if (this.guessesLeft <= 0) {
            console.log("You have run out of guesses. " + chalk.red("You lose!"));
            this.newWord();
            return;
        }
        inquirer.prompt(letter_prompt).then((result) => {
            if (result.letter === '') {
                console.log("Thanks for playing!");
                return;
            }
            this.guessesLeft--;
            this.guess(result.letter);
        });
    };

    // Process the guessed letter
    this.guess = function(letter) {
        this.lettersGuessed.guess(letter);
        if (this.word.guess(letter)) {
            // A correct guess
            console.log(chalk.green("CORRECT!"));

            if (this.word.guessed()) {
                // Word is completed
                console.log("You won!");
                console.log("The correct Word : " + this.word);
                console.log("\n");

                // Start a new word
                this.newWord();
            } else {
                this.getALetter();
            }
        } else {
            console.log("Nice guess, but " + chalk.red("WRONG!"));
            this.getALetter();
        }
    };
}

// Create an instance and start the Game
let game = new Game();
game.startUp();