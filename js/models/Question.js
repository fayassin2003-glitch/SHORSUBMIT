export class Question {
  constructor({ id, text, options, correctIndex, difficulty = 'medium' }) {
    this.id = id || crypto.randomUUID();
    this.text = text;
    this.options = options;
    this.correctIndex = Number(correctIndex);
    this.difficulty = difficulty;
  }

  isCorrect(answerIndex) {
    return Number(answerIndex) === this.correctIndex;
  }
}
