
const express = require('express');
const app = express();

const path = require('path');

const ejs = require('ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080;

const VIEWS_FOLDER = path.join(__dirname, "/views/");
const PUBLIC_FOLDER = path.join(__dirname, "/public/");
app.use(express.static(PUBLIC_FOLDER));
app.set("view engine", "html");
app.set('views', VIEWS_FOLDER);
app.engine("html", ejs.renderFile)


app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("node_modules/bootstrap/dist/js"));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get("/", (req, res) => {
    const fileName = path.join(VIEWS_FOLDER, "index.html");
    res.render(fileName);
});

app.use((req, res, next) => {
    const fileName = path.join(VIEWS_FOLDER, "page-not-found.html");
    res.status(404).render(fileName);
});

