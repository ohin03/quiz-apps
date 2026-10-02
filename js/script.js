
/* =========================================================
   ELEMENTS
========================================================= */

const myBtn = document.querySelector(".myBtn button");

const RulesBox = document.querySelector(".RulesBox");

const exitButton =
    document.querySelector(".ExitButton");

const ContinueButton =
    document.querySelector(".ContinueButton");

const Questions =
    document.querySelector(".Questions");

const nextBtn =
    document.querySelector(".nextBtn");

const TimeCount =
    document.querySelector(".Seconds");

const TimeLines =
    document.querySelector(".time-lines");

const result_box =
    document.querySelector(".result_box");

const restart_quiz =
    document.querySelector(".restart1");

const quit_quiz =
    document.querySelector(".quit");


/* =========================================================
   VARIABLES
========================================================= */

let que_count = 0;

let counter = null;

let counterLine = null;

let timeValue = 15;

let userScore = 0;

let widthValue = 0;


/* =========================================================
   START QUIZ
========================================================= */

myBtn.onclick = () => {

    RulesBox.classList.add("activeInfo");

};


/* =========================================================
   EXIT RULES
========================================================= */

exitButton.onclick = () => {

    RulesBox.classList.remove("activeInfo");

};


/* =========================================================
   CONTINUE QUIZ
========================================================= */

ContinueButton.onclick = () => {

    RulesBox.classList.remove("activeInfo");

    document.querySelector(".MyQuizApp").style.opacity = "0";

    setTimeout(() => {

        Questions.classList.add("activeQuiz");

        que_count = 0;

        userScore = 0;

        showQustion(que_count);

        resetTimer();

    }, 200);

};


/* =========================================================
   NEXT QUESTION
========================================================= */

nextBtn.onclick = () => {

    if (que_count < qustions.length - 1) {

        que_count++;

        showQustion(que_count);

        resetTimer();

        nextBtn.style.display = "none";

    } else {

        clearInterval(counter);

        clearInterval(counterLine);

        showResultBox();

    }

};


/* =========================================================
   SHOW QUESTION
========================================================= */

function showQustion(index) {

    const que_text =
        document.querySelector(".text");

    const option_list =
        document.querySelector(".MyOptions");


    const currentQuestion =
        qustions[index];


    /* Question */

    que_text.innerHTML =
        `<span>
            ${currentQuestion.numb}.
            ${currentQuestion.qustions}
        </span>`;


    /* Options */

    option_list.innerHTML = "";


    currentQuestion.options.forEach((option) => {

        const optionDiv =
            document.createElement("div");

        optionDiv.className = "options";

        optionDiv.innerHTML =
            `<span>${option}</span>`;

        optionDiv.onclick = function () {

            optionSelected(this);

        };

        option_list.appendChild(optionDiv);

    });


    /* Question Counter */

    const total_que =
        document.querySelector(".total_que");


    total_que.innerHTML =
        `<p>
            ${currentQuestion.numb}
            of
            ${qustions.length}
            questions
        </p>`;


    /* Reset scroll */

    document
        .querySelector(".quizBody")
        .scrollTop = 0;

}


/* =========================================================
   ICONS
========================================================= */

const tickIcon =
    `<div class="tick icon">
        <i class="fa-solid fa-check">✓</i>
    </div>`;


const crossIcon =
    `<div class="cross icon">
        <i class="fa-solid fa-xmark">×</i>
    </div>`;


/* =========================================================
   OPTION SELECTED
========================================================= */

function optionSelected(answer) {

    clearInterval(counter);

    clearInterval(counterLine);


    const userAns =
        answer.textContent.trim();


    const correctAns =
        qustions[que_count]
            .answer
            .trim();


    const option_list =
        document.querySelector(".MyOptions");


    const alloptions =
        option_list.children.length;


    /* Correct */

    if (userAns === correctAns) {

        userScore++;

        answer.classList.add("correct");

        answer.insertAdjacentHTML(
            "beforeend",
            tickIcon
        );

    }

    /* Wrong */

    else {

        answer.classList.add("inCorrect");

        answer.insertAdjacentHTML(
            "beforeend",
            crossIcon
        );


        for (
            let i = 0;
            i < alloptions;
            i++
        ) {

            if (
                option_list.children[i]
                    .textContent
                    .trim() === correctAns
            ) {

                option_list.children[i]
                    .classList
                    .add("correct");


                option_list.children[i]
                    .insertAdjacentHTML(
                        "beforeend",
                        tickIcon
                    );
            }

        }

    }


    /* Disable all options */

    for (
        let i = 0;
        i < alloptions;
        i++
    ) {

        option_list.children[i]
            .classList
            .add("disabled");

    }


    nextBtn.style.display = "flex";

}


