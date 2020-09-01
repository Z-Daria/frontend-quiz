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
    if (event.target && (event.target.id == 'html-start' || event.target.id == 'css-start' || event.target.id == 'js-start' || event.target.id == 'next')) {
        event.target.style.border = '3px solid #900c3e';
        event.target.style.backgroundColor = '#5e3151';
        event.target.style.cursor = 'pointer';
    };
});
document.addEventListener('mouseout', function() {
    if (event.target && (event.target.id == 'html-start' || event.target.id == 'css-start' || event.target.id == 'js-start' || event.target.id == 'next')) {
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

const htmlQuestions = [
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

const cssQuestions = [
    {
        question: 'What does CSS stand for?',
        answers: ['Computer Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets', 'Cascading Style Sheets'], 
        correct: 3
    },
    {
        question: 'What is the default value of the position property?',
        answers: ['fixed', 'static', 'relative', 'absolute'], 
        correct: 1
    },
    {
        question: 'How do you select all p elements inside a div element?',
        answers: ['div p', 'div.p', 'div + p', 'div-p'], 
        correct: 0
    },
    {
        question: 'How do you group selectors?',
        answers: ['Separate each selector with a comma', 'Separate each selector with a plus sign', 'Separate each selector with a space'], 
        correct: 0
    }
];

const jsQuestions = [
    {
        question: 'The external JavaScript file must contain the script tag.',
        answers: ['True', 'False'], 
        correct: 1
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        answers: ['if i = 5', 'if (i == 5)', 'if i = 5 then', 'if i == 5 then'], 
        correct: 1
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?',
        answers: ['onmouseover', 'onchange', 'onmouseclick', 'onclick'], 
        correct: 3
    },
    {
        question: 'What will the following code return: Boolean(10 > 9)?',
        answers: ['false', 'true', 'NaN'], 
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
    html += '</div><button id="next">Next</button></div>';
    document.querySelector('.content').innerHTML = html;
    currentQ++;
    handleClickAnswer();
};

function handleClickAnswer() {
    document.addEventListener('click', function() {
        console.log('clicked');
        if (event.target && event.target.className == 'option') {
            let options = document.getElementsByClassName('option');
            for (let option of options) {
                option.style.pointerEvents = 'none';     // make answers (div and span) unclickable
                option.firstChild.style.pointerEvents = 'none';
            };
            let selectedAnswer = event.target.querySelector('span').textContent;
            countCorrectAnswers(selectedAnswer);
            showCorrectAnswer();
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
    console.log('Show correct');
    let options = document.getElementsByClassName('option');
    for (let option of options) {
        if (option.querySelector('span').textContent == answers[correctAnswer]) {
            option.style.backgroundColor = 'green';
        };
    };
};

document.addEventListener('click', function() {
    if (event.target && event.target.id == 'next') {
        if (currentQ + 1 > collection.length) {
            showEndPage();
        } else {
            showQuestion(collection);
        };
    }
});

function showEndPage() {
    document.querySelector('.content').innerHTML = '<div class="welcome"><span>You finished the quiz!</span><span>Your score: ' + count + '/' + collection.length +  '</span></div>';
};

document.addEventListener('click', function() {
    if (event.target && event.target.id == 'html-start') {
        currentQ = 0;
        collection = htmlQuestions;
        showQuestion(collection);
    }
});

document.addEventListener('click', function() {
    if (event.target && event.target.id == 'css-start') {
        currentQ = 0;
        collection = cssQuestions;
        showQuestion(collection);
    }
});

document.addEventListener('click', function() {
    if (event.target && event.target.id == 'js-start') {
        currentQ = 0;
        collection = jsQuestions;
        showQuestion(collection);
    }
});