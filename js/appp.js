
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
				time = document.getElementById('gameTimer'),
				cardClassList = [];

	let storedCards = [],
			matchedCards = [],
			movesCount = 0,
			seconds = 0,
			minutes = 0,
			hours = 0;


	///////////////////////////////////////////
	//
	// Section: Generate HTML
	//
	///////////////////////////////////////////

	 
	// Create objects class properties for each card
	
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

	// function which builds and adds the cards to game board
	const createAndInject = function() {

		// function to push each card object to an array
		function sendCardObj(...cardObj) {
			for (const item of cardObj) {
				cardClassList.push(item);
			}
		}

		// function which defines the HTML structure of each card
		function createCardsHTML(cards) {
			const cardHTML = `<li class='${cards.liClass}'>
													<i class='${cards.iClass}'></i>
												</li>`
			return cardHTML;
		}

		// function which loops through the array holding the card CSS properties
		// and adds the card HTML to the board
		function injectCardGrid() {
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < cardClassList.length; j++) {	
					cardContainer.innerHTML += createCardsHTML(cardClassList[j]);
					
				}
			}
		}

		// push card objects to the array
		sendCardObj(
			cardDiamond,
			cardPaperplane,
			cardAnchor,
			cardBolt,
			cardCube,
			cardLeaf,
			cardBicycle,
			cardBomb );
		
		// build and add the cards
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
			stopTimer();

			setTimeout(function() {
				victoryModal.style.display = 'block';
				gameFinished();
			}, 900);

		}

	}




	///////////////////////////////////////////
	//
	// Section: Helper Functions
	//
	///////////////////////////////////////////

	/*
		function to effectively shuffle cards once they are added to the page
		credit: https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order
	*/
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

	// game time stopwatch
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

    timer();
	}

	const timer = function() {
		t = setTimeout(addTime, 1000);
	}

	const clearTimer = function() {
		time.textContent = "00:00:00";
		seconds = 0;
		minutes = 0;
		hours = 0;
	}

	const stopTimer = function() {
		clearTimeout(t);
	}

	// function which removes stars based on user's performance.
	const starRating = function() {

		if (movesEl.innerHTML == '8' && matchedCards.length < 8) {
			stars[2].style.opacity = 0.2;
			stars[2].classList.remove('active');
		} 

		else if (movesEl.innerHTML == '16' && matchedCards.length < 16) {
			stars[1].style.opacity = 0.2;
			stars[1].classList.remove('active');
		}
	}

	// reset the game
	const reset = function() {

		const cards = [...card];

		for (let i = 0; i < cards.length; i++) {
			cards[i].classList.remove('show', 'open', 'match');
		}

		for (let i = 0; i < stars.length; i++) {
			stars[i].style.opacity = 1;
			stars[i].classList.add('active');
		}

		movesEl.textContent = 0;
		matchedCards = [];
		storedCards = [];
		clearTimer();
		shuffleDeck();
	}

	// function which returns a user's final stats (stars, moves, and time)
	const finalStats = function() {
		let numStars = document.querySelectorAll('.active');

		return {
			stars: numStars.length,
			moves: movesEl.innerHTML,
			time:  time.innerHTML
		}
	}

	/*
		function which writes out the user's final time. There is a check in
		place in the case there is a preceding 0 in the seconds, removing it 
		from the final time.
	*/
	const writeTime = function() {

		const userStats = finalStats();
		const split = userStats.time.split("");

		let timeArray = [],
				minutes,
				seconds,
				finalTime;

		timeArray.push(split);

		if (timeArray[0][3] === '0') {

			minutes = timeArray[0][4];
			seconds = timeArray[0][6].concat(timeArray[0][7]);

			finalTime = `${minutes} <span>minute(s) and</span> ${seconds} <span>second(s)</span>`;

		} else {

			minutes = timeArray[0][3].concat(timeArray[0][4]);
			seconds = timeArray[0][6].concat(timeArray[0][7]);

			finalTime = `${minutes} <span>minute(s) and</span> ${seconds} <span>second(s)</span>`;
		}

		return finalTime;
	}


	///////////////////////////////////////////
	//
	// Section: Modals
	//
	///////////////////////////////////////////

	// modal prompting user to begin
	const readyToPlay = function(e) {
		
		const btn = e.target;

		if (btn.nodeName === 'BUTTON') {

			readyModal.classList.add('fadeOut');

			setTimeout(function() {
				readyModal.style.display = 'none';
				readyModal.classList.remove('fadeOut');
			}, 900);
			
			timer();
			shuffleDeck();
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

	// victory modal
	const gameFinished = function(e) {
		const playAgain = document.getElementById('btnPlayAgain'),
					finished = document.getElementById('btnFinished'),
					userStats = finalStats();

		document.getElementById('playerStars').innerHTML = userStats.stars;
		document.getElementById('totalMoves').innerHTML = userStats.moves;
		document.getElementById('playerTime').innerHTML = writeTime();

		if (e.target === playAgain) {
			victoryModal.style.display = 'none';
			reset();
			playGame();
			timer();
		}

		else if (e.target === finished) {
			victoryModal.style.display = 'none';
			reset();
			readyModal.style.display = 'block';
		}		
	}


	///////////////////////////////////////////
	//
	// Section: Event Listeners
	//
	///////////////////////////////////////////

	readyModal.addEventListener('click', readyToPlay);
	restartBtn.addEventListener('click', resetGame);
	victoryModal.addEventListener('click', gameFinished);



	createAndInject();
	
	
	
 








