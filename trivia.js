const readline = require("readline");

// Create interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Questions array
const questions = [
  {
    question: "What is 5 + 3?",
    options: ["A. 6", "B. 8", "C. 10"],
    answer: "B"
  },
  {
    question: "Which language runs in the browser?",
    options: ["A. Python", "B. Java", "C. JavaScript"],
    answer: "C"
  },
  {
    question: "What does CLI stand for?",
    options: [
      "A. Command Line Interface",
      "B. Central Logic Input",
      "C. Code Level Integration"
    ],
    answer: "A"
  }
];

let score = 0;
let currentQuestionIndex = 0;
let totalTime = 30000; // 30 seconds
let timer; //  FIX: store timer reference

// Start game
function startGame() {
  console.log(" Welcome to Trivia CLI Game!");
  console.log("Answer the questions before time runs out!\n");

  startTimer();
  askQuestion();
}

// Timer
function startTimer() {
  timer = setTimeout(() => {
    console.log("\n Time is up!");
    endGame();
  }, totalTime);
}

// Ask question
function askQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endGame();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];

  console.log(`\nQuestion ${currentQuestionIndex + 1}:`);
  console.log(currentQuestion.question);

  currentQuestion.options.forEach(option => {
    console.log(option);
  });

  rl.question("Your answer (A, B, C): ", (input) => {
    checkAnswer(input.trim().toUpperCase());
  });
}

// Check answer
function checkAnswer(userAnswer) {
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (userAnswer === correctAnswer) {
    console.log(" Correct!");
    score++;
  } else {
    console.log(` Incorrect! Correct answer: ${correctAnswer}`);
  }

  currentQuestionIndex++;
  askQuestion();
}

// End game
function endGame() {
  clearTimeout(timer); //  FIX: stop timer to prevent duplicate ending

  console.log("\n Game Over!");
  console.log(`Final Score: ${score} / ${questions.length}`);

  rl.close();
}

// Start the game
startGame();
