// creating classes for Card and Deck

class Card {
    _name;
    _suit;
    _value;

    constructor(name, suit, value) {
        this._name = name;
        this._suit = suit;
        this._value = value;
    }

    get name() {
        return this._name;
    }

    get suit() {
        return this._suit;
    }

    get value() {
        return this._value;
    }

}

class Deck {
    _unshuffledDeck;
    _player1Deck;
    _player2Deck;

    constructor() {
        this._unshuffledDeck = [];
        this._player1Deck = [];
        this._player2Deck = [];
    }

    get player1Deck() {
        return this._player1Deck;
    }

    get player2Deck() {
        return this._player2Deck;
    }
    
// this function creates an unshuffled deck of 52 cards, 13 in each suit, and assigns a value to each card

    buildDeck() {
        const suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];

        suits.forEach(suit => {
        for (let i = 2; i < 11; i++) {
            this._unshuffledDeck.push(new Card(i, suit, i));
        }
        this._unshuffledDeck.push(new Card('Jack', suit, 11));
        this._unshuffledDeck.push(new Card('Queen', suit, 12));
        this._unshuffledDeck.push(new Card('King', suit, 13));
        this._unshuffledDeck.push(new Card('Ace', suit, 14));
        });
    }

// this function takes the unshuffled deck array, and randomly distributes the cards evenly to decks for player1 and player2

    shuffleDeck() {
        for (let i = 0; i < 26; i++) {
            this._player1Deck.push(this._unshuffledDeck.splice((Math.floor(Math.random()*this._unshuffledDeck.length)),1));
            this._player2Deck.push(this._unshuffledDeck.splice((Math.floor(Math.random()*this._unshuffledDeck.length)),1));
        }
    }
}

// creating a menu to launch and setup the game

class Menu {
    player1;
    player2;

    constructor() {
        this.player1 = '';
        this.player2 = '';
    }

    start() {
        let selection = this.showMenu();

        while (selection != 0) {
            switch(selection) {
                case '1':
                    this.addPlayers();
                    break;
                case '2':
                    this.dealCards();
                    break;
                case '3':
                    this.startWAR();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMenu();
        }

        alert('Goodbye coward!');
    }

    showMenu() {
        return prompt(`
        0) Exit
        1) Add Players
        2) Shuffle and Deal Cards
        3) Declare WAR!!!
        ----------------------------`);
    }

    addPlayers() {
        this.player1 = prompt('Enter name for Player One:');
        this.player2 = prompt('Enter name for Player Two:');
    }

    dealCards() {
        this.deck = new Deck();
        this.deck.buildDeck();
        this.deck.shuffleDeck();
        alert('Deck is shuffled and player hands have been dealt');
    }

    // this function runs the game code, it iterates through both players decks comparing card values and tallying points
    // at the end it declares a victor and shows the point totals
    // once the game is run, players can re-shuffle the deck and play again

    startWAR() {
        this.player1Points = 0;
        this.player2Points = 0;
        alert(`${this.player1} has declared WAR on ${this.player2}!!!`);

        
        for (let i = 0; i < 26; i++) {
            if (this.deck.player1Deck[i][0].value > this.deck.player2Deck[i][0].value) {
                this.player1Points += 1;
            } else if (this.deck.player1Deck[i][0].value < this.deck.player2Deck[i][0].value) {
                this.player2Points += 1;
            }
        };
        if (this.player1Points > this.player2Points) {
            alert(`${this.player1} has defeated ${this.player2}!
            The final score was ${this.player1Points} to ${this.player2Points}
            Better luck next time ${this.player2}!`);
        } else if (this.player2Points > this.player1Points) {
            alert(`${this.player2} has defeated ${this.player1}!
            The final score was ${this.player2Points} to ${this.player1Points}
            Better luck next time ${this.player1}!`);
        } else {
            alert(`It is a stalemate!
            The final score was ${this.player1}: ${this.player1Points} to ${this.player2}: ${this.player2Points}
            `);
        }
    }
}

let menu = new Menu();
menu.start();
