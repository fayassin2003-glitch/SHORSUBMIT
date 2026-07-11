export class User {
  constructor({ id, name, identity, email, password, role }) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.identity = identity;
    this.email = email.toLowerCase();
    this.password = password;
    this.role = role;
    this.createdAt = new Date().toISOString();
  }
}
