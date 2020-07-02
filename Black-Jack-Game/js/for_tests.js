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

 	//the first game version in main.js
	function play(){
		controller.welcome();
		let number = controller.getNumber();
		let names = controller.getNames(number);
		controller.sendNames(names,model);
		controller.sendNames(names,view);
		view.updateNames(view.names);
		view.updateMessage("");
		model.game = new BJ_Game(model.names);
		let again;
		// while (again != "n"){
			let deckLength;
		// 	model.game.play();
		// 2 cards dealed to everyone
		model.game.deck.deal(model.game.players, 2);
		controller.players = model.game.players;
		console.log("this is",controller.players);
		for(let player of controller.players){
			let place;
			switch(controller.players.indexOf(player)){
				case 0:
				place = "first";
				break;
				case 1:
				place = "second";
				break;
				case 2:
				place = "third";
				break;
				case 3:
				place = "fourth";
				break;
				case 4:
				place = "fifth";
				break;
			}
			for(let card of player.cards){
				view.addCard(place,card.toString());
				
			}
			view.updateTotal(place,player.total)
		}
		model.game.deck.deal([model.game.dealer], 2);
		// the first card of the dealer flips
		model.game.dealer.flip_first_card();
		controller.dealer = model.game.dealer;
		for(let card of controller.dealer.cards){
			let place = "dealer";
			view.addCard(place,card.toString());
			view.updateTotal(place,controller.dealer.total);
		}
		// Dealing additional cards to players
		controller.players = model.game.players;
		for(let player of controller.players){
			let place;
			switch(controller.players.indexOf(player)){
				case 0:
				place = "first";
				break;
				case 1:
				place = "second";
				break;
				case 2:
				place = "third";
				break;
				case 3:
				place = "fourth";
				break;
				case 4:
				place = "fifth";
				break;
			}
			while (!player.isBusted() && player.is_hitting()){
				model.game.deck.deal([player]);
				view.addCard(place,player.cards[player.cards.length-1].toString());
				view.updateTotal(place,player.total)
				if(player.isBusted()){
					player.bust();
				}	
			}
		}
		// the first card of dealer flips back
		model.game.dealer.flip_first_card();
		controller.dealer = model.game.dealer;
		let first_card = controller.dealer.cards[0];
		let place = "dealer";
		view.updateCard(place,first_card.toString(),1);
		view.updateTotal(place,controller.dealer.total);
		// If all the players itterated over, shows the hand of the dealer
		//else deal additional cards to the dealer
		if (model.game.still_playing.length<=0){
			view.updateMessage(controller.dealer.toString()+" wins!!!");
		}else{
			while (!model.game.dealer.isBusted() && model.game.dealer.is_hitting()){
				model.game.deck.deal([model.game.dealer]);
				view.addCard("dealer",controller.dealer.cards[controller.dealer.cards.length-1].toString());
				view.updateTotal("dealer",controller.dealer.total)
				if(model.game.dealer.isBusted()){
					model.game.dealer.bust();
				}	
			}
			// if the dealer is busted, then win all,who is still in the game
			if(model.game.dealer.isBusted()){
				for(let player of model.game.still_playing){
					player.win();
				}
			}else{
					//Compares the totals of the players and the dealer
				for(let player of model.game.still_playing){
					if (player.total > model.game.dealer.total) {
						player.win();
					}else if(player.total < model.game.dealer.total){
						player.lose();
					}else{
						player.push();
					}
				}
			}
		}
		//deleting all the cards
		for(let player of model.game.players){
			player.clear();
			let place;
			switch(controller.players.indexOf(player)){
				case 0:
				place = "first";
				break;
				case 1:
				place = "second";
				break;
				case 2:
				place = "third";
				break;
				case 3:
				place = "fourth";
				break;
				case 4:
				place = "fifth";
				break;
			}
			view.clearHand(place);
		}
		model.game.dealer.clear();
		view.clearHand("dealer");
		// 	Prints the rest of the deck
		deckLength = model.game.deck.toString().split(" ").length;
		console.log(deckLength);
		if (deckLength < 40){
	 		model.game.deck.clear();
            model.game.deck.populate();
            model.game.deck.shuffle();
		}
		// 	again = ask_yes_no("\n Would you like to play once more? ")
		// }
	}