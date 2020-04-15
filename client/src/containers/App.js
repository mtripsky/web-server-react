import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// We'll load our views from the `src/views`
import NavbarBootstrap from '../views/NavbarBootstrap';
import Home from '../views/Home';
import About from '../views/About';
import Weather from '../views/Weather';
import FlatMonitor from '../views/FlatMonitor';
import FlatPlants from '../views/FlatPlants';

const App = (props) => {
  return (
    <Router>
      <NavbarBootstrap />
      <Switch>
        <Route path='/weather' component={Weather} />
        <Route path='/flat/monitor' component={FlatMonitor} />
        <Route path='/flat/plants' component={FlatPlants} />
        <Route path='/about' component={About} />
        <Route path='*' component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
