class User {
    constructor(public email: string, public password: string, public age: number) { }

    isEligible(): boolean {
        return this.email.includes("@") && this.password.length >= 8 && this.age >= 18;
    }

    getSummary(): string {
        if (this.isEligible()) {
            return `${this.email} : ELIGIBLE`
        } else {
            return `${this.email} : NOT ELIGIBLE`;
        }
    }

}

const users: User[] = [
    new User("test@gmail.com", "Password26", 50),
    new User("test", "pass", 15),
    new User("test2@gmail.com", "pass12345", 20),
    new User("test111", "pass123123", 40)
];

for (const User of users) {
    console.log(User.getSummary());
}

