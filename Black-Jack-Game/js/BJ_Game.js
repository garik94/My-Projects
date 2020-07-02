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




