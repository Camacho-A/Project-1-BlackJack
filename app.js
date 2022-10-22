const baseURL = "https://deckofcardsapi.com/api/deck"
const newDeck = "/new/shuffle/?deck_count=6"
const gameSpecs = {
	aces: "low",
	scoreToWin: 21,
	faceCardsValues: {
		Ace: 1,
		Jack: 10,
		Queen: 10,
		King: 10,
    }
}


function decks () {
    const url = `${baseURL}${newDeck}`
    console.log(url)
         
}


document.getElementById('button').onclick = function() {
   alert("button was clicked");
}​;​
decks()



          

