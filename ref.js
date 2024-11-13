let deck, playerHand, dealerHand;

function createDeck() {
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    for (let value of values) {
        for (let i = 0; i < 4; i++) { // Repeat each value 4 times for 4 suits
            deck.push({ value });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) {
        return 10;
    } else if (card.value === 'A') {
        return 11;
    } else {
        return parseInt(card.value);
    }
}

function calculateHandValue(hand) {
    let total = 0;
    let acesCount = 0;

    for (let card of hand) {
        total += getCardValue(card);
        if (card.value === 'A') {
            acesCount++;
        }
    }

    while (total > 21 && acesCount > 0) {
        total -= 10;
        acesCount--;
    }

    return total;
}

function displayHand(hand) {
    return hand.map(card => `${card.value}`).join(', ');
}

function updateOutput(message) {
    document.getElementById('output').textContent = message;
}

function startGame() {
    deck = shuffleDeck(createDeck());
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];

    updateOutput(`Dealer's Hand: ${dealerHand[0].value}, [Hidden]\n` +
        `Your Hand: ${displayHand(playerHand)} (Total: ${calculateHandValue(playerHand)})`);
}

function hit() {
    playerHand.push(deck.pop());
    updateOutput(`You drew: ${playerHand[playerHand.length - 1].value}\n` +
        `Your Hand: ${displayHand(playerHand)} (Total: ${calculateHandValue(playerHand)})`);
    
    if (calculateHandValue(playerHand) > 21) {
        updateOutput(`Busted! Your total is ${calculateHandValue(playerHand)}. You lose.`);
    }
}

function stand() {
    updateOutput(`Dealer's Hand: ${displayHand(dealerHand)} (Total: ${calculateHandValue(dealerHand)})`);
    while (calculateHandValue(dealerHand) < 17) {
        dealerHand.push(deck.pop());
        updateOutput(document.getElementById('output').textContent + `\nDealer drew: ${dealerHand[dealerHand.length - 1].value}`);
    }

    let playerTotal = calculateHandValue(playerHand);
    let dealerTotal = calculateHandValue(dealerHand);

    if (dealerTotal > 21 || playerTotal > dealerTotal) {
        updateOutput(document.getElementById('output').textContent + `\nYou win! Your total is ${playerTotal}, and the dealer's total is ${dealerTotal}.`);
    } else if (playerTotal < dealerTotal) {
        updateOutput(document.getElementById('output').textContent + `\nYou lose. Your total is ${playerTotal}, and the dealer's total is ${dealerTotal}.`);
    } else {
        updateOutput(document.getElementById('output').textContent + `\nIt's a tie! Your total is ${playerTotal}, and the dealer's total is ${dealerTotal}.`);
    }
}

startGame();
