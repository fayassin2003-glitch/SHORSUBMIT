import { emptyState } from './message.js';

export function renderTeacherExams(container, exams) {
  if (!exams.length) {
    container.innerHTML = emptyState('עדיין לא נוצרו מבחנים.');
    return;
  }

  container.innerHTML = exams.map(exam => `
    <article class="item">
      <div class="item-header">
        <div>
          <h3>${exam.title}</h3>
          <p>${exam.description}</p>
          <p>קטגוריה: ${exam.category} | קוד: <strong>${exam.code}</strong> | משך: ${exam.duration} דקות</p>
        </div>
      </div>
      <div class="item-actions">
        <a class="btn primary" href="exam_details.html?id=${exam.id}">פרטי מבחן</a>
        <button class="btn danger" data-delete="${exam.id}" type="button">מחיקה</button>
      </div>
    </article>
  `).join('');
}

export function renderSearchResults(container, exams) {
  if (!exams.length) {
    container.innerHTML = emptyState('לא נמצאו מבחנים מתאימים.');
    return;
  }

  container.innerHTML = exams.map(exam => `
    <article class="item">
      <h3>${exam.title}</h3>
      <p>${exam.description}</p>
      <p>קטגוריה: ${exam.category} | קוד: ${exam.code} | ${exam.questions?.length || 0} שאלות</p>
      <a class="btn primary" href="take_exam.html?id=${exam.id}">התחל מבחן</a>
    </article>
  `).join('');
}
