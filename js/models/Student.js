import { User } from './User.js';

export class Student extends User {
  constructor(data) {
    super({ ...data, role: 'student' });
  }
}
