function Game(){

	/*Adding a method in the prototype of the object Number*/
	Number.prototype.toStr =function(){
		let str = String(this.valueOf());
		if(str.length===1){
			str = "0" + str;
		}
		return str;
	}

	/*Adding a method in the prototype of the object Set*/
	Set.prototype.last = function(){
		let last;
		for(let i of this){
			last = i;
		}
		return last;
	}

	let view = {
		//Metod gets a string message and shows it in 
		//message arrea.
		updateMessage: function(msg){
			let messageElement = document.getElementById("messageArea");
			messageElement.innerHTML = msg;
		},

		updateUserInfo: function(msg){
			let userInfo = document.getElementById("userInfo")
			userInfo.lastElementChild.innerHTML = msg;
		},

		updateComputerInfo: function(msg){
			let computerInfo = document.getElementById("computerInfo")
			computerInfo.lastElementChild.innerHTML = msg;
		},

		displayStartLocations: function(){
			for(let i of model.userField.ships){
				for(let j of i.location){
					let position = document.getElementById("u" + j);
					position.setAttribute("class", "locate");
				}
			}
		},

		displayHit: function(location){
			let hitElement = document.getElementById(location);
			hitElement.setAttribute("class", "hit");
		},

		displayMiss: function(location){
			let missElement = document.getElementById(location);
			missElement.setAttribute("class", "miss");
		}
	};

	function Field (fieldSize, shipsCount, ships, sunkShips, shipLength){
		this.fieldSize = fieldSize;
		this.shipsCount = shipsCount;
		this.ships = ships;
		this.sunkShips = sunkShips;
		this.shipLength = shipLength;
		this.isSunkCurentShip = false;
		this.win_loose = "loose";
	}

	Field.prototype.fireCheck = function(location){
		for (let ship of this.ships) {
			if (ship.location.indexOf(location)<0) {
				continue;
			} else {
				if(controller.turn === 1){
					controller.userDamagedShips.add(ship);
				}
				let index = ship.location.indexOf(location);
				ship.hits[index] = "hit";
				if(this.isSunk(ship)){
					this.sunkShips+=1;
					controller.userDamagedShips.delete(ship)
					this.isSunkCurentShip = true;
					
					view.updateUserInfo(`SUNK SHIPS: ${model.userField.sunkShips}`);
					view.updateComputerInfo(`SUNK SHIPS: ${model.computerField.sunkShips}`);
				}
				return true;
			}
		}

		this.isSunkCurentShip = false;
		return false;
	}

	Field.prototype.isSunk = function(ship){
		for (let i = 0; i < ship.location.length; i++) {
	    		if (ship.hits[i]!=="hit") {
	    			return false;
			}
		}
		return true;
	}

	Field.prototype.direction = function(){
		let dir = Math.floor(Math.random()*2);
		if(dir === 0) return "horizontal";
		return "vertical";
	}

	Field.prototype.collision = function(location){
		for(let ship of this.ships){
			if(ship.location.indexOf(location)>=0){
				return true;
			}
		}
		return false;
	}

	Field.prototype.shipsLocation = function(){
		for(var ship of this.ships){
			var shipDirection = this.direction();
			if (ship.location.length === this.shipLength.small){
				do{
					var row = Math.floor(Math.random()*this.fieldSize).toString();
					var col = Math.floor(Math.random()*this.fieldSize).toString();
					var location = row + col;
					var check = this.collision(location);
				} while (check == true);
				ship.location[0] = location;
			} else if(ship.location.length === this.shipLength.medium && shipDirection =="vertical"){
				do{
					var checkLocation = [];
					var col = Math.floor(Math.random()*this.fieldSize);
					var row = Math.floor(Math.random()*(this.fieldSize-1));
					var location = row.toString() + col.toString();
					checkLocation.push(location);
					for(let i =0; i<ship.location.length-1;i++){
						row++;
						location = row.toString() + col.toString();
						checkLocation.push(location);
					}
					for(loc of checkLocation){
						if (this.collision(loc)){
							var check = this.collision(loc);
							break;
						}
						else{var check=false}
					}
				} while (check);
				ship.location = checkLocation;
			} else if(ship.location.length === this.shipLength.medium && shipDirection =="horizontal"){
				do{
					var checkLocation = [];
					var col = Math.floor(Math.random()*(this.fieldSize-1));
					var row = Math.floor(Math.random()*(this.fieldSize));
					var location = row.toString() + col.toString();
					checkLocation.push(location);
					for(let i =0; i<ship.location.length-1;i++){
						col++;
						location = row.toString() + col.toString();
						checkLocation.push(location);
					}
					for(loc of checkLocation){
						if (this.collision(loc)){
							var check = this.collision(loc);
							break;
						}
						else{var check=false}
					}
				} while (check);
				ship.location = checkLocation;
			} else if(ship.location.length === this.shipLength.big && shipDirection =="vertical"){
				do{
					var checkLocation = [];
					var col = Math.floor(Math.random()*(this.fieldSize));
					var row = Math.floor(Math.random()*(this.fieldSize-2));
					var location = row.toString() + col.toString();
					checkLocation.push(location);
					for(let i =0; i<ship.location.length-1;i++){
						row++;
						location = row.toString() + col.toString();
						checkLocation.push(location);
					}
					for(loc of checkLocation){
						if (this.collision(loc)){
							var check = this.collision(loc);
							break;
						}
						else{var check=false}
					}
				} while (check);
				ship.location = checkLocation;
			} else if(ship.location.length === this.shipLength.big && shipDirection =="horizontal"){
				do{
					var checkLocation = [];
					var col = Math.floor(Math.random()*(this.fieldSize-2));
					var row = Math.floor(Math.random()*(this.fieldSize));
					var location = row.toString() + col.toString();
					checkLocation.push(location);
					for(let i =0; i<ship.location.length-1;i++){
						col++;
						location = row.toString() + col.toString();
						checkLocation.push(location);
					}
					for(loc of checkLocation){
						if (this.collision(loc)){
							var check = this.collision(loc);
							break;
						}
						else{var check=false}
					}
				} while (check);
				ship.location = checkLocation;
			}
		}
		return shipDirection;
	}

	// Object contains the logic of the game and dont't connected with the object view.
	let model = {
		userField: new Field(7,6, [{location:[""], hits:[""]},
								   {location:[""], hits:[""]},
								   {location:[""], hits:[""]},
								   {location:["",""], hits:["",""]},
								   {location:["",""], hits:["",""]},
								   {location:["","",""], hits:["","",""], direction:undefined},
								  ], 0 , { small:1,
										   medium:2,
										   big:3,}),
		computerField: new Field(7,6, [{location:[""], hits:[""]},
								   {location:[""], hits:[""]},
								   {location:[""], hits:[""]},
								   {location:["",""], hits:["",""]},
								   {location:["",""], hits:["",""]},
								   {location:["","",""], hits:["","",""]},
								  ], 0 , { small:1,
										   medium:2,
										   big:3,}),

		userFire: function(location){
			this.userField.fireCheck(location);
			return false;
		},

		computerFire: function(location){
			this.computerField.fireCheck(location);
			return false;
		},

		startGame: function(){
			this.userField.shipsLocation();
			this.computerField.shipsLocation();
			return false;
		},

		endGame: function(){
			var message;
			if(this.userField.win_loose=== "win" && this.computerField.win_loose=== "loose"){
				message = confirm("You win!!!\n Do you want to play once more? ");
			}else if(this.userField.win_loose=== "loose" && this.computerField.win_loose=== "win"){
				message = confirm("You Lost!!!\n Do you want to play once more? ");
			}
			
			if (message) {
				window.location.reload();
			}else{
				document.location.href='http://google.ru'
			}
		},
	}

	function parseGuess(guess){
		var alphabet = ["A","B","C","D","E","F","G"];
		if(guess == null || guess.length !== 2){
			alert("Oops, please enter a letter and a number on the board");
		} else{
			var firstChar = guess[0];
			var row = alphabet.indexOf(firstChar);
			var column = guess[1];
			if(isNaN(row) || isNaN(column)){
				alert("Oops, that isn`t on the board");
			}else if (row < 0 || row >=	model.computerField.fieldSize || column < 0 || column >= model.computerField.fieldSize ) {
				alert("Oops,that`s off the board");
			}
			else return row + column;
		}
		return null;
	}

	function randomLocation(){
		var row = Math.floor(Math.random()*model.userField.fieldSize);
		var col = Math.floor(Math.random()*model.userField.fieldSize);
		return row.toString() + col.toString();
	}


	// This object provides the connection between the objects view and model and holds some information about curent guess of computer or player

	let controller = {
		guesses: 0,
		computerGuessedLocs: [],
		compPrevHittedDirection: new Set(),
		compBackForward:[],
		userDamagedShips:new Set(),
		userGuessedLocs: [],
		turn:0,
		directionLTBR:function(){
			let random;
			let dir = model.computerField.direction();
			let side;
			if(dir === "horizontal"){
				random = Math.floor(Math.random()*2)
				if(random === 0){
					side = "horizontall"
				}else{
					side = "horizontalr"
				}
				
			}else if(dir === "vertical"){
				random = Math.floor(Math.random()*2)
				if(random === 0){
					side = "verticalt"
				}else{
					side = "verticalb"
				}
				
			}
			return side;
		},
		computerGuess: function(){
			let guess;
			let dir;
			let locs;
			

			if(this.userDamagedShips.last() === undefined){
				locs = this.userDamagedShips.last();
			} else {
				locs = this.userDamagedShips.last().hits;
				locs = locs.map(function(item,index) {
							if(item === "hit")
							return index;
							});
				locs = locs.filter(item => item !== undefined);
				for(let i=0; i<locs.length;i++){
					locs[i]=this.userDamagedShips.last().location[locs[i]];
				}	
			}
			if(typeof(this.userDamagedShips.last())==="undefined"){
				
				guess = randomLocation();
				while(controller.computerGuessedLocs.indexOf(guess)>=0){
				guess = randomLocation();
				}
			}else if(locs.length ===1){
				
				if(this.computerGuessedLocs.indexOf((Number(locs[0])-1).toStr())>=0){
					this.compPrevHittedDirection.add("horizontall");
				}
				if(this.computerGuessedLocs.indexOf((Number(locs[0])+1).toStr())>=0){
					this.compPrevHittedDirection.add("horizontalr");
				}
				if(this.computerGuessedLocs.indexOf((Number(locs[0])-10).toStr())>=0){
					this.compPrevHittedDirection.add("verticalt");
				}
				if(this.computerGuessedLocs.indexOf((Number(locs[0])+10).toStr())>=0){
					this.compPrevHittedDirection.add("verticalb");
				}

				do{
					dir = this.directionLTBR()
				}while(this.compPrevHittedDirection.has(dir)||(dir === "verticalt" && locs[0]<10)||(dir === "verticalb" && locs[0]>=60)||
					(dir === "horizontall" && locs[0][1]<1)|| (dir === "horizontalr" && locs[0][1]>=6))

				
				if(dir === "verticalt" && locs[0]>=10){
					guess =locs[0];
					guess = (Number(guess)-10).toStr();
					
				}else if (dir === "verticalb" && locs[0]<60) {
					guess =locs[0];
					guess = (Number(guess)+10).toStr();
					
				}else if(dir === "horizontall" &&locs[0][1]>=1){
					guess =locs[0];
					guess = (Number(guess)-1).toStr();
					
				}else if(dir === "horizontalr" && locs[0][1]<6){
					guess =locs[0];
					guess = (Number(guess)+1).toStr();
					
				}
				
				
				this.compPrevHittedDirection.add(dir);

			}else if(locs.length ===2){
				let dirGlobal = model.userField.ships[5].direction;
				let random;
				if (dirGlobal==="horizontal") {
					
					if(this.computerGuessedLocs.indexOf((Number(locs[1])+1).toStr())>=0){
						this.compBackForward.push(1);
					}else if(this.computerGuessedLocs.indexOf((Number(locs[0])-1).toStr())>=0){
						this.compBackForward.push(0);
					}	

					
					
				}else if (dirGlobal==="vertical") {
					
					if(this.computerGuessedLocs.indexOf((Number(locs[1])+10).toStr())>=0){
						this.compBackForward.push(1);
					}else if(this.computerGuessedLocs.indexOf((Number(locs[0])-10).toStr())>=0){
						this.compBackForward.push(0);
					}	
					
				}

				do{
					random = Math.floor(Math.random()*2)
				}while(this.compBackForward.indexOf(random)>=0)

				if(dirGlobal === "vertical" && random === 0 ){
					if(locs[0]>=10 ){
						guess = locs[0];
						guess = (Number(guess)-10).toStr();
					}else if(locs[0]<10 ){
						guess = locs[1];
						guess = (Number(guess)+10).toStr();
					
					}
				}else if(dirGlobal === "vertical" && random === 1){
					if(locs[1]<60 ){
						guess = locs[1];
						guess = (Number(guess)+10).toStr();
					}else if(locs[1]>=60 ){
						guess = locs[0];
						guess = (Number(guess)-10).toStr();
					}

				}else if(dirGlobal === "horizontal" && random === 0){
					if(locs[0][1]>=1){
						guess = locs[0];
						guess = (Number(guess)-1).toStr();
					}else if(locs[0][1]<1 ){
						guess = locs[1];
						guess = (Number(guess)+1).toStr();
					
					}

				}else if(dirGlobal === "horizontal" && random === 1 ){
					if(locs[1][1]<6){
						guess = locs[1];
						guess = (Number(guess)+1).toStr();
					}else if(locs[1][1]>=6 ){
						guess = locs[0];
						guess = (Number(guess)-1).toStr();
					}

				}
				this.compBackForward.push(random);

			}
			
			controller.computerGuessedLocs.push(guess);
			var computerHit = model.userField.fireCheck(guess);
			if (computerHit){
				view.displayHit("u"+ guess);
				view.updateMessage("Computer Hit!!!");
				
				if (this.userDamagedShips.last()!=undefined){
					if(this.userDamagedShips.last().hits.filter(item => item !== "").length === 2){
						model.userField.ships[5].direction = dir.slice(0,dir.length-1);
					}
				}
				
				
				
				if(model.userField.isSunkCurentShip){
					view.updateMessage("Computer sank one of your battleships'!!!");
					
					this.compPrevHittedDirection = new Set();
					this.compBackForward = [];
				}
				
				if (model.userField.sunkShips == model.userField.shipsCount) {
					view.updateMessage("Computer sank all your battleships , in " + this.guesses + "guesses");
					model.userField.win_loose= "loose";
					model.computerField.win_loose= "win";
					model.endGame();
					return false;//game over
				}
			}else {
				view.displayMiss("u"+ guess);
				view.updateMessage("Computer Missed!!!");
			}
		},
		processGuess:  function(guess){
			var location = parseGuess(guess);
			this.turn =0;
			if (location) {
				this.guesses++;
				var hit = model.computerField.fireCheck(location);
				if (hit){
					view.displayHit(location);
					view.updateMessage("Hit!!!");
					if(model.computerField.isSunkCurentShip){
						view.updateMessage("You sank one of the Computer's battleships!!!");
					}
					if (model.computerField.sunkShips == model.computerField.shipsCount) {
						view.updateMessage("You sank all the battleships of Computer, in " + this.guesses + "guesses");
						model.userField.win_loose= "win";
						model.computerField.win_loose= "loose";
						model.endGame();
						return false;//game over
					}
				}else {
					view.displayMiss(location);
					view.updateMessage("You Missed!!!");
				}
				this.turn=1;
				setTimeout(this.computerGuess.bind(controller), 1000);
				
			}
			return false;
		},
	}

	function handleFireButton(){
		var formElement = document.getElementById("guessInput");
		var guess = formElement.value.toUpperCase();
		if(controller.userGuessedLocs.indexOf(guess)>=0){
			formElement.value = ""
			alert("You have already tried this location!!!");
		}else{
			controller.userGuessedLocs.push(guess);
			controller.processGuess(guess);
		}
		formElement.value = "";
	}

	function handleKeyPress(e){
		var fireButton = document.getElementById("fireButton");
		if(e.keyCode === 13){
			fireButton.click();
			return false;
		}
	}
	

	function init(){
		model.startGame();
		/*model.userField.ships[0].location[0]="25";
		model.userField.ships[1].location[0]="45";
		model.userField.ships[2].location[0]="56";
		model.userField.ships[3].location[0]="34";
		model.userField.ships[3].location[1]="35";
		model.userField.ships[4].location[0]="15";
		model.userField.ships[4].location[1]="16";
		model.userField.ships[5].location[0]="04";
		model.userField.ships[5].location[1]="05";
		model.userField.ships[5].location[2]="06";*/ // for testing
		view.displayStartLocations();
		var fireButton = document.getElementById("fireButton");
		fireButton.onclick = handleFireButton;
		var guessInput = document.getElementById("guessInput");
		guessInput.onkeypress = handleKeyPress;
	}

	init();
	//console.log(model);
	//console.log(controller);

	/*model.userField.ships[0].location[0]="05";// for testing
	model.userField.ships[1].location[0]="53";
	model.userField.ships[2].location[0]="64";
	model.userField.ships[3].location[0]="13";
	model.userField.ships[3].location[1]="14";
	model.userField.ships[4].location[0]="22";
	model.userField.ships[4].location[1]="32";
	model.userField.ships[5].location[0]="33";
	model.userField.ships[5].location[1]="34";
	model.userField.ships[5].location[2]="35";

	controller.computerGuess("30");
	controller.computerGuess("61");
	controller.computerGuess("20");
	controller.computerGuess("24");
	controller.computerGuess("54");
	controller.computerGuess("04");
	controller.computerGuess("50");
	controller.computerGuess("11");
	controller.computerGuess("55");
	controller.computerGuess("22");
	controller.computerGuess("23");
	controller.computerGuess("05");
	//controller.computerGuess("42");
	//controller.computerGuess("06");
	//controller.computerGuess("26");
	//controller.computerGuess("15");
	//controller.computerGuess("26");
	//controller.computerGuess("06");
	//controller.computerGuess("26");
	//controller.computerGuess("15");
	//controller.computerGuess("33");*/
	
}

window.onload = Game;