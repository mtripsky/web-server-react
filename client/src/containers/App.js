import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// We'll load our views from the `src/views`
import NavbarBootstrap from "../views/NavbarBootstrap";
import Home from "../views/Home";
import About from "../views/About"
import Weather from "../views/Weather";
import FlatClima from "../views/FlatClima";
import FlatPlants from "../views/FlatPlants";

const App = props => {
  return (
      <Router>
        <NavbarBootstrap />
        <Switch>
          <Route path="/weather" component={Weather} />
          <Route path="/flat/clima" component={FlatClima} />
          <Route path="/flat/plants" component={FlatPlants} />
          <Route path="/about" component={About} />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
  );
};

export default App;
