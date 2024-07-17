const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const routes = require("./routes");

app.use(bodyParser.json());
app.use(invalidJsonHandler); // Middleware for invalid JSON
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function invalidJsonHandler(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next();
}
