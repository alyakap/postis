exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          firstname: "David",
          lastname: "Verhulst",
          email: "david.verhulst@cronos.be"
        },
        {
          id: 2,
          firstname: "Hanim",
          lastname: "Kapusuz",
          email: "hanim.kapusuz@optis.be"
        }
      ]);
    });
};
