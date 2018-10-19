


	///////////////////////////////////////////
	//
	// Section: Global Variables
	//
	//////////////////////////////////////////

	const cardContainer = document.getElementById('cardDeck'),
				card = document.getElementsByClassName('card'),
				movesEl = document.getElementById('playerMoves'),
				victoryModal = document.querySelector('.victory-modal'),
				readyModal = document.querySelector('.ready-to-play'),
				restartBtn = document.getElementById('restartGame'),
				stars = document.getElementsByClassName('fa-star'),
				cardClassList = [],
				matchedCards = [],
				deckArr = [];

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
		function that will create
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

		// shuffle(cardClassList);
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
			
			const firstCard = storedCards[0].classList;
			const secondCard = storedCards[1].classList;
			let firstCardList = [...firstCard];
			let secondCardList = [...secondCard];

			setEvt(false, cardContainer, playGame);
			incrMoves(movesEl);
			starRating();

			if (firstCardList.sort().toString() === secondCardList.sort().toString()) {

				cardsMatch(storedCards[0], 'match');
				cardsMatch(storedCards[1], 'match');

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

			setEvt(false, cardContainer, playGame);
			victoryModal.style.display = 'block';

		}

	}




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

	const shuffleDeck = function() {

		for (let i = cardContainer.children.length; i >= 0; i--) {
		    cardContainer.appendChild(cardContainer.children[Math.random() * i | 0]);
		}
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
		variable.textContent++;
		// setMoves();
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

	// stopwatch
	let seconds = 0,
			minutes = 0,
			hours = 0;

	const time = document.getElementById('gameTimer');

	const addTime = function() {

		seconds++;

		if (seconds >= 60) {
			seconds = 0;
			minutes++;

			if (minutes >= 60) {
				minutes = 0;
				hours++;
			}
		}

		time.textContent = 
		(hours ? (hours > 9 ? hours : "0" + hours) : "00") 
    + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") 
    + ":" + (seconds > 9 ? seconds : "0" + seconds);
	}

	const timer = function() {
		setTimeout(addTime, 1000);
	}

	
	// Function which removes stars based on user's performance.
	const starRating = function() {

		if (movesEl.innerHTML == '8' && matchedCards.length < 8) {
			stars[2].style.opacity = 0.2;
		} 

		else if (movesEl.innerHTML == '16' && matchedCards.length < 16) {
			stars[1].style.opacity = 0.2;
		}
	}

	// reset the game
	const reset = function() {
		/*
			Defining the cards variable at the global
			level wasn't populating the array. Defining
			locally does...unsure why this is
		*/
		const cards = [...card];

		for (let i = 0; i < cards.length; i++) {
			cards[i].classList.remove('show', 'open', 'match');
		}

		for (let i = 0; i < stars.length; i++) {
			stars[i].style.opacity = 1;
		}

		movesEl.textContent = 0;

	}


	///////////////////////////////////////////
	//
	// Section: Modals
	//
	///////////////////////////////////////////


	const readyToPlay = function(e) {
		
		const btn = e.target;

		if (btn.nodeName === 'BUTTON') {
			readyModal.classList.add('fadeOut');
			setTimeout(function() {
				readyModal.style.display = 'none';
			}, 900);
			timer();
			playGame();
		}
		
	}

	// restart button and corresponding modal

	const resetGame = function() {

		const resetMsg = document.querySelector('.game-reset');

		resetMsg.style.display = 'block';
		reset();
		setTimeout(function() {
			resetMsg.style.display = 'none';
		}, 1500);
	}


	///////////////////////////////////////////
	//
	// Section: Event Listeners
	//
	///////////////////////////////////////////

	readyModal.addEventListener('click', readyToPlay);
	restartBtn.addEventListener('click', resetGame);


	createAndInject();
	
	
	
 








