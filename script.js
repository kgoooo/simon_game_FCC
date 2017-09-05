// GLOBAL VARIABLES
var colorsArr = ['R', 'B' , 'G', 'Y'];  //all possible colors for Simon to pick
var turn = 0;  //this is the turn or level counter for each step in the game
var aiSequence = [];
var simonColorPick;
var humanPress;
var checkingCounter = 0;
var gamePlaying = false;  //game status - will be affected by the on off button

//AUDIO FILES
var audio0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

// initialize event listeners 
$(document).ready(() => {
	$('#on').on('click', () => {
		gamePlaying = true;
		console.log('You\'re playing!');
	});
	$('#off').on('click', () => {
		gamePlaying = false;
	});
});

var pickNextColorIndex = () => {
	simonColorPick = Math.floor(Math.random()* 4);
};

// this will store the index of the color picked from pickNextColorIndex
var storeColor = () => {
	aiSequence.push(simonColorPick);
};

var simonTurn = () => {
	turn++;
	$('#counter').text('turn:' + turn);
	pickNextColorIndex();
	storeColor();	
	// console.log('picked index' + colorsArr[simonColorPick]);
	// console.log(aiSequence);
	if(turn == 1) {
		$(`#${colorsArr[simonColorPick]}`).addClass('press');
		//play the sound for the color
		setTimeout(() => {
			$(`#${colorsArr[simonColorPick]}`).removeClass('press');
		}, 1000);
		//need to check if turn is 1  if its 1, it does normal play begin, but when >= 2, it has to then play back the entire array with add and remove classes.
	}
	if (turn >= 2 ) {
		aiArrayPlayBack();
		$(`#${colorsArr[simonColorPick]}`).addClass('press');
		//play the sound for the color
		setTimeout(() => {
			$(`#${colorsArr[simonColorPick]}`).removeClass('press');
		}, 1000);
		//need to check if turn is 1  if its 1, it does normal play begin, but when >= 2, it has to then play back the entire array with add and remove classes.
	}
	
};

simonTurn();

var humanTurn = () => {
	//turn is only as long as aiSequence.length
	//Human button press should run inside of here? that way its sort of a constant state while human keeps pushing buttons
	//checking counter goes ++ with every human button press
};

// this is what happens when a play button gets clicked by user.
var humanButtonPress = (buttonPressedIndex) => {
	humanPress = buttonPressedIndex;
	console.log('humanPress: ' + humanPress);
	//check human press against ai[checkCounter index]
	checkHumMove();	
	checkingCounter++;
	console.log('checking counter:' + checkingCounter);
	// this is to make sure simon doesnt start before you have pressed all the buttons
	if (checkingCounter == aiSequence.length){
		checkingCounter = 0;
		setTimeout(() => {
			simonTurn();				
		}, 1000)
	}
};

var checkHumMove = () => {
	if (aiSequence[checkingCounter] === humanPress){
		console.log('correct');
	}
};

var aiArrayPlayBack = () => {
	for (var i = 0; i < aiSequence.length; i++) {
		//add the press class and remove it for each item in squence
		//play the sound for each item in sequence.
		switch (aiSequence[i]) {
		case 0: 
			audio0.play();
			
			setTimeout(() => {
			}, 1000);
			break;			
		case 1: 
			setTimeout(() => {
				audio1.play();
			}, 1000);
			break;
		case 2: 
			setTimeout(() => {
				audio2.play();
			}, 1000);
			break;
		case 3: 
			setTimeout(() => {
				audio3.play();
			}, 1000);
			break;
		}
		// wait 1200ms before next play
	}
};