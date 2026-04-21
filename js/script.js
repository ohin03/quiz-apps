const myBtn = document.querySelector(".myBtn button");
const RulesBox = document.querySelector(".RulesBox");
const exitButton = document.querySelector(".buttons .ExitButton");
const Questions = document.querySelector(".Questions");
const ContinueButton = document.querySelector(".buttons .ContinueButton");
const nextBtn = document.querySelector(".nextBtn");
const TimeCount = document.querySelector(".TimeCount .Seconds");
const TimeLines = document.querySelector(".QuestionHeader .time-lines");
const result_box = document.querySelector(".result_box");
const restart_quiz = document.querySelector(".buttons .restart1");
const quit_quiz = document.querySelector(".buttons .quit");

let que_count = 0;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

myBtn.onclick = () => {
    RulesBox.classList.add("activeInfo");
}

exitButton.onclick = () => {
    RulesBox.classList.remove("activeInfo");
}

ContinueButton.onclick = () => {
    RulesBox.classList.remove("activeInfo");
    Questions.classList.add("activeQuiz");
    showQustion(0);
    setTimer(15);
    startTimerLine(0);
}

restart_quiz.onclick = () => {
    result_box.classList.remove("activeResult");
    Questions.classList.add("activeQuiz");
    que_count = 0;
    userScore = 0;
    widthValue = 0;
    showQustion(que_count);
    clearInterval(counter);
    setTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
}

quit_quiz.onclick = () => {
    window.location.reload();
}

nextBtn.onclick = () => {
    if (que_count < qustions.length - 1) {
        que_count++;
        showQustion(que_count);
        clearInterval(counter);
        setTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = "none";
    } else {
        showResultBox();
    }
}

function showQustion(index) {
    const que_text = document.querySelector(".text");
    const option_list = document.querySelector(".MyOptions");

    let option_tag = `<div class="options"><span>${qustions[index].options[0]}</span></div>`
                   + `<div class="options"><span>${qustions[index].options[1]}</span></div>`
                   + `<div class="options"><span>${qustions[index].options[2]}</span></div>`
                   + `<div class="options"><span>${qustions[index].options[3]}</span></div>`;

    let que_tag = "<span>" + qustions[index].numb + ". " + qustions[index].qustions + "</span>";
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const total_que = document.querySelector(".total_que");
    let total_quetag = '<p>' + qustions[index].numb + ' of ' + qustions.length + ' questions</p>';
    total_que.innerHTML = total_quetag;

    const option = option_list.querySelectorAll(".options");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = ' <div class="tick icon"><i class="fa-solid fa-check"></i></div>';
let crossIcon = ' <div class="cross icon"><i class="fa-solid fa-xmark"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent.trim();
    let correctAns = qustions[que_count].answer.trim();
    const option_list = document.querySelector(".MyOptions");
    let alloptions = option_list.children.length;

    if (userAns == correctAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("inCorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        for (let i = 0; i < alloptions; i++) {
            if (option_list.children[i].textContent.trim() == correctAns) {
                option_list.children[i].classList.add("correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    for (let i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    nextBtn.style.display = "block";
}

function showResultBox() {
    RulesBox.classList.remove("activeInfo");
    Questions.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = document.querySelector(".score_text");
    
    if (userScore > 3) {
        let scoreTag = '<span>অভিনন্দন! আপনি <p>' + userScore + '</p> পেয়েছেন <p>' + qustions.length + '</p> এর মধ্যে</span>';
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 1) {
        let scoreTag = '<span>চেষ্টা চালিয়ে যান, আপনি <p>' + userScore + '</p> পেয়েছেন <p>' + qustions.length + '</p> এর মধ্যে</span>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>দুঃখিত, আপনি মাত্র <p>' + userScore + '</p> পেয়েছেন <p>' + qustions.length + '</p> এর মধ্যে</span>';
        scoreText.innerHTML = scoreTag;
    }
}

function setTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        TimeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = TimeCount.textContent;
            TimeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            TimeCount.textContent = "00";
            const option_list = document.querySelector(".MyOptions");
            let correctAns = qustions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent.trim() == correctAns) {
                    option_list.children[i].classList.add("correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
                option_list.children[i].classList.add("disabled");
            }
            nextBtn.style.display = "block";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 50);
    function timer() {
        time += 1;
        TimeLines.style.width = time + "px";
        if (time > 319) {
            clearInterval(counterLine);
        }
    }
}