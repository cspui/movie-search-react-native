import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Movie from './components/Movie';

/*
  How to run:
  platform: ios, android, web
  npm run-script start

  expo start --[platform]
*/

export default function App() {
  return (
    <Router>

      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>

        <Route path="/movie" exact>
          <Movie></Movie>
        </Route>

      </Switch>
    </Router>
  );
}



