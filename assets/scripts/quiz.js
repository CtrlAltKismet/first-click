// Imported quiz questions
import quizQuestions from "./quizQuestions.js";

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

        button.addEventListener("click", () => selectAnswer(answer));

        answersContainer.appendChild(button);
    });
}

// Answer changes colour depending if it is correct or incorrect

function selectAnswer(selectedAnswer) {
    
    const currentQuestion = quizQuestions[currentQuestionIndex];

    const isCorrect = checkAnswer(selectedAnswer, currentQuestion.correct);

    score = updateScore(score, isCorrect);

    scoreDisplay.textContent = `${score}`;

    const buttons = document.querySelectorAll(".quiz-answer");

    buttons.forEach(button => {

        if (button.textContent === currentQuestion.correct) {
            button.classList.add("correct");
        }

        if (button.textContent === selectedAnswer && !isCorrect) {
            button.classList.add("incorrect");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
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

// Next button moves onto the next question so long as there is a question after current

nextButton.addEventListener("click", () => {

    currentQuestionIndex = nextQuestion(currentQuestionIndex);

    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
        nextButton.style.display = "none";
    } else {
        questionText.textContent = "Quiz Complete!";
        answersContainer.innerHTML = "";
        nextButton.style.display = "none";
    }
});

// Start the quiz

showQuestion();

module.exports = {
    checkAnswer,
    updateScore,
    nextQuestion
};

