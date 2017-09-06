// GLOBAL VARIABLES
var colorsArr = ['R', 'B' , 'G', 'Y'];  //all possible colors for Simon to pick
var turn = 0;  //this is the turn or level counter for each step in the game
var aiSequence = [];
var simonColorPick;
var humanPress;
var simonSaysCounter = 0;
var checkingCounter = 0;
var gamePlaying = false;  //game status - will be affected by the on off button
var status = 'correct';
var strict = false;

//AUDIO FILES
var audio0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

// initialize event listeners 
$(document).ready(() => {
	$('#wrong').hide();
	$('#on').on('click', () => {
		gamePlaying = true;
		setTimeout(simonTurn(), 500);
		// simonTurn();
	});
	$('#off').on('click', () => {
		gamePlaying = false;
	});
});


// this is what happens when a play button gets clicked by user.
var humanButtonPress = (buttonPressedIndex) => {
	humanPress = buttonPressedIndex;
	//check human press against ai[checkCounter index]
	checkHumMove();	
	checkingCounter++;
	console.log('checking counter:' + checkingCounter);
	// this is to make sure simon doesnt start before you have pressed all the buttons
	if (checkingCounter == aiSequence.length && status == 'correct'){
		checkingCounter = 0;
		setTimeout(() => {
			simonTurn();				
		}, 1000);
	} 
	if (status === 'error'  && strict == false){
		$('#counter').text(' --');
		simonSaysCounter = 0;
		checkingCounter = 0;
		setTimeout(() => {
			$('#counter').text(turn);		
			simonSays();
			status = 'correct';
		}, 1000);
	}
};

var strictMode = () => {
	if(strict == false) {
		strict = true;
	} else{
		strict = false;
	}
};

var checkHumMove = () => {
	if (aiSequence[checkingCounter] === humanPress){
		console.log('correct');
		status = 'correct';
	} else {
		console.log('WRONGGGGGG');
		status = 'error';
		// simonSays();
	}
};
var simonSays = () => {
	aiArrayPlayBack(aiSequence[simonSaysCounter]);
	if (simonSaysCounter < aiSequence.length){
		simonSaysCounter++;
		setTimeout(simonSays, 800);
	}
};

var aiArrayPlayBack = (playing) => {
	switch (playing) {
	case 0: 
		$('#R').addClass('redHighlight');
		audio0.play();
		setTimeout(() => {
			$('#R').removeClass('redHighlight');
		}, 600);
		break;	
	case 1: 			
		$('#B').addClass('blueHighlight');		
		audio1.play();		
		setTimeout(() => {
			$('#B').removeClass('blueHighlight');			
		}, 600);
		break;
	case 2: 
		$('#G').addClass('greenHighlight');	
		audio2.play();			
		setTimeout(() => {
			$('#G').removeClass('greenHighlight');			
		}, 600);		
		break;
	case 3: 		
		$('#Y').addClass('yellowHighlight');		
		audio3.play();			
		setTimeout(() => {
			$('#Y').removeClass('yellowHighlight');				
		}, 600);					
	}
};

//picks the move for Simon to make
var pickNextColorIndex = () => {
	simonColorPick = Math.floor(Math.random()* 4);
};

// this will store the index of the color picked from pickNextColorIndex
var storeColor = () => {
	aiSequence.push(simonColorPick);
};

var simonTurn = () => {
	turn++;
	simonSaysCounter = 0;	
	$('#counter').text(turn);
	pickNextColorIndex();
	storeColor();	
	simonSays();
};
