import { authService, examService } from './bootstrap.js';
import { renderSearchResults } from '../ui/examUI.js';

authService.requireRole('student');

const form = document.querySelector('#searchForm');
const input = document.querySelector('#searchInput');
const results = document.querySelector('#searchResults');

function render(query = '') {
  renderSearchResults(results, examService.search(query).filter(exam => exam.questions?.length));
}

form.addEventListener('submit', event => {
  event.preventDefault();
  render(input.value);
});

input.addEventListener('input', () => render(input.value));
render();
