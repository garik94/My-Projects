// It is a class Player, which is responsible for creating players

class Player{
	constructor(name, score = 0){
		this.name = name;
		this.score = score;
	}

	toString(){
		let rep = this.name + ": " + this.score;
		return rep;
	}

}

function ask_yes_no(question){
	// Asks a question with answer yes or no
	let response;
	while(["y","n"].indexOf(response)<0){
		response = prompt(question).toLowerCase();
		if (["y","n"].indexOf(response)<0) {
			alert("False answer, Please answer again Y/N")
		}
	}

	return response;
}

function ask_number(question,low,high){
	// Asks to fill in a number from the setted diapason
	let response;
	while (response<low || response>=high || isNaN(response)){
		response = +prompt(question);
	}
	return response;

}