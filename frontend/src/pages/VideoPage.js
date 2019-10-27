import React, { Component } from 'react';
import Timer from '../components/Timer';
import { Redirect } from 'react-router-dom'

class VideoPage extends Component {
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this); 
        this.state = {
          redirect: false,
          question: ['What is a BST?', "Explain the git cycle", "Difference between git and github"],
          current: 0,
          sessionID: this.props.sessionID,
          title: this.props.title,
          questionIds: this.props.questionIds
        }
        console.log(this.props.sessionID)
        this.handler = this.handler.bind(this)
    }

    handler(newValue) {
      this.setState({
        current: newValue
      })
    }
ha
    goBack(){
        this.props.history.goBack();
    }

    render() {
      return (
        <div>
            {this.state.question.map((i, item) => {
                if(item === this.state.current){
                  return (
                      <Timer sessionID={this.state.sessionID} title={this.state.title} reading={true} handler={this.handler} question={i} index={item} key={item}/> 
                  )
                } else {
                  return ( null )
                }
              })}
            {this.state.current === 3 ? (
              <Redirect to='/result' />
            ) : ( null )}
        </div>
      );
    }
  }
  export default VideoPage;
  
