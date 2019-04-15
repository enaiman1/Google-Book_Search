import React from "react";
import {Link} from "react-router-dom";
import "./Nav.css";

function Nav() {
    return(
        <nav>
            <h2>Google Books</h2>
            <Link to="/">Search</Link>
            <Link to="/saved">Saved</Link>
        </nav>
    );
}

export default Nav;