exports.seed = function(knex) {
  return knex("campaigns")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("campaigns").insert([
        {
          id: 1,
          title: "Aws",
          color: "#FFDDDD",
          icon: "aws"
        },
        {
          id: 2,
          title: "Angular",
          color: "#FFDDDD",
          icon: "angular"
        },
        {
          id: 3,
          title: "Java",
          color: "#FFFFCF",
          icon: "java"
        },
        {
          id: 4,
          title: "Javascript",
          color: "#D9FFDF",
          icon: "js"
        },
        {
          id: 5,
          title: "React",
          color: "#D9FFFF",
          icon: "react"
        }
      ]);
    });
};
