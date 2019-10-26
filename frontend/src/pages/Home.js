import React, { Component } from 'react';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'

class Home extends Component {

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
      return (
        <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
            <h1>Stutter</h1>
            <Link to='/video'>
                <IconButton>
                    <PlayCircleFilledIcon style={{ width: 380, height: 380}}/>
                </IconButton>
            </Link>
            <h1 style={{flex: 1}}>Instructions...</h1>
        </div>
      );
    }
  }
  export default Home;
  
