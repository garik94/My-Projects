$(document).ready(function(){

	/*********************************************************************
	*****************Class Card -inherited from Object *******************
	**********************************************************************/

	// it is an one game card

	class Card{

		static RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
		static SUITS = ["C", "D", "H", "S"];

		constructor(rank,suit,face_up=true){
			this.rank = rank;
			this.suit = suit;
			this.is_face_up = face_up;
		}

		flip(){
			this.is_face_up = !this.is_face_up;
		}

		toString(){
			let rep;
			if (this.is_face_up) {
				rep = this.rank + this.suit
			}else{
				rep = "XX"
			}
			return rep;
		}
	}


	/*********************************************************************
	*****************Class BJ_Card -inherited from class Card ************
	**********************************************************************/

	// it`s a Black Jack card, where each card has it`s value
	// Here the Ace value depends on curent score of player.
	// it can be either 1 or 11;
	// the rest cards has fixed values;

	class BJ_Card extends Card{
		static ACE_VALUE = 1

		constructor(rank,suit,face_up=true){
			super(rank,suit,face_up=true);
		}

		get value(){
			let val;
			if(this.is_face_up){
				val = BJ_Card.RANKS.indexOf(this.rank)+1;
				if (val>10) {
					val=10;
				}
			}else{
				val = null;
			}

			return val;
		}
	}
	/******************************************************************************************************/

	/*********************************************************************
	***************Class Hand - inherited from Object***************
	**********************************************************************/

	// it is the set of cards,  that one player has

	class Hand{
		constructor(){
			this.cards = [];
		}

		toString(){
			let rep;
			if (this.cards.length) {
				rep = "";
				for(let card of this.cards){
					rep += card + " "
				}
			}else{
				rep = "Empty"
			}
			return rep;
		}

		clear(){
			this.cards = [];
		}

		add(card){
			this.cards.push(card);
		}

		give(card,other_hand){
			this.cards.splice(this.cards.indexOf(card), 1);
			other_hand.cards.push(card);
		}
	}



	/*********************************************************************
	***********************Class Deck -inherited from Hand****************
	**********************************************************************/

	class Deck extends Hand{
		constructor(){
			super ();
		}

	/*********************************************************************
	populate is a method with which i can create a Deck of cards with 52 cards
	**********************************************************************/

		populate(){
			for (let suit of Card.SUITS){
				for(let rank of Card.RANKS){
					this.add(new Card(rank,suit))
				}
			}
		}

	/*********************************************************************
	shuffle is a method with which i can shuffle the Deck of cards *******
	**********************************************************************/

		shuffle(){
			for (let i = this.cards.length - 1; i > 0; i--) {
				let j = Math.floor(Math.random()*(i+1));
				let t = this.cards[i];
				this.cards[i]= this.cards[j];
				this.cards[j] = t;
			}
		}

	/*********************************************************************
	deal is a method with which i can deal the cardsfrom the Deck of cards.
	If cards are over it alerts a message********************************
	**********************************************************************/

		deal(hands,per_hand = 1){
			for (let round = 1; round <= per_hand; round++) {
				for (let hand of hands) {
					if(this.cards.length>0){
						let top_card = this.cards[0];
						this.give(top_card, hand)
					}else{
						alert("I can not deal cards any more. Cards are Over!!!")
					}
				}
			}
		}
	}

	/*********************************************************************
	*****************Class BJ_Deck -inherited from class Deck ************
	**********************************************************************/

	// it`s a Black Jack deck, where it`s method populate adds to Array not
	// instance of Card rather instance of BJ_Card

	class BJ_Deck extends Deck{
		constructor(){
			super();
		}

		populate(){
			for (let suit of Card.SUITS){
				for(let rank of Card.RANKS){
					this.add(new BJ_Card(rank,suit))
				}
			}
		}

	}

	/*********************************************************************
	*****************Class BJ_Hand -inherited from class Hand ************
	**********************************************************************/

	// it`s a hand of black Jack cards of a player

	class BJ_Hand extends Hand{
		constructor(name){
			super();
			this.name = name;
		}

		toString(){
			let rep = this.name + " "+ super.toString();
			if (this.total) {
				rep+="("+ this.total+")"
			}
			return rep;
		}

		get total(){
			let t = 0;
			let contains_Ace = false;
			// if either card has value null; then the method also returns null
	        for (let card of this.cards) {
	        	if(!card.value){
	        		return "?";
	        	}
	        }

	        // We summarise the values of cards by considering one Ace as one point
	        // We find out if player has Ace
	        for (let card of this.cards) {
	        	t += card.value;
	        	if (card.value == BJ_Card.ACE_VALUE) {
	        		contains_Ace = true;
	        	}
	        }
	        
	        // If player has an Ace and t <=11; we cansider that Ace has value 11
	        if ((contains_Ace) && t<= 11){
	        	t+=10
	        }

	        return t;
		}

		isBusted(){
			return this.total >21;
		}
	}

	/*********************************************************************
	************Class BJ_Player -inherited from class BJ_Hand ************
	**********************************************************************/

	class BJ_Player extends BJ_Hand{
		is_hitting(){
			let response = ask_yes_no("\n" + this.name + " , will you take more cards? (y/n):");
			return response === "y";
		}

		bust(){
			alert(this.name + " iterated over!!!")
		}

		lose(){
			alert(this.name + " Lost!!!")
		}

		win(){
			alert(this.name + " Win!!!")
		}

		push(){
			alert(this.name + " Played with computer a Draw!!!")
		}

		// the methods above are additional and they also can be removed
	}


	/*********************************************************************
	************Class BJ_Dealer -inherited from class BJ_Hand ************
	**********************************************************************/

	class BJ_Dealer extends BJ_Hand{
		is_hitting(){
			return this.total < 17;
		}

		bust(){
			alert(this.name + " iterated over!!!")
		}

		flip_first_card(){
			let first_card = this.cards[0];
			first_card.flip();
		}
	}

	/***********************************************************************************************/

	/*********************************************************************
	***************Class BJ_Game - inherited from Object******************
	**********************************************************************/

	// The class creates the following properties
	//1. An Array players with new BJ_player objects in it
	//2 A new BJ_Dealer;
	//3 A new BJ_Deck;
	// The class has a getter still_playing, which informs who from BJ-Players plays yet
	// The class creates a protected method _additional_cards, which gives to a player an
	//additional card if the player isn`t busted and wants it;
	//And it has a method play that has the logic of game.


	class BJ_Game{
		constructor(names){
			this.players = [];
			for(let name of names){
				this.players.push(new BJ_Player(name));
			}
			this.dealer = new BJ_Dealer("Dealer");
			this.deck = new BJ_Deck();
			this.deck.populate();
			this.deck.shuffle();
		}

		get still_playing(){
			let sp = [];
			for( let player of this.players){
				if(!player.isBusted()){
					sp.push(player);
				}
			}
			return sp;
		}

		_additional_card(player){
			while (!player.isBusted() && player.is_hitting()){
				this.deck.deal([player]);
				console.log(player.toString())
				if(player.isBusted()){
					player.bust();
				}
			}
		}

		play(){
			// 2 cards dealed to everyone
			this.deck.deal(this.players, 2);
			this.deck.deal([this.dealer], 2);
			// the first card of the dealer flips
			this.dealer.flip_first_card();
			for(let player of this.players){
				console.log(player.toString())
			}
			console.log(this.dealer.toString());

			// Dealing additional cards to players
			for (let player of this.players){
				this._additional_card(player)
			}

			// the first card of dealer flips back
			this.dealer.flip_first_card();

			// If all the players itterated over, shows the hand of the dealer
			//else deal additional cards to the dealer

			if (this.still_playing.length<=0){
				console.log(this.dealer.toString());
			}else{
				console.log(this.dealer.toString());
				this._additional_card(this.dealer);
				// if the dealer is busted, then win all,who is still in game
				if(this.dealer.isBusted()){
					for(let player of this.still_playing){
						player.win();
					}
				}else{
						//Compares the totals of the players and the dealer
					for(let player of this.still_playing){
						if (player.total > this.dealer.total) {
							player.win();
						}else if(player.total < this.dealer.total){
							player.lose();
						}else{
							player.push();
						}
					}
				}
			}

			//deleting all the cards
			for(let player of this.players){
				player.clear();
			}
			this.dealer.clear();
		}
	}

/***********************************************************************************************/



	let view = {
		// this object is responsible for visual part of the game
		names: [],
		addCard: function(player, value){
			// Adds a card to a player
			let card = $("<div></div>").html(`<img class="card" src="img/cards/${value}.png" alt="${value}">`);
			let count = $(`.${player} .hand>div`).length;
			if (count) {
				$($(`.${player} .hand>div`)[count-1]).removeClass("totalBlock");
			}
			$(`.${player} .hand`).append(card);
			if(count){
				$(card).css("transform",`translateX(${(count*30)}%)`);
				if(player !== "fourth"){
					$(`.${player} .hand`).css("transform", "translateX(-15%)")
				}
			}
			card.addClass("totalBlock");
			
			
		},
		updateCard: function(player, value, number){
			// changes or flips the card of the player, in this game it only flips the card of the dealer.
			$(`.${player} .hand div:nth-child(${number})`).html(`<img class="card" src="img/cards/${value}.png" alt="${value}">`);
		},

		updateMessage(message){
			// updates the messageArrea
			$(".message h3").text(message)
		},

		updateTotal(player,total){
			// updates the total of the player
			$(`.${player} .totalBlock`).css("--total", `"${total}"`);
		},
		updateNames(names){
			// Sets the player names to their places
			let players = $("h5");
			players.each(function(i){
				if (names[i]){
					$(this).text(`${names[i]}`);
					$(this).css("opacity","1");
				}
				else{
					$(this).text(`Empty`);
					$(this).css("opacity","0.5");
				}
			});
			$(".dealer h5").text("Dealer");
			$(".dealer h5").css("opacity","1");
		},

		clearHand(player){
			// clears the player hand
			$(`.${player} .hand`).empty();
		}
	};

	let model = {
		// this object is responsible for the logical part of the game.
		// in this method will soon declared a new BJ_game
		names: [],
		game: undefined,
	};

	let controller = {
		// this object is responsible for controlling the flow of information between the model and the view.
		players: undefined, // players of the game
		curentPlayer: undefined, // the current Player, who does any action.
		dealer: undefined, // the dealer
		names: [],
		still_playing: undefined,
		curentPlayerIndex: undefined,
	
		setNames(){
			// Enables the demanded count of fields, for writing player names
			let number = $(this).val();
			for(let fields of $(".namesField input")){
				$(fields).attr("disabled",true);
			}
			$(".confirm").attr("disabled",true);
			for (let i = 1; i <= number; i++) {
				$(`#player${i}`).attr("disabled",false);
			}
			$(".confirm").attr("disabled",false);
		},

		getNames(){
			// gets player names from input elements
			for (let field of $(".namesField input")){
				if(!$(field).attr("disabled")){
					controller.names.push($(field).val());
				}
			};
		},

		sendNames(names,obj){
			// the method is responsible for sending information to objects model and view
			obj.names = names;
		},

		parsePlayers(player){
			// each player has it`s own place
			let place;
			switch(this.players.indexOf(player)){
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
			return place;
		},

		dealerTurn(){// does the dealer steps and finishes the game
			$(".yes_no_question").css("display", "none");
				
			setTimeout(function(){ // one second later
				// the first card of the dealer flips back
				model.game.dealer.flip_first_card();
				controller.dealer = model.game.dealer;// updates the dealer information in the controller
				let first_card = controller.dealer.cards[0]; // gets the first card of the dealer
				let place = "dealer";
				view.updateCard(place,first_card.toString(),1); // Updates the dealer's hand info
				view.updateTotal(place,controller.dealer.total);// Updates the dealer's hand total
				setTimeout(function(){//one second later
					// If all the players itterated over, says that the dealer wins
					//else deal additional cards to the dealer and ends the game
					controller.still_playing = model.game.still_playing;// updates the still playing players info
					if (controller.still_playing.length<=0){
						$(".message").css("display", "block");
						view.updateMessage(controller.dealer.toString()+" wins!!!");
						setTimeout(function(){ // three soconds later
							
							view.updateMessage("GAME OVER");
							setTimeout(function(){ // two seconds later
								$(".yes_no_again").css("display", "block"); // asks would you like to play once more
								//deleting all the cards
								for(let player of model.game.players){
									player.clear();
									let place = controller.parsePlayers(player);
									view.clearHand(place);
								}
								model.game.dealer.clear();
								view.clearHand("dealer");
								// 	Gets the rest of the deck
								deckLength = model.game.deck.toString().split(" ").length;
								if (deckLength < 40){
							 		model.game.deck.clear();
						            model.game.deck.populate();
						            model.game.deck.shuffle();
								}
							},2000)
						},3000);
					}else{
						//else deals additional cards to dealer. While dealer is hitting
						//then checks if the dealer itterates over or not and finishes the game
						let intr = setTimeout(function run(){ //one second later

							let i =0;// this will be needed to iterate still playing players
							//if the dealer's total < 17, deals him a card
							if(model.game.dealer.is_hitting()){
								model.game.deck.deal([model.game.dealer]);
								view.addCard("dealer",controller.dealer.cards[controller.dealer.cards.length-1].toString());
								view.updateTotal("dealer",controller.dealer.total);
								// if the dealer is busted, then writes a message
								//else calls the intr function again one minute later
								if(model.game.dealer.isBusted()){
									$(".message").css("display", "block");
									view.updateMessage(model.game.dealer.name + " iterated over!!!");
									
									setTimeout(function playerWin(){ //one second later
										view.updateMessage(controller.still_playing[i].name + " wins!!!");
										i++;// gets the next still playing player and executes the playerWin function again in 2 seconds
										if(i< controller.still_playing.length){
											setTimeout(playerWin,2000);
										}else{
											setTimeout(function(){ // three seconds later
												view.updateMessage("GAME OVER");
												setTimeout(function(){// two seconds later
													$(".yes_no_again").css("display", "block");
													//deleting all the cards
													for(let player of model.game.players){
														player.clear();
														let place = controller.parsePlayers(player);
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
												},2000)
												
											},3000);
											
										}
									},1000);
									
								}else{
									intr = setTimeout(run,1000);
								}
							//else if the dealer's total >=17 and <=21	
							}else if(!model.game.dealer.is_hitting() && !model.game.dealer.isBusted()){
								//Compares the totals of the players and the dealer
								setTimeout(function playerResult(){ // one second later
									$(".message").css("display", "block");
									if (controller.still_playing[i].total > controller.dealer.total) {
										view.updateMessage(controller.still_playing[i].name + " wins!!!");
									}else if(controller.still_playing[i].total < controller.dealer.total){
										view.updateMessage(controller.still_playing[i].name + " lost!!!");
									}else{
										view.updateMessage(controller.still_playing[i].name + " Played with computer a Draw!!!");
									}
									i++;// gets the next still playing player index
									if(i< controller.still_playing.length){
										setTimeout(playerResult,2000);
									}else{
										setTimeout(function(){ // 3 seconds later
											
											view.updateMessage("GAME OVER");
											setTimeout(function(){// two seconds later
												$(".yes_no_again").css("display", "block");
												//deleting all the cards
												for(let player of model.game.players){
													player.clear();
													let place = controller.parsePlayers(player);
													view.clearHand(place);
												}
												model.game.dealer.clear();
												view.clearHand("dealer");
												// 	gets the rest of the deck
												deckLength = model.game.deck.toString().split(" ").length;
												
												if (deckLength < 40){
											 		model.game.deck.clear();
										            model.game.deck.populate();
										            model.game.deck.shuffle();
												}
											},2000);
										},3000);
									};

								},1000);
							};
							
						},1000);
						
					};
					
				},1000);
				
			},1000);
		},
	};

	

	
	$(".play").click(function(){
		$(".start_page").css("display", "none"); // Closes the start window
		$(".count_names").css("display", "flex"); // Opens the count_names window
	});
	$(".count>div>input").click(controller.setNames); // opens the demanded fields to write names
	$(".confirm").click(function(event){
		event.preventDefault();
		controller.getNames();// Gets player names
		controller.sendNames(controller.names,model);// Sends the layer names to the model
		controller.sendNames(controller.names,view);//	Sends the layer names to the view
		$(".count_names").css("display", "none");// Closes the count_names window
		$(".game_start").css("display", "block");// Opens the game_start window
		//removes the entered names from input fields
		for (let field of $(".namesField input")){
			$(field).val("");
		};
		
	});

	$("#start").click(function(event){
		event.preventDefault();
		//starts the game by setting all the controller's properties to undefined
		controller.players = undefined;
		controller.curentPlayer = undefined;
		controller.dealer = undefined;
		controller.still_playing = undefined;
		controller.curentPlayerIndex = undefined;
		$(".game_start").css("display", "none");// closes the game_start window
		$(".message").css("display", "block"); // opens the message window
		view.updateMessage("Welcome to the table of Black Jack"); // Updates the messageArrea
		view.updateNames(view.names); // Displays player names on their places on the table
		model.game = new BJ_Game(model.names); // Declares a new game
		setTimeout(function(){ // after 3 seconds starts the following function
			
			$(".message").css("display", "none");// closes the message window
			view.updateMessage("");// Clears the message arrea
			let deckLength; // in the end this will be needed to get the length of the deck
			model.game.deck.deal(model.game.players, 2); // deals 2 cards per player
			controller.players = model.game.players;// sends players' information to the controller
			// Updates hands of players on the table and updates their totals
			for(let player of controller.players){
				let place = controller.parsePlayers(player);
				for(let card of player.cards){
					view.addCard(place,card.toString());
				}
				view.updateTotal(place,player.total);
			}
			model.game.deck.deal([model.game.dealer], 2);// deals 2 cards to the dealer
			// the first card of the dealer flips
			model.game.dealer.flip_first_card();
			controller.dealer = model.game.dealer;// sends dealer's information to the controller
			// updates the dealer hand  on the table and updates his total
			for(let card of controller.dealer.cards){
				let place = "dealer";
				view.addCard(place,card.toString());
				view.updateTotal(place,controller.dealer.total);
			}
			controller.players = model.game.players;// updates the information about the players in the controller
			controller.curentPlayerIndex = 0;// sets index, needed to get curent player
			controller.curentPlayer = controller.players[controller.curentPlayerIndex]; // gets the current player
			$(".yes_no_question h4").text(`${controller.curentPlayer.name} will you take more cards?`);
			$(".yes_no_question").css("display", "block");
			
			$("#yes").off().on("click",function(event){ // Player wants an additional card
				event.preventDefault();
				
				$(".yes_no_question").css("display", "none");// closes the yes_no_question window
				if (!controller.curentPlayer.isBusted()) {
					// if the curentplayer is not busted then deals him a card and updates his total
					model.game.deck.deal([controller.curentPlayer]);
					let place = controller.parsePlayers(controller.curentPlayer);
					view.addCard(place,controller.curentPlayer.cards[controller.curentPlayer.cards.length-1].toString());
					view.updateTotal(place,controller.curentPlayer.total);
					//checks again if the curentplayer is busted or not,if yes
					if(controller.curentPlayer.isBusted()){
						$(".message").css("display", "block");//opens the message window
						view.updateMessage(controller.curentPlayer.name + " iterated over!!!");
						// if the curent player is not the last player,takes the next player
						//and asks if he wants additional cards
						if(controller.curentPlayerIndex< controller.players.length-1){
							controller.curentPlayerIndex +=1;
							controller.curentPlayer = controller.players[controller.curentPlayerIndex];
							$(".yes_no_question h4").text(`${controller.curentPlayer.name} will you take more cards?`);
							$(".yes_no_question").css("display", "block");
						}else{//if the curent player is not the last player, then it's the turn of the dealer
							controller.dealerTurn();	
						}
					}else{
						$(".yes_no_question").css("display", "block");
					}
				}
			});

			$("#no").off().on("click",function(event){
				event.preventDefault();
				$(".message").css("display", "none");
				$(".yes_no_question").css("display", "none");
				// if the current player is not the last,then gets the next player
				if(controller.curentPlayerIndex< controller.players.length-1){
					controller.curentPlayerIndex +=1;
					controller.curentPlayer = controller.players[controller.curentPlayerIndex];
					
					$(".yes_no_question h4").text(`${controller.curentPlayer.name} will you take more cards?`);
					$(".yes_no_question").css("display", "block");
				}else{ // it's the turn of the dealer (happens the same as in the yes case)
					controller.dealerTurn();
				};
			});

		},3000);

	});

	$("#yes_again").click(function(event){
		event.preventDefault();
		$(".game_start").css("display", "block");
		$(".yes_no_again").css("display", "none");
		$(".message").css("display", "none");
		view.updateMessage("");
	});

	$("#no_again").click(function(event){
		event.preventDefault();
		$(".start_page").css("display", "block");
		$(".yes_no_again").css("display", "none");
		$(".message").css("display", "none");
		view.updateMessage("");
		controller.names = [];
		view.names = [];
		model.names = [];
		view.updateNames(view.names);
	});

});