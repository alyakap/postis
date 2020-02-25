const { getUsers, editUser } = require("./queries");

const handleGetUserList = async (req, res) => {
  res.send(await getUsers());
};
const handleEditUser = async (req, res) => {
  const users = await editUser(parseInt(req.params.id), req.body);
  res.json(users);
};
module.exports = {
  handleGetUserList,
  handleEditUser
};
