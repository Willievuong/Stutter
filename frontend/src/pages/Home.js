import React, { Component } from 'react';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'


class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            onButton: false,
        }
        this.goBack = this.goBack.bind(this); 
        this.handleOver = this.handleOver.bind(this);
    }

    handleOver(){
        this.setState((prevState, props) => ({onButton: !prevState.onButton}))
    }
     
    goBack(){
        this.props.history.goBack();
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Link to='/video' />
        }
    }

    render() {
        let buttonStyle = {
            width: 350, 
            height: 350,
            color: 'white',
        };

        if(!this.state.onButton){
            buttonStyle.color = 'white'
        } else {
            buttonStyle.color = 'white'
        }

      return (
        <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
            <h1 style={{ color: 'white', fontSize: 90 }}>Stutter</h1>
            <Link to='/video'>
                <IconButton style={{ marginTop: 45, marginBottom: 15 }} onMouseOver={this.handleOver}>
                    <PlayCircleFilledIcon style={buttonStyle}/>
                </IconButton>
            </Link>
            <h1 style={{flex: 1, color: 'white', marginTop: 35}}>
                Interview Prep.
            </h1>
        </div>
      );
    }
  }
  export default Home;
  
