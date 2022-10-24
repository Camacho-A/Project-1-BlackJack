const baseURL = "https://deckofcardsapi.com/"


const gameSpecs = {
	aces: "low",
	scoreToWin: 21,
	faceCardsValues: {
		Ace: 1,
		Jack: 10,
		Queen: 10,
		King: 10,
	},

}
// Draw two cards, plus passes the deck_id in the parameters deck_ID
function dealCards(deck_ID) {
	const deckRequestURL = `${baseURL}api/deck/${deck_ID}/draw/?count=2`
	$.ajax(deckRequestURL)
		.then((data) => {
			const draw = data.cards
			console.log(draw)
		},
		(error) => {
			console.log("An error occurred")
		}
	)
	
}

// this function will generate a new deck with the count of 6(shuffled) with a new deck id 
function newDecks() {
	const newDeckURL = `${baseURL}api/deck/new/shuffle/?deck_count=6`
	$.ajax(newDeckURL)
		.then((data) => {
			console.log(data)
			const $playerOneHand = $(".player-one-hand")
			const $computerHand = $(".computer-hand")

			const deck_ID = data.deck_id

			dealCards(deck_ID)
		},
		(error) => {
			console.log("An error occurred")
		}
	)
}


// create click for deal
const dealButton = document.getElementById("deal")
dealButton.addEventListener("click", function () {
	if (
		$("#player-one-score").html() < gameSpecs.scoreToWin &&
		$("#computer-score").html() < gameSpecs.scoreToWin
	) 
	console.log("it works")
})

// create click for reset. this also resets the score
const resetButton = document.getElementById("reset")
resetButton.addEventListener("click", function () {
	$(".player-one-score").html(0)
	$(".computer-score").html(0)
	$("#result").html("")

	console.log("reset works")
})










newDecks()











          

