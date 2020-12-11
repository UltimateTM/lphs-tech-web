const express = require("express");
const fs = require("fs");
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
            phone: [
                "(123) 456-7891",
                "(123) 456-7891",
            ],
            email: [
                "zkoesler@lphs.net",
                "awiercinski@lphs.net",
            ],
            link: "/contact"
        },

    });
});

app.get("/contact", function(req, res) {
    res.render("pages/contact", {
        contact: {
            phone: [
                "(123) 456-7891",
                "(123) 456-7891",
            ],
            email: [
                "zkoesler@lphs.net",
                "awiercinski@lphs.net",
            ],
        }
    });
});

app.get("/club_members", function(req, res) {
    res.render("pages/club_members", {
        contact: {
            phone: [
                "(123) 456-7891",
                "(123) 456-7891",
            ],
            email: [
                "zkoesler@lphs.net",
                "awiercinski@lphs.net",
            ],
        },
        images: getImages(path.join(__dirname, "/static/img/gallery"))
    });
});

// Get images from gallery
function getImages(dirPath) {

    let images = [];
    let files = fs.readdirSync(dirPath);

    files.forEach(function(file) {
        let filePath = path.join(dirPath, file);
        
        let stat = fs.statSync(filePath);

        if (stat && stat.isFile() && ['.jpg', '.png', '.PNG'].indexOf(path.extname(filePath)) != -1) {
            images.push(path.relative(__dirname, filePath));
        }
    });

    return images;
}

// Start serving files, IP defaults to 127.0.0.1
app.listen(port, () => console.log(`Server listening at http://127.0.0.1:${port}/`));
