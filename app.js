/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundscore, active, game, dicecpy, dice, limit;

init();

var diceDom = document.querySelector('.dice');
var diceDom2 = document.querySelector('.dice2');

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (game) {
        dice = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;



        //Display the result
        diceDom.style.display = 'block';
        diceDom2.style.display = 'block';
        //Update the image
        diceDom.src = 'dice-' + dice + '.png';
        diceDom2.src = 'dice-' + dice2 + '.png';

        if ((dice !== 1) && (dice2 !== 1)) {
            roundscore += (dice + dice2);
            document.querySelector('#current-' + active).textContent = roundscore;

            if (dice == dicecpy && dice == 6) {
                nextplayer();

            } else if (dice != dicecpy) {
                dicecpy = dice;
            }


        } else {
            nextplayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (game) {
        scores[active] += roundscore;
        document.querySelector('#score-' + active).textContent = scores[active];
        if (scores[active] >= limit) {
            document.getElementById('name-' + active).textContent = "Winner";
            diceDom.style.display = "none";
            diceDom2.style.display = "none";
            document.querySelector('.player-' + active + '-panel').classList.add('winner');
            document.querySelector('.player-' + active + '-panel').classList.remove('active');
            game = false;
        } else {
            nextplayer();

        }
    }

});

function nextplayer() {
    active === 0 ? active = 1 : active = 0;
    roundscore = 0;


    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    diceDom.style.display = 'none';
    diceDom2.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    dicecpy = 0
    active = 0;
    roundscore = 0;
    game = true;
    limit = parseInt(document.getElementById('limit').value);

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-' + active + '-panel').classList.add('active');

}