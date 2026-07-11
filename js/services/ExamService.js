import { Exam } from '../models/Exam.js';
import { Question } from '../models/Question.js';

export class ExamService {
  constructor(storage) {
    this.storage = storage;
  }

  all() {
    return this.storage.get('exams');
  }

  findById(id) {
    return this.all().find(exam => exam.id === id);
  }

  byTeacher(teacherId) {
    return this.all().filter(exam => exam.teacherId === teacherId);
  }

  search(query) {
    const term = query.trim().toLowerCase();
    if (!term) return this.all();
    return this.all().filter(exam =>
      exam.title.toLowerCase().includes(term) ||
      exam.code.toLowerCase() === term ||
      exam.category.toLowerCase().includes(term)
    );
  }

  save(data) {
    const exams = this.all();
    if (data.id) {
      const updated = exams.map(exam => exam.id === data.id ? { ...exam, ...data, duration: Number(data.duration) } : exam);
      this.storage.set('exams', updated);
      return this.findById(data.id);
    }

    const exam = new Exam(data);
    this.storage.set('exams', [...exams, exam]);
    return exam;
  }

  remove(id) {
    this.storage.set('exams', this.all().filter(exam => exam.id !== id));
  }

  addQuestion(examId, data) {
    const question = new Question(data);
    this.updateQuestions(examId, questions => [...questions, question]);
    return question;
  }

  updateQuestion(examId, questionId, data) {
    this.updateQuestions(examId, questions => questions.map(question =>
      question.id === questionId ? { ...question, ...data, correctIndex: Number(data.correctIndex) } : question
    ));
  }

  removeQuestion(examId, questionId) {
    this.updateQuestions(examId, questions => questions.filter(question => question.id !== questionId));
  }

  updateQuestions(examId, updater) {
    const exams = this.all().map(exam => {
      if (exam.id !== examId) return exam;
      return { ...exam, questions: updater(exam.questions || []) };
    });
    this.storage.set('exams', exams);
  }

  seed(teacherId) {
    // נתוני דוגמה עוזרים לבדוק את המערכת מהר אחרי הרשמת מורה חדש.
    if (this.byTeacher(teacherId).length > 0) return;
    const exam = new Exam({
      teacherId,
      title: 'מבוא ל-JavaScript',
      description: 'מבחן דוגמה בנושא ES Modules ומחלקות',
      category: 'תכנות',
      duration: 20,
      questions: [
        new Question({
          text: 'איזו מילה משמשת לייצוא מחלקה ממודול?',
          options: ['export', 'send', 'module', 'public'],
          correctIndex: 0,
          difficulty: 'easy'
        }),
        new Question({
          text: 'איפה נשמרים הנתונים בפרויקט?',
          options: ['Database', 'localStorage', 'Session בלבד', 'קובץ PHP'],
          correctIndex: 1,
          difficulty: 'easy'
        })
      ]
    });
    this.storage.set('exams', [...this.all(), exam]);
  }
}
