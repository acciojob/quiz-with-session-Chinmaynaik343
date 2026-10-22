
const questions = [
    {
        question: "1. What is the capital of India?",
        options: ["Mumbai", "New Delhi", "Chennai", "Kolkata"],
        answer: "New Delhi"
    },
    {
        question: "2. Which language runs in a web browser?",
        options: ["Java", "C++", "JavaScript", "Python"],
        answer: "JavaScript"
    },
    {
        question: "3. What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "4. Which planet is known as the Red Planet?",
        options: ["Earth", "Venus", "Jupiter", "Mars"],
        answer: "Mars"
    },
    {
        question: "5. Which keyword declares a constant in JavaScript?",
        options: ["var", "let", "const", "define"],
        answer: "const"
    }
];

const questionsContainer = document.getElementById("questions");
const quizForm = document.getElementById("quizForm");
const scoreDisplay = document.getElementById("score");

// Retrieve saved answers from session storage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Display all questions and options
questions.forEach((item, index) => {
    const questionDiv = document.createElement("div");

    const questionTitle = document.createElement("p");
    questionTitle.textContent = item.question;
    questionDiv.appendChild(questionTitle);

    item.options.forEach((option, optionIndex) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");

        radio.type = "radio";
        radio.name = "question" + index;
        radio.value = option;

        // Restore the previously selected answer
        if (progress[index] === option) {
            radio.checked = true;
        }

        // Save the selected answer
        radio.addEventListener("change", function () {
            progress[index] = option;
            sessionStorage.setItem("progress", JSON.stringify(progress));
        });

        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + option));
        questionDiv.appendChild(label);
    });

    questionsContainer.appendChild(questionDiv);
});

// Restore the previous score after refreshing
const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
    scoreDisplay.textContent = "Your score is " + savedScore + " out of 5.";
}

// Calculate and save the score when submitted
quizForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let score = 0;

    questions.forEach((item, index) => {
        if (progress[index] === item.answer) {
            score++;
        }
    });

    localStorage.setItem("score", score);

    scoreDisplay.textContent = "Your score is " + score + " out of 5.";
});
