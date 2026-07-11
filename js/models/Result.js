export class Result {
  constructor({ id, examId, studentId, answers, score, correctCount, totalQuestions, submittedAt }) {
    this.id = id || crypto.randomUUID();
    this.examId = examId;
    this.studentId = studentId;
    this.answers = answers;
    this.score = score;
    this.correctCount = correctCount;
    this.totalQuestions = totalQuestions;
    this.submittedAt = submittedAt || new Date().toISOString();
  }
}
