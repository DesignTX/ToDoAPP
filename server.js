const PORT = 3000;
const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/ToDoAPP", { useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected");
  });

app.use(bodyParser.urlencoded({ extended: true }));

const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;
app.engine("mustache", mustacheExpressInstance);
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use("/", routes);

// app.get("/", (req, res) => {
//   res.render("index", {});
// });

// app.post("/todos", (req, res) => {
//   res.json(req.body);
// });
