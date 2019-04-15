import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Header, Nav} from './components';
import { Search, Saved} from './pages';
import "./App.css";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Nav />
          <Switch>
            <Route exact path="/" component={Search}/>
            <Route path="/saved" component={Saved}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
