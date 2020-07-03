/*********************************************************************
*****************Class Card -inherited from Object *******************
**********************************************************************/

// it is an one game card

class Card{

	// static RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	// static SUITS = ["C", "D", "H", "S"];

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
	// static ACE_VALUE = 1

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
