import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSurprise, faSmile, faSadTear, faAngry, faGrinBeam, faGrinBeamSweat, faFrownOpen, faMeh, faTired } from '@fortawesome/free-regular-svg-icons'
import { faBatteryFull, faBatteryHalf, faBatteryQuarter} from '@fortawesome/free-solid-svg-icons'
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';


class Slides extends Component {
    constructor(props){
      super(props)
      this.state = {
        questions: [
          'Question 1: Binary Search Tree', 
          'Question 2: Git Cycle', 
          'Question 3: Git VS Github'
        ],
        faces: this.props.faces,
        keywordsMissed: this.props.keywordsMissed
      }
    }

    renderCorrectPercent(val, word){
      const confStyle = {
        flex: 1,
        width: 100,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        marginTop: 10,
        marginBottom: -40,
      }
      return (
        <div style={confStyle}>
            <DoneOutlineIcon style={{paddingLeft: 125, color: '#42f590', width: 50, height: 50,}} />
            <div style={{width: 100}}>
              <Typography variant="body2" style={{marginLeft: 15, fontSize: 12}}>Successfully mentioned: <br/> "{word}"</Typography>
            </div>
        </div> )
    }

    renderIncorrectPercent(val, notMentioned){
      const confStyle = {
        flex: 1,
        width: 100,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        marginTop: 10,
        marginBottom: -40,
      }
      return (
        <div style={confStyle}>
            <CloseIcon style={{paddingLeft: 125, color: 'red', width: 50, height: 50,}} />
            <div style={{width: 100}}>
              <Typography variant="body2" style={{marginLeft: 15, fontSize: 12}}>Did not mention:<br/>{notMentioned}</Typography>
            </div>
        </div> )
    }

