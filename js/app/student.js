import { authService, resultService, examService } from './bootstrap.js';
import { renderHistory } from '../ui/studentUI.js';

const student = authService.requireRole('student');
const results = resultService.byStudent(student.id);

document.querySelector('#doneCount').textContent = results.length;
document.querySelector('#averageScore').textContent = resultService.average(student.id);
renderHistory(document.querySelector('#historyList'), results, examService.all());
