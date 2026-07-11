import { authService, examService } from './bootstrap.js';
import { renderTeacherExams } from '../ui/examUI.js';

const teacher = authService.requireRole('teacher');
const form = document.querySelector('#examForm');
const list = document.querySelector('#examList');
const seedBtn = document.querySelector('#seedBtn');

function render() {
  renderTeacherExams(list, examService.byTeacher(teacher.id));
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  examService.save({ ...data, teacherId: teacher.id });
  form.reset();
  form.duration.value = 30;
  render();
});

list.addEventListener('click', event => {
  const id = event.target.dataset.delete;
  if (!id) return;
  if (confirm('למחוק את המבחן?')) {
    examService.remove(id);
    render();
  }
});

seedBtn.addEventListener('click', () => {
  examService.seed(teacher.id);
  render();
});

if (teacher) render();
