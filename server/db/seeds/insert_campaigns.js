exports.seed = function(knex) {
  return knex("campaigns")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("campaigns").insert([
        {
          id: 1,
          title: "React",
          color: "Blue",
          icon: "rocket"
        },
        {
          id: 2,
          title: "Angular",
          color: "Red",
          icon: "rocket"
        }
      ]);
    });
};
