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

        // Test to check updating score when answer is true
        test("updateScore increases score when answer is correct", () => {
            expect(updateScore(0, true)).toBe(1);
        });

        // Test to check score does not increase when answer is false
        test("updateScore does not increase score when answer is wrong", () => {
            expect(updateScore(2, false)).toBe(2);
        });

        // Test to check next question index increases
        test("nextQuestion moves to next inded", () => {
            expect(nextQuestion(5)).toBe(6);
        });
    });