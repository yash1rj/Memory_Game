const cards = document.querySelectorAll('.memory-card');

const restartBtn = document.querySelector(".restart-btn");

let hasFlipped = false;
let firstCard, secondCard;

let moves = 0;
let cntr = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// stars list
let starsList = document.querySelectorAll(".stars li");

// close icon in modal
let closeicon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1");

let restart = document.getElementById("play-again");

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
	
	// Number of moves -- Rating
	moveCounter();
	
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
		// unflipAll();
		// alert("You have won! Congrats!!");

        // show congratulations modal
        modal.classList.add("show");
		
		// declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;
		
		//showing move and rating on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;

        //closeicon on modal
        closeModal();
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

function shuffleCards() {
	/*
	When display: flex is declared on the container, flex-items are arranged by the following hierarchy: group and source order. Each group is defined by the order property, which holds a positive or negative integer. By default, each flex-item has its order property set to 0, which means they all belong to the same group and will be laid out by source order. If there is more than one group, elements are firstly arranged by ascending group order.
	*/
	
	// reset moves
    moves = 0;
	cntr.innerHTML = moves;
	
	// reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
	
	cards.forEach((card) => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
}

function unflipAll() {
	const flippedCards = document.querySelectorAll('.flipped');
	// console.log(flippedCards);
	counter = 0;
	flippedCards.forEach((card) => {
		// console.log(card);
		card.classList.remove("flip");
		card.addEventListener("click", flipCard);
	});
	shuffleCards();
}

// Start the game
shuffleCards();

/*
To flip the card when clicked, a class flip is added to the element. For that, we'll select all memory-card elements with document.querySelectorAll. Then loop through them with forEach and attach an event listener. Every time a card gets clicked flipCard function will be fired. The this variable represents the card that was clicked. The function accesses the element’s classList and toggles the flip class
*/
cards.forEach((card) => card.addEventListener("click", flipCard));

restartBtn.addEventListener("click", unflipAll);

restart.addEventListener("click", playAgain);

// close icon on modal
function closeModal(){
	closeicon.addEventListener("click", function(e){
		modal.classList.remove("show");
		unflipAll();
		shuffleCards();
	});
}

// for user to play Again 
function playAgain(){
	modal.classList.remove("show");
	unflipAll();
	shuffleCards();
}

function moveCounter(){
    moves++;
	cntr.innerHTML = moves;

    // setting rates based on moves
    if (moves > 8 && moves <= 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 12){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
	// console.log(moves);
}
