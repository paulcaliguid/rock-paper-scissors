function capitalizeFirstLetterOnly(string) {
    let returnString = string.toLowerCase();
    let firstCharacterUpperCased = returnString.charAt(0).toUpperCase();
    returnString = firstCharacterUpperCased + returnString.slice(1);
    return returnString;
}

function getComputerChoice() {
    let choiceNum = Math.floor(Math.random() * 3);

    switch (choiceNum) {
        case 0:
            return "Rock";
            break;
        case 1:
            return "Paper";
            break;
        default:
            return "Scissors";
    }
}

function playRound(playerSelection, computerSelection) {
    image1.classList.remove('image-win');
    image2.classList.remove('image-win');
    image1.setAttribute('src',`${playerSelection}.png`);
    image2.setAttribute('src',`${computerSelection}.png`);
    roundText.textContent = `Round: ${roundNumber}`;
    roundNumber++;;

    if (playerSelection === computerSelection) {
        image1.classList.add('image-win')
        image2.classList.add('image-win')
        roundNumber--;
        detailText.textContent = `Draw! Both players select ${playerSelection}`;
    } else if (playerSelection == 'Rock') {
        if (computerSelection == 'Paper') {
            computerScore += 1;
            image2.classList.add('image-win')
            detailText.textContent = `Computer wins round! ${computerSelection} beats ${playerSelection}`;
        } else { //computerSelection === 'Scissors
            playerScore += 1;
            image1.classList.add('image-win')
            detailText.textContent = `Player wins round! ${playerSelection} beats ${computerSelection}`;
        }
    } else if (playerSelection == 'Paper') {
        if (computerSelection == 'Scissors') {
            computerScore += 1;
            image2.classList.add('image-win')
            detailText.textContent = `Computer wins round! ${computerSelection} beats ${playerSelection}`;
        } else { //computerSelection === 'Rock
            playerScore += 1;
            image1.classList.add('image-win')
            detailText.textContent = `Player wins round! ${playerSelection} beats ${computerSelection}`;
        }
    } else { //chooses Scissors
        if (computerSelection == 'Rock') {
            computerScore += 1;
            image2.classList.add('image-win')
            detailText.textContent = `Computer wins round! ${computerSelection} beats ${playerSelection}`;
        } else { //computerSelection === 'Paper'
            playerScore += 1;
            image1.classList.add('image-win')
            detailText.textContent = `Player wins round! ${playerSelection} beats ${computerSelection}`;
        }
    }
    ScoreText.textContent = `Player: ${playerScore} Computer:${computerScore}`
}

//Initial Declarations
let playerScore = 0;
let computerScore = 0;
let roundNumber = 1;
let playerSelection = "";

const roundText = document.querySelector('#round');
const ScoreText = document.querySelector('#score');
const image1 = document.querySelector('#image1');
const image2 = document.querySelector('#image2')
const detailText = document.querySelector('#detail')

const buttonRock = document.querySelector('#rock');
const buttonPaper = document.querySelector('#paper');
const buttonScissors = document.querySelector('#scissors');
const buttonReset = document.querySelector('#reset');

buttonRock.addEventListener('click', (e) => {
    playerSelection = 'Rock';
    playRound(playerSelection, getComputerChoice());
    checkWin()
})

buttonPaper.addEventListener('click', (e) => {
    playerSelection = 'Paper';
    playRound(playerSelection, getComputerChoice());
    checkWin()
})

buttonScissors.addEventListener('click', (e) => {
    playerSelection = 'Scissors';
    playRound(playerSelection, getComputerChoice());
    checkWin()
})

buttonReset.addEventListener('click', (e) => {
    playerSelection = '';
    roundNumber = 1;
    playerScore = 0;
    computerScore = 0;
    image1.classList.remove('image-win');
    image2.classList.remove('image-win');
    image1.setAttribute('src',"Initial.png");
    image2.setAttribute('src',"Initial.png");
    roundText.textContent = "Round: ";
    ScoreText.textContent = "Player: 0 Computer:0";
    detailText.textContent = "Waiting for first move..";
    buttonRock.disabled = false;
    buttonPaper.disabled = false;
    buttonScissors.disabled = false;
})

function checkWin() {
    if (playerScore === 5){
        detailText.textContent += ". Player wins game!";
        buttonRock.disabled = true;
        buttonPaper.disabled = true;
        buttonScissors.disabled = true;
    } else if (computerScore === 5){
        detailText.textContent += ". Computer wins game!";
        buttonRock.disabled = true;
        buttonPaper.disabled = true;
        buttonScissors.disabled = true;
    }   
}