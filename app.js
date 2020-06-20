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
            email: "josiahrondeau@gmail.com",
            square_link: "https://square.site/book/0J0ATY1KQYSS5/precise-mobile-llc-random-lake-wi"
        },
        packages: [
            {
                name: "Basic Interior",
                services: [
                    "Surface Dusting and UV Protection",
                    "Air Vent Dusting",
                    "Interior Glass Polish",
                    "Interior Vacuum",
                    "Sun Roof and Gauge Cluster Polish",
                    "Door Jamb Wipe Down",
                    "Fragrance Application"
                ],
                prices: [
                    {
                        name: "Coupe/Sedan",
                        cost: 49,
                    },
                    {
                        name: "Light Truck/SUV",
                        cost: 59,
                    },
                    {
                        name: "Full Size Truck",
                        cost: 69,
                    },
                    {
                        name: "Full Size SUV",
                        cost: 79,
                    }
                ]
            },
            {
                name: "Basic Exterior",
                services: [
                    "Liquid Carnauba Wax",
                    "Exterior Glass Polish", 
                    "Steam Wash",
                    "Steam Clean Wheels and Tires",
                    "Tire Dress"
                ],
                prices: [
                    {
                        name: "Coupe/Sedan",
                        cost: 49,
                    },
                    {
                        name: "Light Truck/SUV",
                        cost: 59,
                    },
                    {
                        name: "Full Size Truck",
                        cost: 69,
                    },
                    {
                        name: "Full Size SUV",
                        cost: 79,
                    }
                ]
            },
            {
                name: "Basic Full Car",
                services: [
                    "All Basic Interior Services",
                    "All Basic Exterior Services"
                ],
                prices: [
                    {
                        name: "Coupe/Sedan",
                        cost: 89,
                        link: ""
                    },
                    {
                        name: "Light Truck/SUV",
                        cost: 109,
                        link: ""
                    },
                    {
                        name: "Full Size Truck",
                        cost: 129,
                        link: ""
                    },
                    {
                        name: "Full Size SUV",
                        cost: 139,
                        link: ""
                    }
                ]
            },
        ]
    });
});

// Start serving files, IP defaults to 127.0.0.1
app.listen(port, () => console.log(`Server listening at http://127.0.0.1:${port}/`));
