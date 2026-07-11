export function renderNavbar(authService, themeService) {
  const host = document.querySelector('#navbar');
  if (!host) return;

  const user = authService.currentUser();
  const roleLink = user?.role === 'teacher'
    ? '<a href="teacher.html">דף מורה</a>'
    : user?.role === 'student'
      ? '<a href="student.html">דף סטודנט</a><a href="search.html">חיפוש מבחן</a>'
      : '<a href="regiseter.html">הרשמה</a><a href="login.html">התחברות</a>';

  host.innerHTML = `
    <nav class="topbar">
      <a class="brand" href="index.html">ExamSystem</a>
      <div class="nav-links">
        ${roleLink}
        <button id="themeToggle" class="btn" type="button">מצב כהה</button>
        ${user ? `<span>שלום, ${user.name}</span><button id="logoutBtn" class="btn danger" type="button">התנתקות</button>` : ''}
      </div>
    </nav>
  `;

  document.querySelector('#themeToggle')?.addEventListener('click', () => themeService.toggle());
  document.querySelector('#logoutBtn')?.addEventListener('click', () => authService.logout());
}
