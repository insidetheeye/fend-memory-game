
const memoryGame = function() {

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Section: Global Variables
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	const cardContainer = document.querySelector('.deck'),
				movesEl = document.getElementById('playerMoves'),
				cardClassList = [],
				matchedCards = [];

	let storedCards = [],
			movesCount = 0;

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Section: Generate HTML
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

	const createAndInject = function() {

		function sendCardObj(...cardObj) {
			for (const item of cardObj) {
				cardClassList.push(item);
			}
		}

		function createCardsHTML(cards) {
			const cardHTML = `<li class='${cards.liClass}'>
													<i class='${cards.iClass}'></i>
												</li>`
			return cardHTML;
		}

		function injectCardGrid() {
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < cardClassList.length; j++) {
					cardContainer.innerHTML += createCardsHTML(cardClassList[j]);
				}
			}
		}

		sendCardObj(
			cardDiamond,
			cardPaperplane,
			cardAnchor,
			cardBolt,
			cardCube,
			cardLeaf,
			cardBicycle,
			cardBomb );

		shuffle(cardClassList);

		injectCardGrid();

	}

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Section: App Helper Functions
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

	createAndInject();
// end memoryGame 
}

memoryGame(console.log('memory game executed'));





