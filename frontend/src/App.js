import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import VideoPage from './pages/VideoPage';
import ResultPage from './pages/ResultPage';
import './App.css';

class App extends Component {

  
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/video" component={VideoPage} />
            <Route exact path="/result" component={ResultPage} />
          </Switch>
        </div>
      </Router>
      

    );
  }
}
export default App;
