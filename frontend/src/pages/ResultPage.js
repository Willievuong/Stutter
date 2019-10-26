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
        <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
            <h1 style={{ color: 'white', fontSize: 90 }}>Stutter</h1>
            <h1 style={{flex: 1, color: 'white', marginTop: 35}}>
                Your Result:
            </h1>
        </div>
      );
    }
  }
  export default ResultPage;
  
