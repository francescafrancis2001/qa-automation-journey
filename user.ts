class user {
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

const users: user[] = [
    new user("test@gmail.com", "Password26", 50),
    new user("test", "pass", 15),
    new user("test2@gmail.com", "pass12345", 20),
    new user("test111", "pass123123", 40)
];

for (const user of users) {
    console.log(user.getSummary());
}

