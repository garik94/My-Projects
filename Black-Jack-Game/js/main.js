$(document).ready(function(){

	// let card1 = new Card("A","d");
	// //card1.flip();
	// console.log("card1",card1);

	// /*******************************************/
	// let hand1 = new Hand();
	// let hand2 = new Hand();
	// console.log("hand1",hand1);

	// /*******************************************/


	// let hands = [hand1,hand2]

	// let deck1 = new Deck();
	// deck1.populate();
	// deck1.shuffle();
	// deck1.deal(hands, 2)
	// console.log(deck1);

	// /*******************************************/

	// let bj_card1 = new BJ_Card("3","h");
	// console.log(bj_card1)

	// /*******************************************/

	// let bj_hand1 = new BJ_Hand();
	// bj_hand1.add(bj_card1);
	// console.log("bj_hand1",bj_hand1);
	// console.log("bj_hand1",bj_hand1.total);

	// /*******************************************/

	// let bj_player1 = new BJ_Player("garik");
	// bj_player1.add(bj_card1);
	// console.log("bj_player1",bj_player1);
	// console.log("bj_player1",bj_player1.total);
	// // bj_player1.is_hitting();

	// /*******************************************/

	// let bj_dealer1 = new BJ_Dealer("garik");
	// bj_dealer1.add(bj_card1);
	// console.log("bj_dealer1",bj_dealer1);
	// console.log("bj_dealer1",bj_dealer1.total);

	// /*******************************************/


	// /*******************************************/

	// let bj_game = new BJ_Game(["Garik","Christina"]);
	// console.log("bj_game",bj_game);


	/*******************************************/


	// let view = {};
	// let model = {

	// };
	// let controller = {};

	// console.log(view)

	function main(){
		console.log("Welcome to the table of Black Jack")
		let names = [];
		let number = ask_number("How many players? (1-7)",1,8);
		for (let i =0; i<number;i++){
			let name = prompt("Enter the player name: ");
			names.push(name);
			console.log(names);
		}
		let game = new BJ_Game(names);
		let again;
		while (again != "n"){
			let deckLength;
			game.play();
			// Prints the rest of the deck
			deckLength = game.deck.toString().split(" ").length;
			console.log(deckLength);
			if (deckLength < 40){
				game.deck.clear()
	            game.deck.populate()
	            game.deck.shuffle()
			}
			again = ask_yes_no("\n Would you like to play once more? ")
		}
	}

	main()
});