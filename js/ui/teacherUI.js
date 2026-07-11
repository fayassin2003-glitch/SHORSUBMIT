import { emptyState } from './message.js';

export function renderQuestions(container, questions) {
  if (!questions?.length) {
    container.innerHTML = emptyState('אין שאלות במבחן.');
    return;
  }

  container.innerHTML = questions.map((question, index) => `
    <article class="item">
      <h3>${index + 1}. ${question.text}</h3>
      <p>רמת קושי: ${question.difficulty}</p>
      <ol>
        ${question.options.map((option, optionIndex) => `
          <li>${option}${optionIndex === question.correctIndex ? ' - תשובה נכונה' : ''}</li>
        `).join('')}
      </ol>
      <div class="item-actions">
        <button class="btn" data-edit-question="${question.id}" type="button">עריכה</button>
        <button class="btn danger" data-delete-question="${question.id}" type="button">מחיקה</button>
      </div>
    </article>
  `).join('');
}

export function renderExamResults(container, results, userService) {
  if (!results.length) {
    container.innerHTML = emptyState('עדיין אין תוצאות למבחן זה.');
    return;
  }

  container.innerHTML = results.map(result => {
    const student = userService.findById(result.studentId);
    return `
      <article class="item">
        <h3>${student?.name || 'סטודנט לא ידוע'}</h3>
        <p>ציון: <strong>${result.score}</strong></p>
        <p>${result.correctCount}/${result.totalQuestions} תשובות נכונות</p>
        <p>תאריך: ${new Date(result.submittedAt).toLocaleString('he-IL')}</p>
      </article>
    `;
  }).join('');
}
