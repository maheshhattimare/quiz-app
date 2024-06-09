const questions = [
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {Text: "Earth", correct: false},
            {Text: "Mars", correct: true},
            {Text: "Jupiter", correct: false},
            {Text: "Saturn", correct: false},
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            {Text: "Au", correct: true},
            {Text: "Ag", correct: false},
            {Text: "Fe", correct: false},
            {Text: "Hg", correct: false},
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            {Text: "Mark Twain", correct: false},
            {Text: "William Shakespeare", correct: true},
            {Text: "Jane Austen", correct: false},
            {Text: "Charles Dickens", correct: false},
        ]
    },
    {
        question: "What is the largest desert in the world?",
        answers: [
            {Text: "Sahara", correct: false},
            {Text: "Antarctic Desert", correct: true},
            {Text: "Gobi", correct: false},
            {Text: "Kalahari", correct: false},
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            {Text: "Gold", correct: false},
            {Text: "Iron", correct: false},
            {Text: "Diamond", correct: true},
            {Text: "Silver", correct: false},
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers: [
            {Text: "Amazon", correct: false},
            {Text: "Nile", correct: true},
            {Text: "Yangtze", correct: false},
            {Text: "Mississippi", correct: false},
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            {Text: "Vincent van Gogh", correct: false},
            {Text: "Leonardo da Vinci", correct: true},
            {Text: "Pablo Picasso", correct: false},
            {Text: "Claude Monet", correct: false},
        ]
    },
    {
        question: "What is the capital city of Japan?",
        answers: [
            {Text: "Beijing", correct: false},
            {Text: "Seoul", correct: false},
            {Text: "Tokyo", correct: true},
            {Text: "Bangkok", correct: false},
        ]
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: [
            {Text: "Oxygen", correct: true},
            {Text: "Osmium", correct: false},
            {Text: "Oganesson", correct: false},
            {Text: "Oxide", correct: false},
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            {Text: "Atlantic Ocean", correct: false},
            {Text: "Indian Ocean", correct: false},
            {Text: "Pacific Ocean", correct: true},
            {Text: "Arctic Ocean", correct: false},
        ]
    }
];


const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("ans-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;

    questionElement.innerHTML=questionNo+" . "+currentQuestion.question;

    // code for ans 
    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        //ans button
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}


function showScore(){
    resetState();
    questionElement.innerHTML=`Your score ${score} out of ${questions.length} !`
    nextButton.innerHTML="Play Again"
    nextButton.style.display="block"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();