    renderConfidence(val){
      const confStyle = {
        flex: 1,
        width: 100,
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        marginTop: 10,
        paddingLeft: 20,
        marginBottom: -40,
      }
      if(val > 0.85){
        return (
            <div style={confStyle}>
                <FontAwesomeIcon style={{color: '#42f590', width: 50, height: 50,}} icon={faBatteryFull} />
                  <h4 style={{marginLeft: 10}}>{Math.round(val*100)}% Confident</h4>
            </div> )
      } else if (val > 0.45) {
        return (
            <div style={confStyle}>
                <FontAwesomeIcon style={{color: '#f5bc42', width: 50, height: 50,}} icon={faBatteryHalf} />
                <h4 style={{marginLeft: 10}}>{Math.round(val*100)}% Confident</h4>
            </div> )
      } else {
        return (
            <div style={confStyle}>
                <FontAwesomeIcon style={{color: '#f54e42', width: 50, height: 50,}} icon={faBatteryQuarter} />
                <h4 style={{marginLeft: 10}}>{Math.round(val*100)}% Confident</h4>
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
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            paddingLeft: 40,
            marginBottom: -40,
        }
      switch(string) {
        case "HAPPY":
          // code block
          return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 50, height: 50,}} icon={faGrinBeam} />
                <h2 style={{marginLeft: 15 }}>HAPPY</h2>
            </div> )
          break;
        case "SAD":
          // code block
          return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 50, height: 50,}} icon={faSadTear} />
                <h2 style={{marginLeft: 15 }}>SAD</h2>
            </div> )
          break;
        case "ANGRY":
            return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 50, height: 50,}} icon={faAngry} />
                <h2 style={{marginLeft: 15 }}>ANGRY</h2>
            </div> )
            break;
        case "CONFUSED":
          // code block
          return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 50, height: 50,}} icon={faGrinBeamSweat} />
                <h2 style={{marginLeft: 15 }}>CONFUSED</h2>
            </div> )
          break;
        case "DISGUSTED":
          // code block
          return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 50, height: 50,}} icon={faFrownOpen} />
                <h2 style={{marginLeft: 15 }}>DISGUSTED</h2>
            </div> )
          break;
        case "SURPRISED":
        // code block
            return (
                <div style={faceStyle}>
                    <FontAwesomeIcon style={{color: '', width: 50, height: 50,}} icon={faSurprise} />
                    <h2 style={{marginLeft: 15 }}>SURPRISED</h2>
                </div> )
          break;
        case "CALM":
        // code block
        return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 50, height: 50,}} icon={faSmile} />
                <h2 style={{marginLeft: 15 }}>CALM</h2>
            </div> )
          break;
        case "FEAR":
        // code block
         return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 50, height: 50,}} icon={faTired} />
                <h2 style={{marginLeft: 15 }}>FEAR</h2>
            </div> )
          break;
        default:
            return (
                <div style={faceStyle}>
                    <FontAwesomeIcon style={{color: '', width: 50, height: 50,}} icon={faMeh} />
                    <h2 style={{marginLeft: 15 }}>UNKNOWN</h2>
                </div> )
          // code block
      }

  }
      
  
    calculateScore(correct, userInputs) {
        //console.log(userInputs)
        const common = correct.filter(value =>
          userInputs.includes(value)
        );
        let score = common.length / correct.length;
        return score;
      }

    render() {
      const keyword_q1 = ["BST", "node", "data structure", "leaf"];
      const keyword_q2 = ["git", "add", "commit", "version control", "branch"];
      const keyword_q3 = ["version control", "remote", "local", "push", "pull"];
      const keyword_list = [keyword_q1, keyword_q2, keyword_q3]
      //console.log(this.props.keywordsMissed)
        return (
          <Carousel style={{width: 650, marginTop: 5, borderRadius: 50}}>

            <div style={{borderRadius: 20, height: 250, backgroundColor: 'white'}}>
              <h2 style={{paddingTop: 40, marginTop: 20, marginLeft: 20}}>{this.state.questions[0]}</h2>
              <div style={{display: 'flex', marginTop: -30, flexDirection: 'row', marginLeft: 100, marginRight: 100}}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'row'}}>
                      <h2>{this.renderEmotion("CONFUSED")}</h2>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'row'}}>
                    <h2>{this.renderConfidence(0.3)}</h2>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
                  {/*
                  <h2>{this.renderCorrectPercent(1 - this.calculateScore(keyword_q1, this.props.keywordsMissed[0]))}</h2>
                  <h2>{this.renderIncorrectPercent(this.calculateScore(keyword_q1, this.props.keywordsMissed[0]))}</h2> */}
                  <h2>{this.renderCorrectPercent(0.75, "BST")}</h2>
                  <h2>{this.renderIncorrectPercent(0.25, "'leaf'")}</h2>

                </div>
              </div>
            </div>

            <div style={{borderRadius: 20, height: 250, backgroundColor: 'white'}}>
              <h2 style={{paddingTop: 40, marginTop: 20, marginLeft: 20}}>{this.state.questions[1]}</h2>
              <div style={{display: 'flex', marginTop: -30, flexDirection: 'row', marginLeft: 100, marginRight: 100}}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'row'}}>
                      <h2>{this.renderEmotion("CALM")}</h2>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'row'}}>
                    <h2>{this.renderConfidence(0.65)}</h2>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <h2>{this.renderCorrectPercent(0.85, "Commit")}</h2>
                  <h2>{this.renderIncorrectPercent(0.15, "'branch'")}</h2>
                </div>
              </div>
            </div>

            <div style={{borderRadius: 20, height: 250, backgroundColor: 'white'}}>
              <h2 style={{paddingTop: 40, marginTop: 20, marginLeft: 20}}>{this.state.questions[2]}</h2>
              <div style={{display: 'flex', marginTop: -30, flexDirection: 'row', marginLeft: 100, marginRight: 100}}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'row'}}>
                      <h2>{this.renderEmotion("HAPPY")}</h2>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'row'}}>
                    <h2>{this.renderConfidence(0.9)}</h2>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <h2>{this.renderCorrectPercent(0.75, "local")}</h2>
                  <h2>{this.renderIncorrectPercent(0.25, "'remote'")}</h2>
                </div>
              </div>
            </div>

        </Carousel>
        );
    }
};


export default Slides;
