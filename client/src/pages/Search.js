import React from "react";
import { SearchForm, ResultsContainer } from '../components';
import API from "../utils/API";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookInput: "",
            bookData: []
        }
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // function to handle user text imput
    handleChange(e) {
        e.preventDefault();
        this.setState({bookInput: e.target.value})
    }

    // function to handle click event
    handleSearchClick(e) {
        e.preventDefault();
        API.searchBooks(this.state.bookInput)
            .then(
                (response) => {
                    this.setState({bookData: response.data});
                    this.setState({bookInput: ""});
                }
            );
    }

    render() {
        return(
            <main>
                <SearchForm handleChange={this.handleChange} handleSearchClick={this.handleSearchClick} />
                {(this.state.bookData.length > 0)?
                    <ResultsContainer bookData={this.state.bookData} path={this.props.match.path}/> : null
                }
            </main>
        );
    }
}

export default Search;