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