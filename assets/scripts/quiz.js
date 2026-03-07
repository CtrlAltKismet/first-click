// Imported quiz questions
const quizQuestions = require("./quizQuestions.js");

// Quiz test

let currentQuestionIndex = 0;
let score = 0;


// Checks if answer selected is correct
// Returns true if correct, false if not

function checkAnswer (selected, correct) {
    return selected === correct;
}

// Returns +1 score if answer is correct, updates the score
function updateScore (score, isCorrect) {
    if (isCorrect) {
        return score + 1;
    }
    return score;
}

// Goes to next question in Quiz

function nextQuestion(currentIndex) {
    return currentIndex + 1;
}

module.exports = {
    checkAnswer,
    updateScore,
    nextQuestion
};

