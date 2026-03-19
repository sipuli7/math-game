let num1;
let num2;

function generateQuestion() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;

    document.getElementById("question").textContent =
        `${num1} x ${num2} = ?`;

    document.getElementById("answer").value = "";
    document.getElementById("result").textContent = "";
}

function checkAnswer() {
    const userAnswer = Number(document.getElementById("answer").value);
    const correct = num1 * num2;

    if (userAnswer === correct) {
        document.getElementById("result").textContent = "Correct!";
    } else {
        document.getElementById("result").textContent =
            `Wrong! Correct answer was ${correct}`;
    }

    setTimeout(generateQuestion, 1000);
}

generateQuestion();