import React from "react";
import {Link} from "react-router-dom";
import "./Nav.css";

function Nav() {
    return(
        <nav>
            <p>powered by</p>
            <i class="fab fa-google fa-2x"></i>
            <Link to="/">Search</Link>
            <Link to="/saved">Saved</Link>
        </nav>
    );
}

export default Nav;