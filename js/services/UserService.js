import { Student } from '../models/Student.js';
import { Teacher } from '../models/Teacher.js';

export class UserService {
  constructor(storage) {
    this.storage = storage;
  }

  all() {
    return this.storage.get('users');
  }

  findByEmail(email) {
    return this.all().find(user => user.email === email.toLowerCase());
  }

  findById(id) {
    return this.all().find(user => user.id === id);
  }

  create(data) {
    if (this.findByEmail(data.email)) {
      throw new Error('משתמש עם אימייל זה כבר קיים');
    }

    const user = data.role === 'teacher' ? new Teacher(data) : new Student(data);
    this.storage.set('users', [...this.all(), user]);
    return user;
  }
}
