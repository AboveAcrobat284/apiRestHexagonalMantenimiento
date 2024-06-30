// src/domain/models/admin.ts
export default class Admin {
    id: string | null;
    email: string;
    password: string;

    constructor(id: string | null, email: string, password: string) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
}
