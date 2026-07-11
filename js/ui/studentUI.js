import { emptyState } from './message.js';

export function renderHistory(container, results, exams) {
  if (!results.length) {
    container.innerHTML = emptyState('עדיין לא ביצעת מבחנים.');
    return;
  }

  container.innerHTML = results.map(result => {
    const exam = exams.find(item => item.id === result.examId);
    return `
      <article class="item">
        <h3>${exam?.title || 'מבחן שנמחק'}</h3>
        <p>ציון: <strong>${result.score}</strong></p>
        <p>${result.correctCount}/${result.totalQuestions} תשובות נכונות</p>
        <p>תאריך: ${new Date(result.submittedAt).toLocaleString('he-IL')}</p>
      </article>
    `;
  }).join('');
}
