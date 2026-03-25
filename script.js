let num1;
let num2;
let timedMode = false;
let timeLeft = 5;
let timerInterval;
let streak = 0;
let gameRunning = false;

document
  .getElementById("answer")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  });

function startGame() {
  document.getElementById("result").textContent = "";
  document.getElementById("startBtn").style.display = "none";

  document.getElementById("answer").disabled = false;
  document.getElementById("submitBtn").disabled = false;

  gameRunning = true;
  generateQuestion();

  // focus input automatically
  document.getElementById("answer").focus();
}

function endGame(message) {
  gameRunning = false;
  clearInterval(timerInterval);

  document.getElementById("result").textContent = message;
  document.getElementById("answer").disabled = true;
  document.getElementById("submitBtn").disabled = true;
  document.getElementById("startBtn").style.display = "inline";
  document.getElementById("timer").textContent = "";
}

function generateQuestion() {
  if (!gameRunning) return;

  num1 = Math.floor(Math.random() * 10) + 1;
  num2 = Math.floor(Math.random() * 10) + 1;

  document.getElementById("question").textContent = `${num1} x ${num2} = ?`;

  document.getElementById("answer").value = "";
  document.getElementById("answer").focus();

  if (timedMode) {
    startTimer();
  }
}

function checkAnswer() {
  if (!gameRunning) return;

  const userAnswer = Number(document.getElementById("answer").value);
  const correct = num1 * num2;

  if (userAnswer === correct) {
    streak++;
    document.getElementById("streak").textContent = `Streak: ${streak}`;
    document.getElementById("result").textContent = "Correct!";
    clearInterval(timerInterval);
    setTimeout(generateQuestion, 500);
  } else {
    endGame(`Wrong! Final streak: ${streak}`);
    streak = 0;
    document.getElementById("streak").textContent = "Streak: 0";
  }
}

function toggleMode() {
  timedMode = !timedMode;

  if (timedMode) {
    document.getElementById("mode").textContent = "Mode: 5s";
  } else {
    document.getElementById("mode").textContent = "Mode: Practice";
    clearInterval(timerInterval);
    document.getElementById("timer").textContent = "";
  }
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 5;
  document.getElementById("timer").textContent = `Time: ${timeLeft}`;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
      endGame(`Time's up! Final streak: ${streak}`);
      streak = 0;
      document.getElementById("streak").textContent = "Streak: 0";
    }
  }, 1000);
}

// reset streak when mode is changed
function toggleMode() {
  timedMode = !timedMode;

  if (gameRunning) {
    endGame("Mode changed!");
  }

  streak = 0;
  document.getElementById("streak").textContent = "Streak: 0";

  if (timedMode) {
    document.getElementById("mode").textContent = "Mode: 5s";
  } else {
    document.getElementById("mode").textContent = "Mode: Practice";
  }
}
