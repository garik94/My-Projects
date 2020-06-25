$(document).ready(function(){

	/*********************************************************************
	***********constructor Card -inherited from Object *******************
	**********************************************************************/

	// it is an one game card

	function Card(rank,suit,face_up=true){
		const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "D", "K"];
		const SUITS = ["c", "d", "h", "s"];
		this.rank = rank;
		this.suit = suit;
		this.is_face_up = face_up;
	}

	Card.prototype.flip = function(){
		this.is_face_up = !this.is_face_up;
		
	}

	Card.prototype.hallo = function(){
		console.log("hallo");
		
	}

	Card.prototype.toString = function(){
		let rep;
		if (this.is_face_up) {
			rep = this.rank + this.suit
		}else{
			rep = "XX"
		}
		return rep;
	}

	card1 = new Card("A","d");
	console.log(card1);



	/*********************************************************************
	***************constructor Hand - inherited from Object***************
	**********************************************************************/

	// it is the set of cards,  that one player has

	function Hand(){
		this.cards = [];
	}

	Hand.prototype.toString = function(){
		let rep;
		if (this.cards.length) {
			rep = "";
			for(card of this.cards){
				rep += card + " "
			}
		}else{
			rep = "Empty"
		}
		return rep;
	}

	Hand.prototype.clear = function(){
		this.cards = [];
	}

	Hand.prototype.add = function(card){
		this.cards.push(card);
	}

	Hand.prototype.give = function(card,other_hand){
		this.cards.splice(this.cards.indexOf(card), 1);
		other_hand.cards.push(card);
	}

	Hand.prototype = new Card();
	Hand.prototype.constructor = Hand;
	Object.defineProperty(Hand.prototype, "constructor", {
  enumerable: false,
  value: Hand
});
	let hand1 = new Hand();
	console.log(hand1);

	/*********************************************************************
	***************constructor Deck -inherited from Hand****************
	**********************************************************************/

	

	let view = {};
	let model = {

	};
	let controller = {};

	console.log(view)
});