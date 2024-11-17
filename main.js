// Function to create a standard deck of 52 cards
function generateDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return suits.flatMap(suit => values.map(value => ({ suit, value })));
}

// Function to count and display the remaining cards by suit
function countCardsBySuit(deck) {
    const suitCount = deck.reduce((acc, card) => {
        acc[card.suit] = acc[card.suit] || [];
        acc[card.suit].push(card.value);
        return acc;
    }, {});

    for (const [suit, cards] of Object.entries(suitCount)) {
        console.log(`${suit}: ${cards.length} cards remaining - ${cards.join(', ')}`);
    }
}

// Function to draw a card randomly from the deck
function drawCard(deck, drawnCards) {
    if (deck.length === 0) {
        console.log("No more cards to draw!");
        return null;
    }
    const randomIndex = Math.floor(Math.random() * deck.length);
    const [drawnCard] = deck.splice(randomIndex, 1);
    drawnCards.push(drawnCard);
    console.log(`Drew card: ${drawnCard.value} of ${drawnCard.suit}`);
    return drawnCard;
}

// Placeholder functions for future game features
function checkForBlackjack(hand) {
    // Logic to check for blackjack
}

function isBust(hand) {
    // Logic to check if the hand is over 21
}

function handleAce(hand) {
    // Logic to adjust for soft hand with an Ace
}

// Example of using the functions
const deck = generateDeck();
countCardsBySuit(deck);

let drawnCards = [];
drawCard(deck, drawnCards);

console.log("Drawn cards:", drawnCards);
console.log("Remaining cards in the deck:", deck.length);
