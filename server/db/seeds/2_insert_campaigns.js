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
        },
        {
          title: "Javascript",
          color: "#D9FFDF",
          icon: "js"
        },
        {
          title: "React",
          color: "#D9FFFF",
          icon: "react"
        }
      ]);
    });
};
