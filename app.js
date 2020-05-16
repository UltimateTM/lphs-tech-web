const express = require("express");
const path = require("path");
const sassMiddleware = require("node-sass-middleware");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(
    sassMiddleware({
        src:            path.join(__dirname, "/static/sass"),
        dest:           path.join(__dirname, "/static/css"),
        debug:          false,
        outputStyle:    "compressed",
        prefix:         "/static/css"
    })
);

app.use("/static", express.static(path.join(__dirname, "/static")));

app.get("/", function(req, res) {
    res.render("pages/index", {
        contact: {
            phone: "(920) 918-6473",
            email: "josiahrondeau@gmail.com"
        },
        pricing: {
            basic_interior: 39.99,
            basic_exterior: 49.99,
            basic_full_car: 69.99
        }
    });
});

// Start serving files, IP defaults to 127.0.0.1
app.listen(port, () => console.log(`Server listening at http://127.0.0.1:${port}/`));
