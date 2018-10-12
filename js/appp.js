
const memoryGame = function() {

	///////////////////////////////////////////
	//
	// Section: Global Variables
	//
	//////////////////////////////////////////

	const cardContainer = document.querySelector('.deck'),
				movesEl = document.getElementById('playerMoves'),
				cardClassList = [],
				matchedCards = [];

	let storedCards = [],
			movesCount = 0;

	///////////////////////////////////////////
	//
	// Section: Generate HTML
	//
	///////////////////////////////////////////

	/* 
		Create objects to hold the required
	  classes for each card
	*/
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

	/*
		Create function to that will create
		and add card HTML to the board
	*/
	const createAndInject = function() {

		/* 
			function to add each card object to 
			the cardClassList array 
		*/
		function sendCardObj(...cardObj) {
			for (const item of cardObj) {
				cardClassList.push(item);
			}
		}
		/*
			function that returns our card
			HTML
		*/
		function createCardsHTML(cards) {
			const cardHTML = `<li class='${cards.liClass}'>
													<i class='${cards.iClass}'></i>
												</li>`
			return cardHTML;
		}
		/*
			loop through the cardClassList array and add
			cards to the board
		*/
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


	///////////////////////////////////////////
	//
	// Section: Game Play 
	//
	///////////////////////////////////////////

	const playGame = function(e) {

		setEvt(true, cardContainer, playGame);
		const elClicked = e.target;

		if (elClicked.nodeName === 'LI') {

			showCard(elClicked, 'show', 'open');
			storeCards(elClicked, storedCards);

		}

		if (storedCards.length === 2) {
			// debugger;
			const firstCard = storedCards[0].classList;
			const secondCard = storedCards[1].classList;
			let firstCardList = [...firstCard];
			let secondCardList = [...secondCard];

			setEvt(false, cardContainer, playGame);
			// incrMoves(movesCount);

			if (firstCardList.sort().toString() === secondCardList.sort().toString()) {

				cardsMatch(storedCards[0]);
				cardsMatch(storedCards[1]);

				storeCards(storedCards[0], matchedCards);
				storeCards(storedCards[1], matchedCards);

				storedCards.length = 0;

				setEvt(true, cardContainer, playGame);

			} else {

				noMatch(storedCards[0], 'no-match');
				noMatch(storedCards[1], 'no-match');

				setTimeout(function() {

					showCard(storedCards[0], 'show', 'open' );
					showCard(storedCards[1], 'show', 'open' );

					noMatch(storedCards[0], 'no-match');
					noMatch(storedCards[1], 'no-match');

					storedCards.length = 0;

					setEvt(true, cardContainer, playGame);
				}, 1000);
			}
		}

		if (matchedCards.length === 16) {

			setEvt();
			victoryModal.style.display = 'block';
		}

	}


	///////////////////////////////////////////
	//
	// Section: Set Event Listeners 
	//
	///////////////////////////////////////////
























	///////////////////////////////////////////
	//
	// Section: Helper Functions
	//
	///////////////////////////////////////////

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

	// toggle CSS classes for showing a card
	const showCard = function(selCard, reqClassOne, reqClassTwo) {
		selCard.classList.toggle(reqClassOne);
		selCard.classList.toggle(reqClassTwo);
	}

	// toggle CSS class when cards do not match
	const noMatch = function(card, reqClass) {
		card.classList.toggle(reqClass);
	}

	// toggle CSS class when cards match
	const cardsMatch = function(card, reqClass) {
		card.classList.toggle(reqClass);
	}

	// store flipped cards (no more than two) to an array for evaluation
	const storeCards = function(card, reqArray) {
		reqArray.push(card);
	}

	// set initial value to the moves counter
	const setMoves = function(el, variable) {
		el.textContent = variable;
	}

	// increment moves counter following a turn
	const incrMoves = function(variable) {
		variable++;
		setMoves();
	}

	/*
		Add or remove eventlistener. The primary eventlistener is added,
		removed, then added again to prevent users from clicking an
		additional card during a match evaluation. There is probably a
		better way to accomplish this but, this was the only way I could
		get the desired functionality...
	*/
	const setEvt = function(bool, variable, func) {
		if (bool === true) {
			variable.addEventListener('click', func);
		} else {
			variable.removeEventListener('click', func);
		}
	}

	// toggle reset message if user resets the game
	const showReset = function(bool) {
		if (bool === true) {
			document.querySelector('.game-reset').style.display = 'block';
		} else {
			document.querySelector('.game-reset').style.display = 'none';
		}
	}




	createAndInject();
	playGame();
} // end memoryGame

memoryGame();





