export class Exam {
  constructor({ id, teacherId, title, description, category, code, duration, questions = [] }) {
    this.id = id || crypto.randomUUID();
    this.teacherId = teacherId;
    this.title = title;
    this.description = description;
    this.category = category;
    this.code = code || Exam.createCode();
    this.duration = Number(duration);
    this.questions = questions;
    this.createdAt = new Date().toISOString();
  }

  static createCode() {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  }
}
