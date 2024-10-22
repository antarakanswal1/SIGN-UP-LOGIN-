const questions=[
    {
        question:"Which is largest animal in the world?",
        answers:[
            { text:"Shark",correct:false },
            { text:"Blue Whale",correct:true },
            { text:"Elephant",correct:false },
            { text:"Giraffe",correct:false },
        ]
    },
    {
        question:"What is the capital of India?",
        answers:[
            { text:"Pune",correct:false },
            { text:"Goa",correct:false },
            { text:"New Delhi",correct:true },
            { text:"Mumbai",correct:false },
        ]
    },
    {
        question:"Which planet is known as Red Planet?",
        answers:[
            { text:"Mars",correct:true },
            { text:"Saturn",correct:false },
            { text:"Venus",correct:false },
            { text:"Earth",correct:false },
        ]
    },
    {
        question:"Which is largest ocean on Earth?",
        answers:[
            { text:"Arctic Ocean",correct:false },
            { text:"Pacific Ocean",correct:true },
            { text:"Atlantic Ocean",correct:false },
            { text:"Indian Ocean",correct:false },
        ]
    },
    {
        question:"Who wrote 'Romeo and Julliet' ?",
        answers:[
            { text:"William Shakespeare",correct:true },
            { text:"Ben Jonson",correct:false },
            { text:"Jane Austen",correct:false },
            { text:"Mark Twain",correct:false },
        ]
    },
    {
        question:"Which is national flower of Japan?",
        answers:[
            { text:"Primrose",correct:false },
            { text:"Wisteria",correct:false },
            { text:"Cherry Blossom",correct:true },
            { text:"Camellia",correct:false },
        ]
    },
    {
        question:"Which is the closest star to earth?",
        answers:[
            { text:"Stars",correct:false },
            { text:"Moon",correct:false },
            { text:"The Sun",correct:true },
            { text:"Black hole",correct:false },
        ]
    },
    {
        question:"Who Painted Mona Lisa?",
        answers:[
            { text:"Leonardo da Vinci",correct:true },
            { text:"Raphael",correct:false },
            { text:"Sandro Botticelli",correct:false },
            { text:"Titian",correct:false },
        ]
    },
    {
        question:"Which is largest desert in the world?",
        answers:[
            { text:"Kalahari",correct:false },
            { text:"Gobi",correct:false },
            { text:"Sahara",correct:false },
            { text:"Antarctica",correct:true },
        ]
    },
    {
        question:"Which is smallest continent in the world?",
        answers:[
            { text:"Asia",correct:false },
            { text:"Australia",correct:true },
            { text:"Arctic",correct:false },
            { text:"Africa",correct:false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const timeLimit = 60;
let timeRemaining = timeLimit; 


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    startTimer();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    stopTimer(); 
    timeRemaining = timeLimit;
    document.getElementById("timer").innerHTML = `Time: ${timeRemaining}s`;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        document.getElementById("timer").innerHTML = `Time: ${timeRemaining}s`;
        if (timeRemaining <= 0) {
            stopTimer();
            handleNextButton();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}



startQuiz();