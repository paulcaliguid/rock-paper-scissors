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
    if (playerSelection === computerSelection) {
        return `Draw! Both players select ${playerSelection}`;
    } else if (playerSelection == 'Rock') {
        if (computerSelection == 'Paper') {
            computerScore+=1;
            return `Computer wins round! ${computerSelection} beats ${playerSelection}`;
        } else { //computerSelection === 'Scissors
            playerScore+=1;
            return `Player wins round! ${playerSelection} beats ${computerSelection}`;
        }
    } else if (playerSelection == 'Paper') {
        if (computerSelection == 'Scissors') {
            computerScore+=1;
            return `Computer wins round! ${computerSelection} beats ${playerSelection}`;
        } else { //computerSelection === 'Rock
            playerScore+=1;
            return `Player wins round! ${playerSelection} beats ${computerSelection}`;
        }
    } else { //chooses Scissors
        if (computerSelection == 'Rock') {
            computerScore+=1;
            return `Computer wins round! ${computerSelection} beats ${playerSelection}`;
        } else { //computerSelection === 'Paper'
            playerScore+=1;
            return `Player wins round! ${playerSelection} beats ${computerSelection}`;
        }
    }
}

//Initial Declarations
let playerScore = 0;
let computerScore = 0;

let playerSelection;


function selectForPlayer() {
    while (playerSelection !== 'Rock' && playerSelection !== 'Paper' && playerSelection !== 'Scissors') {
        playerSelection = prompt("Pick your choice(Rock/Paper/Scissors)");

        //Clean inputs
        playerSelection = capitalizeFirstLetterOnly(playerSelection);
        playerSelection = playerSelection.trim();
    }
}

function game() {
    for (let i = 0; i < 5; i++) { //5 Rounds

        if(playerScore == 3 || computerScore == 3) { //First to 3 wins!
            break; //break out of for loop
        }

        console.log(`Current round: ${i+1}, player_score: ${playerScore}, computer_score: ${computerScore}`)

        selectForPlayer();

        let result = playRound(playerSelection, getComputerChoice());
        console.log(result);

        if (result.slice(0,4) === 'Draw') { // If result is draw, subtract 1 to i to repeat round.
            i--;
        } 

        playerSelection=""; //reset playerSelection.
    }

    if (playerScore > computerScore) {
        console.log("Player wins 5 round game!");
        console.log(`player_score: ${playerScore}, computer_score: ${computerScore}`)
    } 
    
    else {
        console.log("Computer wins 5 round game!");
        console.log(`player_score: ${playerScore}, computer_score: ${computerScore}`)
    }
}

//Start game!
game();