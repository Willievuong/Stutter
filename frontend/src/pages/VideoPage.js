import React, { Component } from 'react';
import Timer from '../components/Timer';


class VideoPage extends Component {
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this); // i think you are missing this
    }
     
    goBack(){
        this.props.history.goBack();
    }

    state = {
        redirect: false
    }

    render() {
      return (
        <div>
            <Timer />
        </div>
      );
    }
  }
  export default VideoPage;
  
