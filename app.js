// My former teacher who instructed the HTML & CSS class i took helped me with some of the Javascript.

// Object literal with methods was easier and neater for me to understand/follow.

// Game keys and values
const gameSpecs = {
	rules: {
		baseURL: "https://deckofcardsapi.com/api/deck/",
		aces: "low",
		scoreToWin: 21,
		faceCardValues: {
			ACE: 1,
			JACK: 10,
			QUEEN: 10,
			KING: 10,
		},
		deck: null,
	},

	// Method name and function
	// Generate a new deck(shuffled) with the count of 1
	newDeck() {
		$.ajax({
			url: gameSpecs.rules.baseURL + "new/shuffle/?deck_count=1",
			success(data) {
				gameSpecs.rules.deck = data
			},
		})
		return gameSpecs.rules.deck
	},

	// Draw a card
	dealCards(deck, count) {
		$.ajax({
			url:
				gameSpecs.rules.baseURL + "/" + deck.deck_id + "/draw/?count=" + count,

			error() {
				console.log("An error has occurred")
			},
			success(data) {
				gameSpecs.rules.deck = data
				gameSpecs.placeCards(gameSpecs.rules.deck)
			},
		})
		return gameSpecs.rules.deck
	},

	// Use the values from gameSpecs to assign face cards a value.
	faceCardValues(card) {
		const cardValueMatch = Object.keys(gameSpecs.rules.faceCardValues).find(
			(key) => key === card.value
		)
		return cardValueMatch
			? gameSpecs.rules.faceCardValues[cardValueMatch]
			: Number(card.value)
	},

	// Ace is default to 1 (low). This will change the value
	aceValue(aceType) {
		const aceValue = aceType === "high" ? 11 : 1
		gameSpecs.rules.faceCardValues["ACE"] = aceValue
		return aceValue
	},

	// If the Ace value is set to 11 (high)
	// https://www.educba.com/jquery-prop-checked/
	// This site helped me understand .prop and how to use it.
	aceStatus(aceType) {
		$('input[value="' + aceType + '"]').prop("checked", true)
	},

	game() {
		gameSpecs.newDeck()
		gameSpecs.aceValue(gameSpecs.rules.aces)
		gameSpecs.aceStatus(gameSpecs.rules.aces)
	},

	// Placing/Rendering the cards on the screen and using DOM manipulation
	placeCards(deck) {
		const player1 = gameSpecs.rules.deck.cards[0]
		const computer = gameSpecs.rules.deck.cards[1]

		const playerScore = gameSpecs.score(
			$("#playerscore"),
			gameSpecs.faceCardValues(player1)
		)
		const computerScore = gameSpecs.score(
			$("#computerscore"),
			gameSpecs.faceCardValues(computer)
		)

		$('<div class="card">')
			.append($("<img>").attr("src", player1.image))
			.appendTo($("#playercard"))

		$('<div class="card">')
			.append($("<img>").attr("src", computer.image))
			.appendTo($("#computercard"))

		$("#playerscore").html(playerScore)
		$("#computerscore").html(computerScore)

		gameSpecs.winner(playerScore, computerScore)
	},

	// Keeping Score
	score(playerScore, score) {
		const currentScore = parseInt(playerScore.html())
		const newScore = currentScore + score
		return newScore
	},

	// Determining the winner
	winner(player1, computer) {
		const results = $("#result")
		const topScore = gameSpecs.rules.scoreToWin

		if (
			(player1 === topScore && computer === topScore) ||
			(player1 > topScore && computer > topScore)
		) {
			results.html("<p>Draw</p>")
		} else if (player1 > topScore || computer === topScore) {
			results.html("<p>Player 2 Wins</p>")
		} else if (computer > topScore || player1 === topScore) {
			results.html("<p>Player 1 Wins</p>")
		}
	},

	// Reset Specs. Player & Computer score + removing the cards from the display.
	reset() {
		$(".card").remove()
		$("#playerscore").html(0)
		$("#computerscore").html(0)
		$("#result").html("")

		gameSpecs.newDeck(gameSpecs.rules.deck)
	},
}

$(document).ready(function () {
	// Initiate
	gameSpecs.game()

	// Click deal to draw card. Continue to click deal to draw addition cards.
	$("#deal").click(function () {
		if (
			$("#playerscore").html() < gameSpecs.rules.scoreToWin &&
			$("#computerscore").html() < gameSpecs.rules.scoreToWin
		) {
			gameSpecs.dealCards(gameSpecs.rules.deck, 2)
		}
	})

	// Click reset to clear the score and the cards from the screen.
	$("#reset").click(function () {
		gameSpecs.reset()
	})

	// Allows the toggle between ace values, based on the users preference.
	$("input[name='acesValue']").change(function (e) {
		gameSpecs.aceValue(this.value)
	})
})
