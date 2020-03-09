exports.seed = function(knex) {
  return knex("campaigns")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("campaigns").insert([
        {
          title: "Aws",
          color: "#FFDDDD",
          icon: "aws"
        },
        {
          title: "Angular",
          color: "#FFDDDD",
          icon: "angular"
        },
        {
          title: "Java",
          color: "#FFFFCF",
          icon: "java"
        }
      ]);
    });
};
