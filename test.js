const express = require("express");
const ViewManager = require("./");
const Hogan = require("hogan.js");

const app = express();

const views = new ViewManager();

views.compile(v => Hogan.compile(v));
views.render((v, locals) => v.render(locals));

views.add(__dirname + "/views/*.mustache");

app.engine("mustache", views.engine());
app.set("view engine", "mustache");

app.get("/", (req, res) => res.render("index"));
app.listen(8080)
