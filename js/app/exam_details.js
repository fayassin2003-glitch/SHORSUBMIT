import { authService, examService, resultService, userService } from './bootstrap.js';
import { renderQuestions, renderExamResults } from '../ui/teacherUI.js';

const teacher = authService.requireRole('teacher');
const params = new URLSearchParams(location.search);
const examId = params.get('id');
const questionForm = document.querySelector('#questionForm');
const questionList = document.querySelector('#questionList');
const resultList = document.querySelector('#resultList');
const title = document.querySelector('#examTitle');
const meta = document.querySelector('#examMeta');

function getExamOrBack() {
  const exam = examService.findById(examId);
  if (!exam || exam.teacherId !== teacher.id) {
    window.location.href = 'teacher.html';
    return null;
  }
  return exam;
}

function render() {
  const exam = getExamOrBack();
  if (!exam) return;

  title.textContent = exam.title;
  meta.textContent = `ID: ${exam.id} | קטגוריה: ${exam.category} | קוד: ${exam.code} | משך: ${exam.duration} דקות`;
  renderQuestions(questionList, exam.questions || []);
  renderExamResults(resultList, resultService.byExam(exam.id), userService);
}

questionForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(questionForm));
  const payload = {
    text: data.text,
    options: [data.option0, data.option1, data.option2, data.option3],
    correctIndex: Number(data.correctIndex),
    difficulty: data.difficulty
  };

  if (data.questionId) {
    examService.updateQuestion(examId, data.questionId, payload);
  } else {
    examService.addQuestion(examId, payload);
  }

  questionForm.reset();
  questionForm.questionId.value = '';
  render();
});

questionList.addEventListener('click', event => {
  const editId = event.target.dataset.editQuestion;
  const deleteId = event.target.dataset.deleteQuestion;
  const exam = getExamOrBack();

  if (editId) {
    const question = exam.questions.find(item => item.id === editId);
    questionForm.questionId.value = question.id;
    questionForm.text.value = question.text;
    question.options.forEach((option, index) => questionForm[`option${index}`].value = option);
    questionForm.correctIndex.value = question.correctIndex;
    questionForm.difficulty.value = question.difficulty;
  }

  if (deleteId && confirm('למחוק את השאלה?')) {
    examService.removeQuestion(examId, deleteId);
    render();
  }
});

if (teacher) render();
