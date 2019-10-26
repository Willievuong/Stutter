import React, { Component } from 'react';

class ResultPage extends Component {

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
        <h1>Result</h1>
      );
    }
  }
  export default ResultPage;
  
