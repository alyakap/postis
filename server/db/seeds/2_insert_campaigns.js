exports.seed = function(knex) {
  return knex("campaigns")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("campaigns").insert([
        {
          title: "Aws",
          color: "#FFDDDD",
          icon: "fas fa-rocket"
        },
        {
          title: "Angular",
          color: "#FFDDDD",
          icon: "fas fa-flag"
        },
        {
          title: "Java",
          color: "#FFFFCF",
          icon: "fas fa-bullhorn"
        },
        {
          title: "Javascript",
          color: "#D9FFDF",
          icon: "far fa-bell"
        },
        {
          title: "React",
          color: "#D9FFFF",
          icon: "fab fa-linkedin-in"
        }
      ]);
    });
};
