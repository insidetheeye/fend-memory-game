/*
 *-------------------------------
 *
 *    Global Variables
 *
 *-------------------------------
*/

const cardContainer = document.querySelector('.deck');

// array to store cards to be evaluated
let storedCardsArr = [];

const movesEl = document.getElementById('playerMoves');

let movesCounter = 0;

// card list for generating html
const myCardList = [];

// array to store matched cards - when it reaches 16, the game is won
const matchedCards = [];

const victoryModal = document.querySelector('.victory-modal');

// const allCards = document.querySelectorAll('.card');

// const cardList = [...allCards];

/*
 *-------------------------------
 *
 *    Constructing and Injecting
 *		Card HTML
 *
 *-------------------------------
*/

// create card objects
const cardDiamond = {
	liClass: 'card diamond',
	iClass: 'fa fa-diamond'
}

const cardPaperplane = {
	liClass: 'card paper-plane',
	iClass: 'fa fa-paper-plane-o'
}

const cardAnchor = {
	liClass: 'card anchor',
	iClass: 'fa fa-anchor'
}

const cardBolt = {
	liClass: 'card bolt',
	iClass: 'fa fa-bolt'
}

const cardCube = {
	liClass: 'card cube',
	iClass: 'fa fa-cube'
}

const cardLeaf = {
	liClass: 'card leaf',
	iClass: 'fa fa-leaf'
}

const cardBicycle = {
	liClass: 'card bicycle',
	iClass: 'fa fa-bicycle'
}	

const cardBomb = {
	liClass: 'card bomb',
	iClass: 'fa fa-bomb'
}

// create function to send each card object to an array
function sendCardObj(...cardObj) {
	for (const item of cardObj) {
		myCardList.push(item);
	}
}

// send card objects to the array
sendCardObj(cardDiamond, cardPaperplane, cardAnchor, cardBolt, cardCube, cardLeaf, cardBicycle, cardBomb);


// create function to generate our HTML
function createCardsHTML(cards) {
	const cardHTML = `<li class='${cards.liClass}'>
											<i class='${cards.iClass}'></i>
										</li>`
	return cardHTML;
}

// create function which loops through our array and generates html for each card
function injectCardGrid(funcShuffle) {
	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < myCardList.length; j++) {
			cardContainer.innerHTML += createCardsHTML(myCardList[j]);
		}
	}
}


/*
 *-------------------------------
 *
 *    App Helper Functions
 *
 *-------------------------------
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
    console.log('I shuffled');
}

// toggle CSS classes for showing a card
function showCard(selCard) {
	selCard.classList.toggle('show');
	selCard.classList.toggle('open');
}

// toggle CSS class for when cards do not match
function noMatch(card) {
	card.classList.toggle('no-match');
}

// store flipped cards (no more than two) to an array for evaluation
function storeCards(selCards) {
	storedCardsArr.push(selCards);
}

function pushMatchedCards(card) {
	matchedCards.push(card);
}

// toggle CSS class for cards when they match
function cardsMatch(matchedEl) {
	matchedEl.classList.toggle('match');
}

// set initial value for a player's moves (default is 0)
function setMoves() {
	movesEl.textContent = movesCounter;

}

// increment the moves counter by 1 after each guess
function incrMoves() {
	movesCounter++;
	setMoves();
}

// add or remove eventlistner. The primary event listener is added, removed, then
// added again to prevent users from clicking an additional card during a match
// evaluation. There is probably a better way to accomplish this but this was
// the only way I could accomplish the desired functionality
function setEvt(bool) {
	if (bool === true) {
		cardContainer.addEventListener('click', playGame);
	} else {
		cardContainer.removeEventListener('click', playGame);
	}
}

function showReset(bool) {
	if (bool === true) {
		document.querySelector('.game-reset').style.display = 'block';
		console.log('show reset');
	} else {
		document.querySelector('.game-reset').style.display = 'none';
		console.log('hide reset');
	}
}

// const domCards = function() {
// 	const allCards = document.querySelectorAll('.card');
// 	const cardList = [...allCards];

// 	return cardList;
// }

/*
 *-------------------------------
 *
 *    Playing the Game
 *
 *-------------------------------
*/
const playGame = function(e) {
	setEvt(true);
	const elClicked = e.target;

	if (elClicked.nodeName === 'LI') {
		showCard(elClicked);
		storeCards(elClicked);
		console.log(elClicked);
	}

	if (storedCardsArr.length === 2) {		
		const firstCard = storedCardsArr[0].classList;
		const secondCard = storedCardsArr[1].classList;
		let firstCardList = [...firstCard];
		let secondCardList = [...secondCard];
		setEvt();
		incrMoves();

		if (firstCardList.sort().toString() === secondCardList.sort().toString()) {
			cardsMatch(storedCardsArr[0]);
			cardsMatch(storedCardsArr[1]);
			pushMatchedCards(storedCardsArr[0]);
			pushMatchedCards(storedCardsArr[1]);
			storedCardsArr.length = 0;
			setEvt(true);
		} else {
			noMatch(storedCardsArr[0]);
			noMatch(storedCardsArr[1]);
			setTimeout(function() {
				showCard(storedCardsArr[0]);
				showCard(storedCardsArr[1]);
				noMatch(storedCardsArr[0]);
				noMatch(storedCardsArr[1]);
				storedCardsArr.length = 0;
				setEvt(true);
			}, 1000);
		}
	}

	if (matchedCards.length === 16) {
		console.log("GAME WON");
		setEvt();
		victoryModal.style.display = 'block';
	}

}

/*
 *-------------------------------
 *
 *    Initialize & Restart Game
 *
 *-------------------------------
*/
function initGame() {
	setMoves();
	injectCardGrid();
	// shuffle(domCards());
	playGame();
}

// Start game and clear ready modal
const startGame = document.getElementById('btnStartGame');
startGame.addEventListener('click', function(e) {
	const modalBtn = e.target;
	const readyModal = document.querySelector('.ready-modal');

	if (modalBtn) {
		readyModal.style.display = 'none';
		initGame();
	}

});

const restartGame = document.getElementById('restartGame');
restartGame.addEventListener('click', function(e) {
	const restart = e.target;

	if (restart) {

		const cardNodeList = document.querySelectorAll('.card');
		let eachCard = [...cardNodeList];

		for (const item of cardNodeList) {
			cardContainer.removeChild(item);
		}
	}
	showReset(true);
	setTimeout(function() {
		showReset();
	}, 2500);
	
	initGame();
	
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

