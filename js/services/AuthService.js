export class AuthService {
  constructor(storage, userService) {
    this.storage = storage;
    this.userService = userService;
  }

  login(email, password) {
    const user = this.userService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('אימייל או סיסמה לא נכונים');
    }
    this.storage.set('currentUser', user);
    return user;
  }

  logout() {
    this.storage.remove('currentUser');
    window.location.href = 'index.html';
  }

  currentUser() {
    return this.storage.get('currentUser', null);
  }

  requireRole(role) {
    const user = this.currentUser();
    if (!user) {
      window.location.href = 'login.html';
      return null;
    }
    if (user.role !== role) {
      window.location.href = user.role === 'teacher' ? 'teacher.html' : 'student.html';
      return null;
    }
    return user;
  }
}
