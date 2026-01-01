console.log("Quiz App Loaded");

// Sections
const topicSection = document.getElementById("topic-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

// Elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const progressBar = document.getElementById("progress-bar");

const currentQSpan = document.getElementById("current-q");
const totalQSpan = document.getElementById("total-q");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

// State
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Topic selection buttons
document.querySelectorAll(".topic-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedTopic = btn.dataset.topic; // "js", "c", "gk"
    loadQuestions(selectedTopic);
  });
});

// Load questions for a topic
function loadQuestions(topic) {
  topicSection.style.display = "none";
  resultSection.style.display = "none";
  quizSection.style.display = "block";

  questions = getQuestionsByTopic(topic);
  totalQSpan.textContent = questions.length;
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;
  progressBar.style.width = "0%";

  loadQuestion();
}

// Questions dataset
function getQuestionsByTopic(topic) {
  if (topic === "js") {
    return [
      {
        question: "Which of the following is a JavaScript data type?",
        options: ["float", "integer", "boolean", "double"],
        correct: 2
      },
      {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["<!-- -->", "/* */", "//", "#"],
        correct: 2
      },
      {
        question: "Which keyword is used to declare a variable in modern JavaScript?",
        options: ["var", "let", "int", "dim"],
        correct: 1
      },
      {
        question: "What is the output of: typeof 'Hello' ?",
        options: ["string", "char", "text", "word"],
        correct: 0
      },
      {
        question: "Which method is used to print something on the browser console?",
        options: ["console.print()", "console.log()", "print.log()", "log.console()"],
        correct: 1
      }
    ];
  }

  if (topic === "c") {
    return [
      {
        question: "Which header file is needed for printf() in C?",
        options: ["<conio.h>", "<stdio.h>", "<stdlib.h>", "<string.h>"],
        correct: 1
      },
      {
        question: "Which of these is the correct data type for a character in C?",
        options: ["string", "char", "character", "chr"],
        correct: 1
      },
      {
        question: "Array indexing in C starts from:",
        options: ["-1", "0", "1", "Any value"],
        correct: 1
      },
      {
        question: "Which operator is used to access the value at an address?",
        options: ["&", "*", "%", "#"],
        correct: 1
      },
      {
        question: "Which of these is a loop in C?",
        options: ["repeat", "loop", "for", "iterate"],
        correct: 2
      }
    ];
  }

  // Default: General Knowledge
  return [
    {
      question: "Which is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correct: 2
    },
    {
      question: "Who is known as the Father of Computers?",
      options: ["Albert Einstein", "Charles Babbage", "Isaac Newton", "Alan Turing"],
      correct: 1
    },
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
      correct: 2
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
      correct: 1
    },
    {
      question: "How many continents are there in the world?",
      options: ["5", "6", "7", "8"],
      correct: 2
    }
  ];
}

// Update animated progress bar
function updateProgress() {
  if (!questions.length) return;
  const percent = (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = percent + "%";
}

// Load current question
function loadQuestion() {
  nextBtn.disabled = true;
  feedback.textContent = "";

  const q = questions[currentQuestionIndex];
  currentQSpan.textContent = currentQuestionIndex + 1;
  questionText.textContent = q.question;

  optionsContainer.innerHTML = "";

  q.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.onclick = () => checkAnswer(i);
    optionsContainer.appendChild(btn);
  });

  updateProgress(); // move the bar
}

// Check selected answer
function checkAnswer(selectedIndex) {
  const q = questions[currentQuestionIndex];
  const optionButtons = document.querySelectorAll(".option-btn");

  optionButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) {
      btn.classList.add("correct");
    }
    if (i === selectedIndex && selectedIndex !== q.correct) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIndex === q.correct) {
    score++;
    scoreSpan.textContent = score;
    feedback.textContent = "✅ Correct!";
  } else {
    feedback.textContent = "❌ Wrong!";
  }

  nextBtn.disabled = false;
}

// Next question button
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
});

// Finish quiz
function finishQuiz() {
  // progress full at end
  progressBar.style.width = "100%";

  quizSection.style.display = "none";
  resultSection.style.display = "block";
  finalScoreSpan.textContent = `${score} / ${questions.length}`;
}

// Restart / Back to topics from result
restartBtn.addEventListener("click", () => {
  resultSection.style.display = "none";
  topicSection.style.display = "block";

  // reset progress bar
  progressBar.style.width = "0%";
});

// Back button in quiz section
backBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  feedback.textContent = "";
  optionsContainer.innerHTML = "";
  progressBar.style.width = "0%";

  quizSection.style.display = "none";
  topicSection.style.display = "block";
});
