import { authService, examService, resultService } from './bootstrap.js';

const student = authService.requireRole('student');
const params = new URLSearchParams(location.search);
const exam = examService.findById(params.get('id'));
const form = document.querySelector('#takeExamForm');
const resultBox = document.querySelector('#resultBox');
const timer = document.querySelector('#timer');
let remainingSeconds = (exam?.duration || 0) * 60;
let timerId;

if (!exam || !exam.questions?.length) {
  form.innerHTML = '<p>המבחן לא נמצא או שאין בו שאלות.</p>';
} else {
  document.querySelector('#examTitle').textContent = exam.title;
  document.querySelector('#examInfo').textContent = `${exam.description} | קטגוריה: ${exam.category}`;
  renderExam();
  startTimer();
}

function renderExam() {
  form.innerHTML = `
    ${exam.questions.map((question, index) => `
      <section class="question">
        <h2>${index + 1}. ${question.text}</h2>
        <div class="options">
          ${question.options.map((option, optionIndex) => `
            <label class="option">
              <input type="radio" name="${question.id}" value="${optionIndex}" required>
              <span>${option}</span>
            </label>
          `).join('')}
        </div>
      </section>
    `).join('')}
    <button class="btn primary" type="submit">סיום ושליחה</button>
  `;
}

function startTimer() {
  updateTimer();
  timerId = setInterval(() => {
    remainingSeconds -= 1;
    updateTimer();
    // כשהזמן מסתיים, המבחן נשלח גם אם לא נענו כל השאלות.
    if (remainingSeconds <= 0) submitExam();
  }, 1000);
}

function updateTimer() {
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
  const seconds = String(remainingSeconds % 60).padStart(2, '0');
  timer.textContent = `${minutes}:${seconds}`;
}

function submitExam() {
  clearInterval(timerId);
  const answers = {};
  exam.questions.forEach(question => {
    const checked = form.querySelector(`input[name="${question.id}"]:checked`);
    answers[question.id] = checked ? Number(checked.value) : null;
  });

  const result = resultService.submit(exam.id, student.id, answers);
  form.classList.add('hidden');
  resultBox.classList.remove('hidden');
  resultBox.innerHTML = `
    <h2>המבחן הוגש</h2>
    <p>ציון: <strong>${result.score}</strong></p>
    <p>${result.correctCount}/${result.totalQuestions} תשובות נכונות</p>
    <div class="actions">
      <a class="btn primary" href="student.html">חזרה לדף סטודנט</a>
      <a class="btn" href="search.html">חיפוש מבחן נוסף</a>
    </div>
  `;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  submitExam();
});
