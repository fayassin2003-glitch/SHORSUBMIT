import { User } from './User.js';

export class Teacher extends User {
  constructor(data) {
    super({ ...data, role: 'teacher' });
  }
}
