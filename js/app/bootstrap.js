import { StorageService } from '../services/StorageService.js';
import { UserService } from '../services/UserService.js';
import { AuthService } from '../services/AuthService.js';
import { ExamService } from '../services/ExamService.js';
import { ResultService } from '../services/ResultService.js';
import { ThemeService } from '../services/ThemeService.js';
import { renderNavbar } from '../ui/navbar.js';

const storage = new StorageService();
const userService = new UserService(storage);
const authService = new AuthService(storage, userService);
const examService = new ExamService(storage);
const resultService = new ResultService(storage, examService);
const themeService = new ThemeService(storage);

// כל הדפים מייבאים את הקובץ הזה כדי לקבל DI פשוט לשירותים המשותפים.
themeService.apply();
renderNavbar(authService, themeService);

export { storage, userService, authService, examService, resultService, themeService };
