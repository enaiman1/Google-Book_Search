import React from "react";
import BookResult from "../BookResult";
import "./ResultsContainer.css";

function ResultsContainer(props) {
    // if your in the main page it will show book search box, will eventual show result
    if(props.path === "/") {
        return(
            <div id="resultsContainer">
                <h3>Results Found</h3>
                {/* creates new array with the results recieved from google book search api */}
                {props.bookData.map((book) => {
                    const bookInfo = book.volumeInfo;
                    return <BookResult
                    title={bookInfo.title}
                    authors={bookInfo.authors}
                    description={bookInfo.description}
                    link={bookInfo.canonicalVolumeLink}
                    img={bookInfo.imageLinks}
                    path={props.path}
                    key={book.id}/>
                })}
            </div>
        );
        // if user is on saved paged the result will be show
    } else if(props.path === "/saved") {
        if(props.savedBooks.length > 0) {
            return(
                <div id="resultsContainer">
                    <h3>Saved Books</h3>
                    {/* creates new array to list books that have been saved  */}
                    {props.savedBooks.map((book) => {
                        return <BookResult
                        title={book.title}
                        authors={book.authors}
                        description={book.description}
                        link={book.link}
                        img={book.img}
                        id={book._id}
                        path={props.path}
                        key={book._id}/>
                    })}
                </div>
            );
            // if there are not saved books
        } else {
            return(
                 <div id="resultsContainer">
                    <h3>Saved Books</h3>
                    <p>No saved books.</p>
                </div>
            );
        }
    }
}

export default ResultsContainer;