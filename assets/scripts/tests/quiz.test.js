/**
 * @jest-environment jsdom
 */

// Imported function to test from quiz.js file which are functions that control quiz logic
const { checkAnswer, updateScore, nextQuestion } = require("../quiz.js");

// Testing logic used in the quiz
describe ("Quiz Logic Tests", () => {

    // Test to check if the function correctly idenfities a correct answer
    test("checkAnswer returns true when answer is correct", () => {

        // expect() check if function returns what we expect
        expect(checkAnswer("A", "A")).toBe(true);
    });

    // Test to check what happens when an answer is wrong
    test("checkAnswer returns false when answer is incorrect", () => {
        //"B" is not the correct answer so function should return false
        expect(checkAnswer("B", "A")).toBe(false);
    });