function Letter(ch) {
    this.character = ch;
    this.guessed = false;
    this.guess = function(ch) {
        if (ch === this.character)
            this.guessed = true;
    };
    this.toString = function() {
        return (this.guessed || this.character === ' ') ? this.character : this.PLACE_HOLDER;
    };
}
Letter.prototype.PLACE_HOLDER = '_';

module.exports = Letter;