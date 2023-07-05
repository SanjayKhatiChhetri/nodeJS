const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

// Set the view engine to pug
app.set("view engine", "pug");
// Middleware
app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


let customers = [
	{id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
	{id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113'},
	{id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176'},
  ]

// Routes
app.get("/", (req, res) => {
	res.render("customers.pug", { customers });
});

app.get("/addCustomer", (req, res) => {
	res.render("add_customer.pug");
});
app.post("/addCustomer", (req, res) => {
	const { firstName, lastName, email, phone } = req.body;
	const id = Date.now().toString();
	customers.push({ id, firstName, lastName, email, phone });
	res.redirect("/");
});

app.get("/editCustomer/:id", (req, res) => {
	const { id } = req.params;
	const customer = customers.find((customer) => customer.id === id);
	res.render("edit_customer.pug", { customer });
});

app.listen(port, () => console.log(`Server running on port ${port}`));