const navs = document.getElementsByClassName('nav-item');
for (let navItem of navs) {
    navItem.onmouseover = function() {
        navItem.style.backgroundColor = '#900c3e';
        navItem.style.cursor = 'pointer';
    };
    navItem.onmouseout = function() {
        navItem.style.backgroundColor = '';
    };
};

document.getElementById('html-quiz').addEventListener('click', () => {
    document.querySelector('.content').innerHTML = '<div class="welcome"><h1>HTML</h1><p>HTML is the standard markup language for Web pages. With HTML you can create your own Website. Take this test and prove your knowledge in HTML5.</p><button id="html-start">Start</button></div>';
});

document.getElementById('css-quiz').addEventListener('click', () => {
    document.querySelector('.content').innerHTML = '<div class="welcome"><h1>CSS</h1><p>CSS is the language we use to style an HTML document. CSS describes how HTML elements should be displayed. Take this test and prove your knowledge in CSS.</p><button id="css-start">Start</button></div>';
});

document.getElementById('js-quiz').addEventListener('click', () => {
    document.querySelector('.content').innerHTML = '<div class="welcome"><h1>JavaScript</h1><p>JavaScript is the programming language of the Web. JavaScript is used to add interactivity and other dynamic features to web sites. Take this test and prove your knowledge in JavaScript.</p><button id="js-start">Start</button></div>';
});

document.addEventListener('mouseover', () => {
    if (event.target && (event.target.id == 'html-start' || event.target.id == 'css-start' || event.target.id == 'js-start')) {
        event.target.style.border = '3px solid #900c3e';
        event.target.style.backgroundColor = '#5e3151';
        event.target.style.cursor = 'pointer';
    };
});
document.addEventListener('mouseout', function() {
    if (event.target && (event.target.id == 'html-start' || event.target.id == 'css-start' || event.target.id == 'js-start')) {
        event.target.style.border = '3px solid #571845';
        event.target.style.backgroundColor = '#571845';
    };
});




let currentQ;
let answers;
let correctAnswer;
let count = 0;
let answerSelected;
let questionsNum;
let collection;

const HTML = [
    {
        question: 'What does HTML stands for?',
        answers: ['Hypertext Machine Language', 'Hypertext and links markup language', 'Hypertext Markup Language', 'Hightext Machine Language'], 
        correct: 2
    },
    {
        question: 'Who is making the Web standards?',
        answers: ['Microsoft', 'Google', 'The World Wide Web Consortium', 'Mozilla'],
        correct: 2
    },
    {
        question: 'Inline elements are normally displayed without starting a new line.',
        answers: ['True', 'False'],
        correct: 0
    },
    {
        question: 'Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?',
        answers: ['longdesc', 'alt', 'src', 'title'],
        correct: 1
    }
];

function showQuestion(collection) {
    console.log(currentQ);
    let html = '<div class="quiz">';
    let current = collection[currentQ];
    let question = current.question;
    correctAnswer = current.correct;
    html += '<span class="question">' + question + '</span>';
    html += '<div class="answers">';
    answers = current.answers;
    for (let answer of answers) {
        html += '<div class="option"><span>' + answer + '</span></div>';
    };
    html += '</div></div>';
    document.querySelector('.content').innerHTML = html;
    currentQ++;
    handleClickAnswer();
};

function handleClickAnswer() {
    document.addEventListener('click', function() {
        if (event.target && event.target.className == 'option') {
            let selectedAnswer = event.target.querySelector('span').textContent;
            countCorrectAnswers(selectedAnswer);
            showCorrectAnswer();
            if (currentQ + 1 > collection.length) {
                showEndPage();
            } else {
                showQuestion(collection);
            };
        };
    });
};

function countCorrectAnswers(answer) {
    if (answer == answers[correctAnswer]) {
        console.log('I count');
        count++ ;
    };
};

function showCorrectAnswer() {
    let options = document.getElementsByClassName('option');
    for (let option of options) {
        if (option.querySelector('span').textContent == answers[correctAnswer]) {
            option.style.backgroundColor = 'green';
        }
    };
};

function showEndPage() {
    document.querySelector('.content').innerHTML = '<h1>The end</h1><span>' + count + '</span>';
};

document.addEventListener('click', function() {
    if (event.target && event.target.id == 'html-start') {
        currentQ = 0;
        collection = HTML;
        showQuestion(collection);
    }
});