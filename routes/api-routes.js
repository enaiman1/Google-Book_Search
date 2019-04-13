// dependencies
require("dotenv").config(); //getting google book api key
const axios = require("axios");
const db = require("../models");
const path = require("path");


//setting up routes
module.export = function(app) {

    //get method that matches with "/api/books"
    app.get("/api/books", (reg, res) => {
        db.Book.find().then(
            (booksData) => {
                res.json(booksData);
                console.log("***** get method api/books ****")
            console.log(booksData);
            console.log("***** ****")
            }
        ).catch(
            (err) => {
                res.json({error: err});
                console.log(`Error connecting to api/books`);
            }
        );
    });


    // post method the matches with "/search"
app.post("/search", (req, res) => {
    //set bookTitle to the req.body.title with spaces replaced with plus signs(+)
    let bookTitle = req.body.title.replace(/\s/g, "+");
    // call to google books api to get result
    axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=${process.env.GBOOKS_KEY}`
    ).then (
        (response)=> {
            res.json(response.data.items)
            console.log("***** search post request ****")
            console.log(response);
            console.log("***** ****")
        }
    ).catch (
        (err) => {
            res.json({error: error})
            console.log(`Error connecting to search api`);
        }
    );
});

// post method that matches api/books for when the book has been posted to the page
app.post("/api/books", (req, res) => {
    db.Book.create(req.body).then(
        (response) => {
            res.json({successful: response});
            console.log("***** api/books/ post request ****")
            console.log(response);
            console.log("***** ****")
        }
    ).catch(
        (err) => {
            res.json({error: err});
            console.log(`Error connecting to  post api/books`);
        }
    );
});

app.delete("/api/books/:id", (req, res) => {
    db.Book.findByIdAndDelete(req.params.id).then(
        (response) => {
            res.json({successful:response});

        }
    ).catch(
        (err) => {
            res.json({error: err});
            console.log(`Error deleting to api/books/:id`);
        }
    );
});

// Send every other request to the React app
    // Define any API routes before this runs
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
        });

}

