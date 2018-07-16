let Word = require('./Word');
let prompt = require('prompt');

let word = new Word("lucky guess");
console.log("word " + word);

let ch = "l";
let correct = word.guess(ch);
console.log("letter: " + ch + " word: " + word + " correct: " + correct);

ch = "x";
correct = word.guess(ch);
console.log("letter: " + ch + " word: " + word + " correct: " + correct);



let letter_schema = {
    properties: {
        letter: {
            description: 'Enter a letter',
            pattern: /^[a-z]?$/i,
            message: 'Must enter a single letter',
            required: true
        },
    }
};

prompt.start();
prompt.get(letter_schema, (err, result) => {
    if (err) 
        return console.log("ERROR " + err);
    console.log('You entered: [' + result.letter + ']');
})