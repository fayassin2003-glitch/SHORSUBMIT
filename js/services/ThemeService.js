export class ThemeService {
  constructor(storage) {
    this.storage = storage;
  }

  apply() {
    document.body.classList.toggle('dark', this.storage.get('theme', 'light') === 'dark');
  }

  toggle() {
    const next = this.storage.get('theme', 'light') === 'dark' ? 'light' : 'dark';
    this.storage.set('theme', next);
    this.apply();
  }
}