/* =========================================================
   TIMER
========================================================= */

function setTimer(time) {

    clearInterval(counter);


    let currentTime = time;


    TimeCount.textContent =
        String(currentTime).padStart(2, "0");


    counter =
        setInterval(() => {

            currentTime--;


            TimeCount.textContent =
                String(
                    Math.max(currentTime, 0)
                ).padStart(2, "0");


            if (currentTime < 5) {

                TimeCount.style.color =
                    "#ef4444";

            }


            if (currentTime < 0) {

                clearInterval(counter);

                TimeCount.textContent = "00";

                timeOver();

            }

        }, 1000);

}


/* =========================================================
   TIME OVER
========================================================= */

function timeOver() {

    clearInterval(counter);

    clearInterval(counterLine);


    const option_list =
        document.querySelector(".MyOptions");


    const correctAns =
        qustions[que_count]
            .answer
            .trim();


    const allOptions =
        option_list.children.length;


    for (
        let i = 0;
        i < allOptions;
        i++
    ) {

        const option =
            option_list.children[i];


        if (
            option.textContent.trim()
            === correctAns
        ) {

            option.classList.add("correct");

            option.insertAdjacentHTML(
                "beforeend",
                tickIcon
            );

        }


        option.classList.add("disabled");

    }


    nextBtn.style.display = "flex";

}


/* =========================================================
   PROGRESS BAR
========================================================= */

function startTimerLine() {

    clearInterval(counterLine);


    let width = 0;


    TimeLines.style.width = "0%";


    counterLine =
        setInterval(() => {

            width +=
                100 / (timeValue * 20);


            TimeLines.style.width =
                Math.min(width, 100) + "%";


            if (width >= 100) {

                clearInterval(counterLine);

            }

        }, 50);

}


/* =========================================================
   RESET TIMER
========================================================= */

function resetTimer() {

    clearInterval(counter);

    clearInterval(counterLine);


    TimeCount.style.color =
        "#ef4444";


    TimeCount.textContent =
        "15";


    setTimer(timeValue);

    startTimerLine();

}


/* =========================================================
   RESULT
========================================================= */

function showResultBox() {

    Questions.classList.remove("activeQuiz");

    result_box.classList.add("activeResult");


    const scoreText =
        document.querySelector(".score_text");


    let message;


    if (userScore === qustions.length) {

        message =
            "অসাধারণ! আপনি সবগুলো প্রশ্নের সঠিক উত্তর দিয়েছেন। 🏆";

    }

    else if (userScore >= 3) {

        message =
            "দারুণ করেছেন! আপনার ফলাফল বেশ ভালো। 🎉";

    }

    else if (userScore >= 2) {

        message =
            "ভালো চেষ্টা! আরও একটু practice করলে আরও ভালো করবেন। 💪";

    }

    else {

        message =
            "আরও একবার চেষ্টা করুন এবং আপনার স্কোর উন্নত করুন। 🚀";

    }


    scoreText.innerHTML =
        `<span>
            ${message}
            <br>
            Score:
            <p>${userScore}</p>
            /
            <p>${qustions.length}</p>
        </span>`;

}


/* =========================================================
   RESTART
========================================================= */

restart_quiz.onclick = () => {

    clearInterval(counter);

    clearInterval(counterLine);


    result_box.classList.remove(
        "activeResult"
    );


    que_count = 0;

    userScore = 0;


    showQustion(que_count);


    Questions.classList.add(
        "activeQuiz"
    );


    nextBtn.style.display = "none";


    resetTimer();

};


/* =========================================================
   QUIT
========================================================= */

quit_quiz.onclick = () => {

    window.location.reload();

};

