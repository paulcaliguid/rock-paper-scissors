const handImages = {
    Rock: "assets/compressed/rock.svg",
    Paper: "assets/compressed/paper-adjusted.svg",
    Scissors: "assets/compressed/scissors.svg"
};

function getComputerChoice() {
    const choiceNum = Math.floor(Math.random() * 3);

    switch (choiceNum) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        default:
            return "Scissors";
    }
}

function animateElement(element, className) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
}

function animateHand(imageElement) {
    animateElement(imageElement, "hand-reveal");
}

function animateText(element) {
    animateElement(element, "text-refresh");
}

function setDetailMessage(message, tone) {
    detailText.textContent = message;
    detailPanel.dataset.tone = tone;
    animateElement(detailText, "detail-refresh");
}

function clearWinnerHighlight() {
    image1.classList.remove("image-win");
    image2.classList.remove("image-win");
    playerFrame.classList.remove("frame-win");
    cpuFrame.classList.remove("frame-win");
}

function clearMoveSelection() {
    moveButtons.forEach((button) => button.classList.remove("is-selected"));
}

function setMoveSelection(activeButton) {
    clearMoveSelection();

    if (activeButton) {
        activeButton.classList.add("is-selected");
    }
}

function showHand(imageElement, frameElement, hand) {
    imageElement.hidden = false;
    imageElement.dataset.hand = hand.toLowerCase();
    imageElement.setAttribute("src", handImages[hand]);
    frameElement.classList.remove("is-idle");
    animateHand(imageElement);
}

function setWinnerHighlight(winningImage) {
    clearWinnerHighlight();

    if (winningImage === "both") {
        image1.classList.add("image-win");
        image2.classList.add("image-win");
        playerFrame.classList.add("frame-win");
        cpuFrame.classList.add("frame-win");
        return;
    }

    if (winningImage === image1) {
        image1.classList.add("image-win");
        playerFrame.classList.add("frame-win");
    }

    if (winningImage === image2) {
        image2.classList.add("image-win");
        cpuFrame.classList.add("frame-win");
    }
}

function updateScoreboard(shouldAnimate = true) {
    scoreText.textContent = `Player: ${playerScore} Computer: ${computerScore}`;

    if (shouldAnimate) {
        animateText(scoreText);
    }
}

function updateRoundLabel(shouldAnimate = true) {
    roundText.textContent = `Round: ${roundNumber}`;

    if (shouldAnimate) {
        animateText(roundText);
    }
}

function setHands(playerSelection, computerSelection) {
    showHand(image1, playerFrame, playerSelection);
    showHand(image2, cpuFrame, computerSelection);
}

function finalizeRound(message, tone, winningImage) {
    setWinnerHighlight(winningImage);
    updateScoreboard();

    if (playerScore === 5) {
        setDetailMessage(`${message} Match point secured. Player wins the game!`, "player");
        setButtonsDisabled(true);
        return;
    }

    if (computerScore === 5) {
        setDetailMessage(`${message} Match point secured. Computer wins the game!`, "cpu");
        setButtonsDisabled(true);
        return;
    }

    setDetailMessage(message, tone);
    roundNumber += 1;
}

function playRound(playerSelection, computerSelection, activeButton) {
    setMoveSelection(activeButton);
    setHands(playerSelection, computerSelection);
    updateRoundLabel();

    if (playerSelection === computerSelection) {
        finalizeRound(`Draw. Both players picked ${playerSelection}.`, "draw", "both");
        return;
    }

    if (playerSelection === "Rock") {
        if (computerSelection === "Paper") {
            computerScore += 1;
            finalizeRound(`Computer wins the round. ${computerSelection} beats ${playerSelection}.`, "cpu", image2);
        } else {
            playerScore += 1;
            finalizeRound(`Player wins the round. ${playerSelection} beats ${computerSelection}.`, "player", image1);
        }

        return;
    }

    if (playerSelection === "Paper") {
        if (computerSelection === "Scissors") {
            computerScore += 1;
            finalizeRound(`Computer wins the round. ${computerSelection} beats ${playerSelection}.`, "cpu", image2);
        } else {
            playerScore += 1;
            finalizeRound(`Player wins the round. ${playerSelection} beats ${computerSelection}.`, "player", image1);
        }

        return;
    }

    if (computerSelection === "Rock") {
        computerScore += 1;
        finalizeRound(`Computer wins the round. ${computerSelection} beats ${playerSelection}.`, "cpu", image2);
        return;
    }

    playerScore += 1;
    finalizeRound(`Player wins the round. ${playerSelection} beats ${computerSelection}.`, "player", image1);
}

function setButtonsDisabled(isDisabled) {
    buttonRock.disabled = isDisabled;
    buttonPaper.disabled = isDisabled;
    buttonScissors.disabled = isDisabled;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundNumber = 1;
    playerSelection = "";

    image1.hidden = true;
    image2.hidden = true;
    image1.removeAttribute("src");
    image2.removeAttribute("src");
    delete image1.dataset.hand;
    delete image2.dataset.hand;
    image1.classList.remove("hand-reveal", "image-win");
    image2.classList.remove("hand-reveal", "image-win");
    playerFrame.classList.add("is-idle");
    cpuFrame.classList.add("is-idle");
    clearWinnerHighlight();
    clearMoveSelection();
    detailPanel.dataset.tone = "idle";
    detailText.textContent = "Waiting for the first move...";
    updateRoundLabel(false);
    updateScoreboard(false);
    setButtonsDisabled(false);
}

function handleMoveSelection(selection, button) {
    playerSelection = selection;
    playRound(playerSelection, getComputerChoice(), button);
}

let playerScore = 0;
let computerScore = 0;
let roundNumber = 1;
let playerSelection = "";

const roundText = document.querySelector("#round");
const scoreText = document.querySelector("#score");
const image1 = document.querySelector("#image1");
const image2 = document.querySelector("#image2");
const detailText = document.querySelector("#detail");
const detailPanel = document.querySelector(".detail-panel");
const playerFrame = document.querySelector("#player-frame");
const cpuFrame = document.querySelector("#cpu-frame");

const buttonRock = document.querySelector("#rock");
const buttonPaper = document.querySelector("#paper");
const buttonScissors = document.querySelector("#scissors");
const buttonReset = document.querySelector("#reset");
const moveButtons = [buttonRock, buttonPaper, buttonScissors];

buttonRock.addEventListener("click", () => {
    handleMoveSelection("Rock", buttonRock);
});

buttonPaper.addEventListener("click", () => {
    handleMoveSelection("Paper", buttonPaper);
});

buttonScissors.addEventListener("click", () => {
    handleMoveSelection("Scissors", buttonScissors);
});

buttonReset.addEventListener("click", resetGame);

resetGame();
