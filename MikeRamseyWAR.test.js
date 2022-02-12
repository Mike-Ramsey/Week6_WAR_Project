const expect = chai.expect;

describe('Deck function test', function() {
    describe('#buildDeck', function() {
        it('Check to see if 52 cards are created in unshuffledDeck array', function() {
            //arrange
            const deck = new Deck();
            //act
            deck.buildDeck();
            //assert
            expect(deck._unshuffledDeck.length).to.equal(52);
        })
    })
})