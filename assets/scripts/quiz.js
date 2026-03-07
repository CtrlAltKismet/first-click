// Imported quiz questions
const quizQuestions = require("./quizQuestions.js");

// Quiz test

let currentQuestionIndex = 0;
let score = 0;

// Connecting JS to the HTML

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const scoreDisplay = document.getElementById("score");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("question-number");

// Display a question

function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;

    questionNumber.textContent = 
    `Question ${currentQuestionIndex + 1}`;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");

        button.textContent = answer;

        button.classList.add("quiz-answer");

        answersContainer.appendChild(button);
    });
}

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

