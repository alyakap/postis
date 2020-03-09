const app = require("./app");
const port = 4567;
//const app = express();
app.listen(port, () => {
  console.log(`Server is listening on port:${port}...`);
});
