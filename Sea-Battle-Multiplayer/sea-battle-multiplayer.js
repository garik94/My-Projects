function Game(){
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
				let index = ship.location.indexOf(location);
				ship.hits[index] = "hit";
				if(this.isSunk(ship)){
					this.sunkShips+=1;
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


	let model = {
		userField: new Field(7,6, [{location:[""], hits:[""]},
								   {location:[""], hits:[""]},
								   {location:[""], hits:[""]},
								   {location:["",""], hits:["",""]},
								   {location:["",""], hits:["",""]},
								   {location:["","",""], hits:["","",""]},
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

	let controller = {
		guesses: 0,
		computerGuessedLocs: [],
		userGuessedLocs: [],
		computerGuess: function(){
			var guess = randomLocation();
			while(controller.computerGuessedLocs.indexOf(guess)>=0){
				guess = randomLocation();
			}
			controller.computerGuessedLocs.push(guess);
			var computerHit = model.userField.fireCheck(guess);
			if (computerHit){
				view.displayHit("u"+ guess);
				view.updateMessage("Computer Hit!!!");
				if(model.userField.isSunkCurentShip){
					view.updateMessage("Computer sank one of your battleships'!!!");
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
				setTimeout(this.computerGuess, 2000);
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
		view.displayStartLocations();
		var fireButton = document.getElementById("fireButton");
		fireButton.onclick = handleFireButton;
		var guessInput = document.getElementById("guessInput");
		guessInput.onkeypress = handleKeyPress;
	}

	init();
	//console.log(model);
	//console.log(controller);
	
}

window.onload = Game;