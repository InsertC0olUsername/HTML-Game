// --- Data (replace/extend with full Security+ 701 list) ---
const acronyms = [
  { acronym: "AAA", phrase: "Authentication Authorization and Accounting" },
  { acronym: "ACL", phrase: "Access Control List" },
  { acronym: "AES", phrase: "Advanced Encryption Standard" },
  { acronym: "AP",  phrase: "Access Point" },
  { acronym: "API", phrase: "Application Programming Interface" },
];

// --- State ---
let currentItem = null;
let currentBlankIndex = null;
let score = 0;
let attempts = 0;

// --- DOM elements ---
const acronymEl = document.getElementById("acronym");
const phraseDisplayEl = document.getElementById("phraseDisplay");
const answerInput = document.getElementById("answer");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const attemptsEl = document.getElementById("attempts");

// --- Helpers ---
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function loadNewQuestion() {
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  answerInput.value = "";

  currentItem = getRandomItem(acronyms);
  acronymEl.textContent = currentItem.acronym;

  const words = currentItem.phrase.split(" ");
  if (words.length === 0) return;

  currentBlankIndex = Math.floor(Math.random() * words.length);
  const blankWord = words[currentBlankIndex];

  phraseDisplayEl.innerHTML = "";

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.classList.add("phrase-word");

    if (index === currentBlankIndex) {
      span.classList.add("phrase-blank");
      span.textContent = "_".repeat(Math.max(blankWord.length, 3));
    } else {
      span.textContent = word;
    }

    phraseDisplayEl.appendChild(span);
    phraseDisplayEl.append(" ");
  });

  answerInput.focus();
}

function normalize(str) {
  return str.trim().toLowerCase();
}

function checkAnswer() {
  if (!currentItem || currentBlankIndex === null) return;

  const userAnswer = normalize(answerInput.value);
  const correctWord = currentItem.phrase.split(" ")[currentBlankIndex];
  const normalizedCorrect = normalize(correctWord);

  if (!userAnswer) {
    feedbackEl.textContent = "Type your guess for the missing word.";
    feedbackEl.className = "feedback";
    return;
  }

  attempts++;
  attemptsEl.textContent = attempts;

  if (userAnswer === normalizedCorrect) {
    score++;
    scoreEl.textContent = score;
    feedbackEl.textContent = `Correct! The full phrase is: ${currentItem.phrase}`;
    feedbackEl.className = "feedback correct";
  } else {
    feedbackEl.textContent = `Not quite. Correct word: "${correctWord}". Full phrase: ${currentItem.phrase}`;
    feedbackEl.className = "feedback incorrect";
  }
}

// --- Event listeners ---
checkBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", loadNewQuestion);

answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

// --- Init ---
loadNewQuestion();
