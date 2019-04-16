// dependencies
require("dotenv").config();
const axios = require("axios");
const db = require("../models");
const path = require("path");


// connecting to books api
module.exports = function(app) {
    app.get("/api/books", (req, res) => {
        db.Book.find().then(
            (booksData) => {
                res.json(booksData);
            }
        ).catch(
            (err) => {
                res.json({error: err});
            }
        );
    });

// post request, connecting with google book search api, to send back the data for the books
    app.post("/search", (req, res) => {
        // set bookTitle to the req.body.title with spaces replaced with plus signs(+)
        let bookTitle = req.body.title.replace(/\s/g, "+");
        axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=${process.env.GBOOKS_KEY}`
        ).then(
            (response) => {
                res.json(response.data.items)
            }
        ).catch(
            (err) => {
                res.json({error: error})
            }
        );
    });

    // post request to put returned book info into db, once uses wants to save that book
    app.post("/api/books", (req, res) => {
        db.Book.create(req.body).then(
            (response) => {
                res.json({successful: response});
            }
        ).catch(
            (err) => {
                res.json({error: err});
            }
        );
    });

    // delete request to remove the saved book 
    app.delete("/api/books/:id", (req, res) => {
        db.Book.findByIdAndDelete(req.params.id).then(
            (response) => {
                res.json({successful: response});
            }
        ).catch(
            (err) => {
                rres.json({error: err});
            }
        );
    });

    // Send every other request to the React app
    // Define any API routes before this runs
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
}
