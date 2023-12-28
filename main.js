const questions = [
  {
    question: "В каком году появился первый сайт в интернете?",
    answers: ["1990", "1991", "1992", "1993"],
    correct: 2,
  },
  {
    question: "А из каких частей состоит Frontend?",
    answers: [
      "HTML, CSS, TypeScript",
      "JavaScript, CSS, С++",
      "TypeScript, HTML, С",
      "JavaScript, HTML, CSS",
    ],
    correct: 4,
  },
  {
    question: "Какай язык программирования работает только с сервером?",
    answers: ["C++", "Java", "PHP", "Go"],
    correct: 3,
  },
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Какой фреймворк не относится к frontend?",
    answers: ["React", "Vue", "Spring", "Angular"],
    correct: 4,
  },
  {
    question:
      "Название JavaScript - это зарегистрированный товарный знак компании..",
    answers: ["Microsoft", "IBM", "Oracle", "	Cisco"],
    correct: 3,
  },
];

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");
const timerContainer = document.querySelector(".time");

let score = 0;
let qustionIndex = 0;
let timerInterval;
let timeLeft = 60;

clearPage();
showQuestion();
startTimer();
submitBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[qustionIndex]["question"]
  );
  headerContainer.innerHTML = title;

  let answerNumber = 1;
  for (answerText of questions[qustionIndex]["answers"]) {
    const questionTemplate = `<li>
	 		<label>
					 <input value="%number%" type="radio" class="answer" name="answer" />
		 		<span>%answer%</span>
	 		</label>
 	 </li>`;

    const answerHTML = questionTemplate
      .replace("%answer%", answerText)
      .replace("%number%", answerNumber);

    listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}

function checkAnswer() {
  const checkedRadio = listContainer.querySelector("input[type=radio]:checked");

  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }

  const userAnswer = parseInt(checkedRadio.value);
  if (userAnswer === questions[qustionIndex]["correct"]) {
    score++;
  }
  if (qustionIndex !== questions.length - 1) {
    qustionIndex++;
    clearPage();
    showQuestion();

    return;
  } else {
    clearPage();
    showResults();
  }
}

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;

    // Update the timer text
    document.getElementById("time").textContent = timeLeft;

    // End the quiz if time runs out
    if (timeLeft <= 0) {
      clearPage();
      showResults();
    }
  }, 1000);
}

function showResults() {
  const resultsTemplate = `	
<h2 class="title">%title%</h2>
<h3 class="summary">%message%</h3>
<p class="result">%result%</p>`;

  clearInterval(timerInterval);
  timerContainer.innerHTML = "";
  //   document.querySelector(".time").classList.add("none");

  let title, message;
  if (score === questions.length) {
    title = "Поздравляем! 💫";
    message = "Вы ответили верно на все вопросы! 💣";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Неплохо! 💫";
    message = "Вы ответили верно на 50%! 💣";
  } else {
    title = "Стоит постараться!";
    message = "Меньше половины!";
  }
  let result = `${score} из ${questions.length}`;
  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);
  headerContainer.innerHTML = finalMessage;

  submitBtn.blur();
  submitBtn.innerText = "Начать заново";
  submitBtn.onclick = () => history.go();
}
