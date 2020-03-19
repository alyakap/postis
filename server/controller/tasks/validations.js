const validatePostTask = () =>
  checkSchema({
    campaignId: {
      custom: {
        options: async value => {
          return (await knex("campaigns").where({ id: 33 })) == null;
        },
        errorMessage: "# not included"
      }
    }
    // title: {
    //   isLength: {
    //     options: { min: 10, max: undefined },
    //     errorMessage: "Title should be at least 10 characters"
    //   }
    // },
    // color: {
    //   isHexColor: true,
    //   errorMessage: "Invalid hexcolor",
    //   custom: {
    //     options: value => {
    //       return value.indexOf("#") === 0;
    //     },
    //     errorMessage: "# not included"
    //   }
    // },
    // icon: {
    //   isAlphanumeric: true
    // }
  });
