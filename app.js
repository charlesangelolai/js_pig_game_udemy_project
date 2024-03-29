var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying){
		// 1. Generate random number
		// Bonus: 3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		console.log(dice1, dice2);
		
		// 2. Display the result
		//var diceDOM = document.querySelector('.dice');
		//diceDOM.style.display = 'block';
		//diceDOM.src = 'dice-' + dice + '.png';
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
		
		// 3. Update the round score IF the rolled number is NOT a 1
		if(dice1 === 6 && dice2 === 6){
			// Bonus: 1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();
		}
		else if(dice1 !== 1 && dice2 !== 1){
			// Add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
		else{
			// Next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
		// Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;
	
		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		// Bonus: 2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.
		var input = document.querySelector('.final-score').value;
		var winningScore;
		
		if(input){
			winningScore = input;
		}
		else{
			winningScore = 100;
		}
	
		// Check if player won the game
		if(scores[activePlayer] >= winningScore){
			
			diceDisplayNone();
			
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			
			gamePlaying = false;
		}
		else{
			// Next player
			nextPlayer();
		}
	}
});

function nextPlayer(){
	// Next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	
	document.getElementById('current-0'). textContent = '0';
	document.getElementById('current-0'). textContent = '1';
	
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	
	diceDisplay();
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	previousDice = 0;
	gamePlaying = true;
	
	diceDisplayNone();
	
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
}

function diceDisplayNone(){
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}



