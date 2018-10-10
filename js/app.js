// Global Variables
const cardContainer = document.querySelector('.deck');

let storedCardsArr = [];

const movesEl = document.getElementById('playerMoves');

let currentVal = 0;

const myCardList = [];


// Create and construct card grid
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

function sendCardObj(...cardObj) {
	for (const item of cardObj) {
		myCardList.push(item);
	}
}

sendCardObj(cardDiamond, cardPaperplane, cardAnchor, cardBolt, cardCube, cardLeaf, cardBicycle, cardBomb);

function createCardsHTML(cards) {
	const cardHTML = `<li class='${cards.liClass}'>
											<i class='${cards.iClass}'></i>
										</li>`
	return cardHTML;
}

function injectCardGrid(funcShuffle) {
	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < myCardList.length; j++) {
			cardContainer.innerHTML += createCardsHTML(myCardList[j]);
		}
	}
}
injectCardGrid(shuffle(myCardList));


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
}


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


 function showCard(selCard) {
 	selCard.classList.toggle('show');
 	selCard.classList.toggle('open');
 }

 function noMatch(card) {
 	card.classList.toggle('no-match');
 }

 function storeCards(selCards) {
 	storedCardsArr.push(selCards);
 }

 function cardsMatch(matchedEl) {
 	matchedEl.classList.toggle('.match');
 }

 function setMoves() {
 	movesEl.textContent = currentVal;

 }
 setMoves();

 function incrMoves() {
 	// debugger;
 	movesEl.textContent = currentVal++;
 }



 cardContainer.addEventListener('click', function(e) {
 	const elClicked = e.target;
 	
 	if (elClicked.nodeName === 'LI') {
 		showCard(elClicked);
 		storeCards(elClicked);
 	}

 	if (storedCardsArr.length === 2) {		
 		const firstCard = storedCardsArr[0].classList;
 		const secondCard = storedCardsArr[1].classList;
 		let firstCardList = [...firstCard];
 		let secondCardList = [...secondCard];

 		incrMoves();

 		if (firstCardList.sort().toString() === secondCardList.sort().toString()) {
 			// cards matched
 			storedCardsArr[0].classList.toggle('match');
 			storedCardsArr[1].classList.toggle('match');
 			storedCardsArr.length = 0;
 		} else {
 			// cards do not match
 			noMatch(storedCardsArr[0]);
 			noMatch(storedCardsArr[1]);
 			setTimeout(function() {
 				showCard(storedCardsArr[0]);
 				showCard(storedCardsArr[1]);
 				noMatch(storedCardsArr[0]);
 				noMatch(storedCardsArr[1]);
 				storedCardsArr.length = 0;
 			}, 1000);
 		}
 	}
 });

