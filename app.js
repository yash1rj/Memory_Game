const cards = document.querySelectorAll('.memory-card');

const restartBtn = document.querySelector(".restart-btn");

let hasFlipped = false;
let firstCard, secondCard;

/* We have to lock the board to avoid two sets of cards being turned at the same time, otherwise the flipping will fail. */
let lockBoard = false;

function flipCard() {
	if(lockBoard) return; // This condition will prevent any card flipping before the cards are hidden or match
	
	// To prevent Same Card Click, let’s check if the current clicked card is equal to the firstCard and return if positive.
	if(this === firstCard) return;
	
	this.classList.add("flip");
	
	if(!hasFlipped) {
		// first click
		hasFlipped = true;
		firstCard = this;
		// console.log({hasFlipped, firstCard});
		firstCard.classList.add("flipped");
		return;
	}
	
	// second click
	secondCard = this;
	// console.log({firstCard, secondCard});

	// Do the cards match?
	checkForMatch();
}

function checkForMatch() {
	//console.log(firstCard.dataset.framework);
	// console.log(secondCard.dataset.framework);
	/*
	if(firstCard.dataset.framework === secondCard.dataset.framework) {
		// It's a match
		disableCards();
	}
	else {
		// Not a match
		unflipCards();
	}
	*/
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
	isMatch ? disableCards() : unflipCards();
}

let counter = 0;

function disableCards() {
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);
	
	firstCard.classList.add("flipped");
	secondCard.classList.add("flipped");
	
	counter++;
	// console.log(counter);
	
	resetBoard();
	
	if(counter === 6) {
		unflipAll();
		alert("You have won! Congrats!!");
	}
}

function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");
		
		resetBoard();
	},1200);
	firstCard.classList.remove("flipped");
	secondCard.classList.remove("flipped");
}

function resetBoard() {
	// The firstCard and secondCard variables need to be reset after each round
	[hasFlipped, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
	/*
	When display: flex is declared on the container, flex-items are arranged by the following hierarchy: group and source order. Each group is defined by the order property, which holds a positive or negative integer. By default, each flex-item has its order property set to 0, which means they all belong to the same group and will be laid out by source order. If there is more than one group, elements are firstly arranged by ascending group order.
	*/
	cards.forEach((card) => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();

function unflipAll() {
	const flippedCards = document.querySelectorAll('.flipped');
	// console.log(flippedCards);
	counter = 0;
	flippedCards.forEach((card) => {
		// console.log(card);
		card.classList.remove("flip");
		card.addEventListener("click", flipCard);
	});
}

/*
To flip the card when clicked, a class flip is added to the element. For that, we'll select all memory-card elements with document.querySelectorAll. Then loop through them with forEach and attach an event listener. Every time a card gets clicked flipCard function will be fired. The this variable represents the card that was clicked. The function accesses the element’s classList and toggles the flip class
*/
cards.forEach((card) => card.addEventListener("click", flipCard));

restartBtn.addEventListener("click", unflipAll);