exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@mail.com"
        },
        {
          firstname: "Jane",
          lastname: "Doe",
          email: "jane.doe@mail.com"
        },
        {
          firstname: "Tom",
          lastname: "Sawyer",
          email: "tom.sawyer@mail.com"
        },
        {
          firstname: "Jimmy",
          lastname: "Carter",
          email: "jim.carter@mail.com"
        },
        {
          firstname: "Emily",
          lastname: "Jackson",
          email: "emily@mail.com"
        }
      ]);
    });
};
