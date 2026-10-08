const testUsers = [
  { email: "sara@test.com", password: "Pass1234" },
  { email: "omar@test.com", password: "Wrong" },
  { email: "nour@test.com", password: "Wrong1234" }
];

for (const user of testUsers) {
  console.log(user.email);
}