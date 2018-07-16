// This is a module for a single letter.
// The instance is created with a letter value.
// The letter will display an '_' (underscore)
// until it is guessed. Then it will become visible.
function Letter(ch) {
    this.character = ch;
    this.guessed = false;

    // Check against the latest guess
    this.guess = function(ch) {
        if (ch.toUpperCase() === this.character.toUpperCase())
            this.guessed = true;
    };

    // Display '_', or the letter
    this.toString = function() {
        return (this.guessed || this.character === ' ') ? this.character : this.PLACE_HOLDER;
    };
}
Letter.prototype.PLACE_HOLDER = '_';

// Export the Letter prototype
module.exports = Letter;