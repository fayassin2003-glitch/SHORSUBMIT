import { userService, authService } from './bootstrap.js';
import { showMessage } from '../ui/message.js';

const form = document.querySelector('#registerForm');
const message = document.querySelector('#message');

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  try {
    const user = userService.create(data);
    authService.login(user.email, user.password);
    window.location.href = user.role === 'teacher' ? 'teacher.html' : 'student.html';
  } catch (error) {
    showMessage(message, error.message, 'error');
  }
});
