import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import VideoPage from './pages/VideoPage';
import ResultPage from './pages/ResultPage';
import Dashboard from './pages/Dashboard';
import './App.css';


class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        sessionID: '',
        title: '',
        questionIds: []
    }
    this.handleID = this.handleID.bind(this);
}

  handleID(newVal, newTitle, newQs){
    this.setState({
      sessionID: newVal,
      title: newTitle,
      questionIds: newQs
    })
  }

  
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home handler={this.handleID}/>
            </Route>
            <Route exact path="/video">
              <VideoPage questionIds={this.state.questionIds} sessionID={this.state.sessionID} title={this.state.title}/>
            </Route>
            <Route exact path="/result" sessionID={this.state.sessionID} component={ResultPage} />
            <Route exact path="/dashboard" component={Dashboard}/>
          </Switch>
        </div>
      </Router>
      

    );
  }
}
export default App;
