if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const port = process.env.PORT || 8080;
const methodOverride = require("method-override");
const app = express();
const expressLayouts = require("express-ejs-layouts");

//configure bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

//use method override
app.use(methodOverride("_method"));

//import router files
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

// set the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);

// public files
app.use(express.static(__dirname + "/public"));

// app.get('/', (req, res) => {
//     res.send('hello world can yo do bro right now if you can help ? because');
// })
console.log("hello dear");

// import db
const mongoose = require("mongoose");

mongoose

  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })

  .then(() => console.log("Database Connected Successfully ss"))

  .catch((err) => console.log(err));

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(port, () => {
  console.log(`Listning on the port at ${port}`);
});
