export class StorageService {
  constructor(prefix = 'examSystem') {
    this.prefix = prefix;
  }

  key(name) {
    // Prefix מונע התנגשות עם פרויקטים אחרים ששומרים נתונים באותו דפדפן.
    return `${this.prefix}:${name}`;
  }

  get(name, fallback = []) {
    const raw = localStorage.getItem(this.key(name));
    return raw ? JSON.parse(raw) : fallback;
  }

  set(name, value) {
    localStorage.setItem(this.key(name), JSON.stringify(value));
  }

  remove(name) {
    localStorage.removeItem(this.key(name));
  }
}
