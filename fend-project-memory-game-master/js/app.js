/*
 * Create a list that holds all of your cards
 */
let allCard = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];
let container = document.querySelector('.container');
let stars = document.querySelector('.stars');
let star = document.getElementById('fa fa-star');
let movescount = document.querySelector('.moves');
let timer = document.querySelector('.time');
let deck = document.querySelector('.deck');
let restart = document.querySelector('.restart');
let starLiI = document.getElementById('.starList')
let star1 = 15;
let star2 = 20;
let star3 = 25;
let star4 = 30;
let moves = 0;
let second = 0;
let timeNow;
let cardsOpen = [];
let cardsMatch = [];
let iStar = document.querySelectorAll('.stars li');
let modalShowe = document.querySelector('.modal');
let buttonRestart = document.querySelector('.click');
let liCard = document.querySelectorAll('.card');
let allOpen = document.querySelectorAll('.open');
let allMatch = document.querySelectorAll('.match');



//createCards function which create Li element 
function creatCards() {
	let AllCardShuffle = shuffle(allCard);
	moves = 0;
	movescount.textContent = '0';
	timer.textContent = '0';
	for (let i = 0; i < AllCardShuffle.length; i++) {
		const list = document.createElement('li');
		list.innerHTML = '<i class="fa ' + AllCardShuffle[i] + '"></i>';
		list.classList.add("card");
		const ulDeck = document.querySelector('ul.deck');
		ulDeck.appendChild(list);
	}
	
	//call displayCards function
	displayCards();
	
	//call resetTimer function
    resetTimer(timeNow);
	second = 0;
	timer.innerHTML = second;
	
	//call setTimer function
    setTimer();
}



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






/* displayCards function that display the cards on the page, once card is clicked, 
it will be enshured that card class is not open, show or match, this condition will not count a second click on same card,
once condition is confermed, card will enter array and card will be given open class and show class */

function displayCards() {
	let liCard = document.querySelectorAll('.card');
	moves = 0;
	
	liCard.forEach(function(card) {
		card.addEventListener('click', function(e) {
			if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
			cardsOpen.push(card);
			card.classList.add('open', 'show');

			//call compareCards function
			compareCards();

				if (cardsOpen.length == 2) {
	
					//call compareCards function
					moveCountAndRaitingGame();
		  
					setTimeout(function() {
						cardsOpen.forEach(function(card) {
							card.classList.remove('open', 'show');
						});

						cardsOpen = [];

					}, 500); 
				} 
			}
		});
	});	
}




/*compareCards function that compare the cards, display cards if matched, 
matched cards will be added to array and will be given match class, 
once total matched cards in array is 16, results will be displayed which include time spent, moves and rating, 
also, play again option will be displayed*/

function compareCards() {
	let fristCard = cardsOpen[0].querySelector('i').classList.item(1);
	let sconedCard = cardsOpen[1].querySelector('i').classList.item(1);
	
	
	if (fristCard == sconedCard) {
		cardsMatch.push(fristCard);
		cardsMatch.push(sconedCard);
		cardsOpen[0].classList.add('match');
		cardsOpen[1].classList.add('match');
	}

	setTimeout(function() {
		if (cardsMatch.length == 16) {
			container.classList.add('hide');
			modalShowe.classList.add('show');
			
			const score = document.querySelector('div.body');
			clearInterval(timeNow);
			score.innerHTML = 'You did it in ' + second + ' seconds, and ' + moves + ' moves, and your rating is ' + rating + ' out of 4 stars';
	
		} 
	}, 800);

	buttonRestart.addEventListener('click', function() {
		container.classList.remove('hide');
		modalShowe.classList.remove('show');
		
		const ulDeck = document.querySelector('ul.deck');
		ulDeck.innerHTML = ' ';
		creatCards();
	});
}

/*rate depends on moves, at start, player will be given 4 star rating, 
once moves reach 15 rating will decline to 3 stars, and so on accod=rding to below condition*/

function moveCountAndRaitingGame() {
	moves++;
	movescount.innerHTML = moves;
	let iStar = document.querySelectorAll('.stars li');

		if (moves == star1) {
			console.log('move < 14');
			iStar.item(0).remove(1);
			rating = 3;

			} else if (moves == star2) {
					console.log('move < 19');
					iStar.item(0).remove(1);
					rating = 2;

					} else if (moves == star3) {
							console.log('move < 24');
							iStar.item(0).remove(1);
							rating = 1;

							} else if (moves == star4) {
									console.log('move <= 29');
									iStar.item(0).remove(1);
									rating = 0;

									}
											 
}



// once restart icon is clicked, game will re start 
function restartGame() {
	restart.addEventListener('click', function () {
		const ulDeck = document.querySelector('ul.deck');
		ulDeck.innerHTML = ' ';
		creatCards();
	});
}


function setTimer() {
	second = 0;

	timeNow = setInterval(function () {
				timer.innerHTML = second;
				second++;			
				},1000);
}


function resetTimer(timer) {
	
		clearInterval(timer);
}


// call restartGame function 
restartGame();


// call creatCards function
creatCards();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function

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