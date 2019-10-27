import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSurprise, faSmile, faSadTear, faAngry, faGrinBeam, faGrinBeamSweat, faFrownOpen, faMeh, faTired } from '@fortawesome/free-regular-svg-icons'
import { faBatteryFull, faBatteryHalf, faBatteryQuarter} from '@fortawesome/free-solid-svg-icons'

import CloseIcon from '@material-ui/icons/Close';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';



class SimpleCard extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            nothing: true,
        }
    }

    renderCorrectPercent(val){
      const confStyle = {
        flex: 1,
        width: 100,
        height: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        marginTop: 10,
        marginBottom: -40,
      }
      return (
        <div style={confStyle}>
            <DoneOutlineIcon style={{color: '#42f590', width: 100, height: 100,}} />
            <h2>{Math.round(val*100)}% Correct</h2>
        </div> )
    }

    renderIncorrectPercent(val){
      const confStyle = {
        flex: 1,
        width: 100,
        height: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        marginTop: 10,
        marginBottom: -40,
      }
      return (
        <div style={confStyle}>
            <CloseIcon style={{color: 'red', width: 100, height: 100,}} />
            <h2>{Math.round(val*100)}% Incorrect</h2>
        </div> )
    }

    renderConfidence(val){
      const confStyle = {
        flex: 1,
        width: 100,
        height: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        marginTop: 10,
        marginBottom: -40,
      }
      if(val > 0.85){
        return (
            <div style={confStyle}>
                <FontAwesomeIcon style={{color: '#42f590', width: 100, height: 100,}} icon={faBatteryFull} />
                  <h2>{Math.round(val*100)}% Confident</h2>
            </div> )
      } else if (val > 0.45) {
        return (
            <div style={confStyle}>
                <FontAwesomeIcon style={{color: '#f5bc42', width: 100, height: 100,}} icon={faBatteryHalf} />
                <h2>{Math.round(val*100)}% Confident</h2>
            </div> )
      } else {
        return (
            <div style={confStyle}>
                <FontAwesomeIcon style={{color: '#f54e42', width: 100, height: 100,}} icon={faBatteryQuarter} />
                <h2>{Math.round(val*100)}% Confident</h2>         
            </div> )
      }
    }

    renderEmotion(string){
      //HAPPY | SAD | ANGRY | CONFUSED | DISGUSTED | SURPRISED | CALM | UNKNOWN | FEAR
      const faceStyle = {
            flex: 1,
            width: 100,
            height: 50,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: -40,
        }
      switch(string) {
        case "HAPPY":
          // code block
          return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 100, height: 100,}} icon={faGrinBeam} />
                <h2>HAPPY</h2>
            </div> )
          break;
        case "SAD":
          // code block
          return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 100, height: 100,}} icon={faSadTear} />
                <h2>SAD</h2>
            </div> )
          break;
        case "ANGRY":
            return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 100, height: 100,}} icon={faAngry} />
                <h2>ANGRY</h2>
            </div> )
            break;
        case "CONFUSED":
          // code block
          return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 100, height: 100,}} icon={faGrinBeamSweat} />
                <h2>CONFUSED</h2>
            </div> )
          break;
        case "DISGUSTED":
          // code block
          return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 100, height: 100,}} icon={faFrownOpen} />
                <h2>DISGUSTED</h2>
            </div> )
          break;
        case "SURPRISED":
        // code block
            return (
                <div style={faceStyle}>
                    <FontAwesomeIcon style={{color: '', width: 100, height: 100,}} icon={faSurprise} />
                    <h2>SURPRISED</h2>
                </div> )
          break;
        case "CALM":
        // code block
        return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 100, height: 100,}} icon={faSmile} />
                <h2>CALM</h2>
            </div> )
          break;
        case "FEAR":
        // code block
         return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 100, height: 100,}} icon={faTired} />
                <h2>FEAR</h2>
            </div> )
          break;
        default:
            return (
                <div style={faceStyle}>
                    <FontAwesomeIcon style={{color: '', width: 100, height: 100,}} icon={faMeh} />
                    <h2>UNKNOWN</h2>
                </div> )
          // code block
      }

  }

    render(){
      return (
          <Card style={{minWidth: 220, height: 200, marginLeft: 60, borderRadius: 50}}>
            <CardContent style={{ display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                {this.props.icon ? this.renderEmotion(this.props.icon) : (null)}
                {this.props.conf ? this.renderConfidence(this.props.conf) : (null)}
                {this.props.corrPerc ? this.renderCorrectPercent(this.props.corrPerc) : (null)}
                {this.props.inCorrPerc ? this.renderIncorrectPercent(this.props.inCorrPerc) : (null)}
                <Typography variant="body2" component="p">
                  {this.props.description}
                </Typography>
            </CardContent>
          </Card>
      );
    }
}

export default SimpleCard;