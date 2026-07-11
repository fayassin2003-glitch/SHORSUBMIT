import { Question } from '../models/Question.js';
import { Result } from '../models/Result.js';

export class ResultService {
  constructor(storage, examService) {
    this.storage = storage;
    this.examService = examService;
  }

  all() {
    return this.storage.get('results');
  }

  byStudent(studentId) {
    return this.all().filter(result => result.studentId === studentId);
  }

  byExam(examId) {
    return this.all().filter(result => result.examId === examId);
  }

  submit(examId, studentId, answers) {
    const exam = this.examService.findById(examId);
    const questions = (exam.questions || []).map(question => new Question(question));
    // החישוב נעשה בצד לקוח כי הפרויקט פועל ללא שרת או בסיס נתונים.
    const correctCount = questions.reduce((count, question) => {
      return count + (question.isCorrect(answers[question.id]) ? 1 : 0);
    }, 0);
    const score = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;

    const result = new Result({
      examId,
      studentId,
      answers,
      score,
      correctCount,
      totalQuestions: questions.length
    });

    this.storage.set('results', [...this.all(), result]);
    return result;
  }

  average(studentId) {
    const results = this.byStudent(studentId);
    if (!results.length) return 0;
    return Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length);
  }
}
