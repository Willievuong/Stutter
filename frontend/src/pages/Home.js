import React, { Component } from 'react';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'
import axios from 'axios';
import HomeIcon from '@material-ui/icons/Home';
import RubberBand from 'react-reveal/RubberBand';


class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            onButton: false,
            sessionID: '',
            questionIds: '',
            title: ''
        }
        this.goBack = this.goBack.bind(this); 
        this.handleOver = this.handleOver.bind(this);
    }

    componentDidMount(){
        this.handleSessionID();
    }

    async handleSessionID(){
        var response = axios.post(`http://83147b49.ngrok.io/savesession/`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({
                    sessionID: res.data.id,
                    title: res.data.title,
                    questionIds: res.data.question_id
                })
                this.props.handler(this.state.sessionID, this.state.title, this.state.questionIds)
                console.log(this.state.sessionID)
            })
            .catch(err => {
                console.log(err)
            })
        
        console.log(this.state.sessionID)
        console.log(response)
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
            return <Link to='/video' params={{ sessionID: this.state.sessionID }}/>
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
            <h1 style={{ marginTop: 20, color: 'white', fontSize: 120 }}>Stutter</h1>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <Link to='/video' params={{ sessionID: this.state.sessionID }}>
                    <IconButton style={{ marginLeft: '-5%', marginTop: '10%', marginBottom: 15 }} onMouseOver={this.handleOver}>
                        <RubberBand>
                            <PlayCircleFilledIcon style={buttonStyle}/>
                        </RubberBand>
                    </IconButton>
                </Link>
                <Link to='/dashboard' style={{ marginLeft: '5%', }} params={{ sessionID: this.state.sessionID }}>
                    <IconButton style={{ marginTop: '10%', marginBottom: 15 }} onMouseOver={this.handleOver}>
                        <RubberBand>
                            <HomeIcon style={buttonStyle}/>
                        </RubberBand>
                    </IconButton>
                </Link>
            </div>
            <h1 style={{flex: 1, color: 'white', marginTop: '2%'}}>
                Interview Prep.
            </h1>
        </div>
      );
    }
  }
  export default Home;
  
