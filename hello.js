const testUsers = [
  { email: "sara@test.com", password: "Pass1234" },
  { email: "omar@test.com", password: "Wrong" }
];

for (const user of testUsers) {
  console.log(user.email);
}