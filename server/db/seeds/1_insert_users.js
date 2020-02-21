exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          firstname: "David",
          lastname: "Verhulst",
          email: "david.verhulst@cronos.be"
        },
        {
          firstname: "Hanim",
          lastname: "Kapusuz",
          email: "hanim.kapusuz@optis.be"
        }
      ]);
    });
};
