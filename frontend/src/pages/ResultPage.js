import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Axios from "axios";
import { Link } from "react-router-dom";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSurprise, faSmile, faSadTear, faAngry, faGrinBeam, faGrinBeamSweat, faFrownOpen, faMeh, faTired } from '@fortawesome/free-regular-svg-icons'
import { faBatteryFull, faBatteryHalf, faBatteryQuarter} from '@fortawesome/free-solid-svg-icons'

import MoodBadIcon from "@material-ui/icons/MoodBad";

import SimpleCard from '../components/SimpleCard';
import Slides from '../components/Slides';

//import { textAlign } from "@material-ui/system";
import styles from "./ResultPage.module.css";
class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this); // i think you are missing this
    this.state = {
      keywords: {},
      confidence: 0,
      accuracy: 0,
      loading: true,
      sessionID: null,
      faces: [],
      keywordsMissed: [], 

    };
  }
  goBack() {
    this.props.history.goBack();
  }
  state = {
    redirect: false
  };
  componentDidMount() {
    if(this.props.location.done){
      this.setState({
        loading: false
      })
    }
    this.getData();
  }
  //Axios call to retrieve user results
  async getData() {
    console.log(this.props.location.session)
    if(!this.props.location.session){
      return;
    }

    const obj = {
      //"session_id": this.props.location.session, 
      "session_id": 2,
    }

    var response = Axios.post(`http://83147b49.ngrok.io/getresponse/`, obj)
            .then(res => {
                console.log(res);
                console.log(res.data);
                var arrs = res.data
                console.log(arrs);
                arrs.map((keyword, index) => {
                  this.setState((prevState, props) => {
                      this.state.faces = prevState.faces.concat(arrs[index].face_emotion)
                      this.state.keywordsMissed = prevState.keywordsMissed.concat(arrs[index].keywords_missed)
                  })
                })
                console.log(this.state)
                //const collection = await response.data;
                //const keywords = collection.address;
                //const confidence = collection.id;
                //const accuracy = collection.id;
                //this.setState({ keywords, confidence, accuracy, loading: false });
            })
            .catch(err => {
                console.log(err)
            })
  }
  //List the keywords that are in the state object "Keywords"
  printKeywords() {
    return Object.keys(this.state.keywords).map((keyword, index) => (
      <li key={index} style={{ display: "inline", margin: "0 2vw" }}>
        {keyword}
      </li>
    ));
  }
  //Print a smiley or frowny face depending on accuracy and confidence
  getReaction = percentage => {
    if (percentage < 60)
      return (
        <MoodBadIcon
          className={styles.emoticonStyle}
          style={{
            color: "orange"
          }}
        />
      );
    else
      return (
        <InsertEmoticonIcon
          className={styles.className}
          style={{
            color: "LightGreen"
          }}
        />
      );
  };

  renderConfidence(val){
      const confStyle = {
          flex: 1,
          marginLeft: 50,
          width: 150,
          height: 150,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30
      }
      if(val > 0.85){
        return (
            <div style={confStyle}>
                <FontAwesomeIcon style={{color: '#42f590', width: 150, height: 150,}} icon={faBatteryFull} />
                <h2 style={{color: '#42f590'}}>{Math.round(val*100)}% Confident</h2>
            </div> )
      } else if (val > 0.45) {
        return (
            <div style={confStyle}>
                <FontAwesomeIcon style={{color: '#f5bc42', width: 150, height: 150,}} icon={faBatteryHalf} />
                <h2 style={{color: '#f5bc42'}}>{Math.round(val*100)}% Confident</h2>
            </div> )
      } else {
        return (
            <div style={confStyle}>
                <FontAwesomeIcon style={{color: '#f54e42', width: 150, height: 150,}} icon={faBatteryQuarter} />
                <h2 style={{color: '#f54e42'}}>{Math.round(val*100)}% Confident</h2>
            </div> )
      }
  }

  renderEmotion(string){
      //HAPPY | SAD | ANGRY | CONFUSED | DISGUSTED | SURPRISED | CALM | UNKNOWN | FEAR
      const faceStyle = {
            flex: 1,
            width: 150,
            height: 150,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30
        }
      switch(string) {
        case "HAPPY":
          // code block
          return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 150, height: 150,}} icon={faGrinBeam} />
                <h2 style={{color: 'white'}}>{string}</h2>
            </div> )
          break;
        case "SAD":
          // code block
          return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 150, height: 150,}} icon={faSadTear} />
                <h2 style={{color: 'white'}}>{string}</h2>
            </div> )
          break;
        case "ANGRY":
            return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 150, height: 150,}} icon={faAngry} />
                <h2 style={{color: 'white'}}>{string}</h2>
            </div> )
            break;
        case "CONFUSED":
          // code block
          return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 150, height: 150,}} icon={faGrinBeamSweat} />
                <h2 style={{color: 'white'}}>{string}</h2>
            </div> )
          break;
        case "DISGUSTED":
          // code block
          return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 150, height: 150,}} icon={faFrownOpen} />
                <h2 style={{color: 'white'}}>{string}</h2>
            </div> )
          break;
        case "SURPRISED":
        // code block
            return (
                <div style={faceStyle}>
                    <FontAwesomeIcon style={{color: '', width: 150, height: 150,}} icon={faSurprise} />
                    <h2 style={{color: 'white'}}>{string}</h2>
                </div> )
          break;
        case "CALM":
        // code block
        return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 150, height: 150,}} icon={faSmile} />
                <h2 style={{color: 'white'}}>{string}</h2>
            </div> )
          break;
        case "FEAR":
        // code block
         return (
            <div style={faceStyle}>
                <FontAwesomeIcon style={{color: '', width: 150, height: 150,}} icon={faTired} />
                <h2 style={{color: 'white'}}>{string}</h2>
            </div> )
          break;
        default:
            return (
                <div style={faceStyle}>
                    <FontAwesomeIcon style={{color: '', width: 150, height: 150,}} icon={faMeh} />
                    <h2 style={{color: 'white'}}>UNKNOWN</h2>
                </div> )
          // code block
      }

  }

  //Display a loading bar if axios is not finished, otherwise display results
  printBody() {
    if (this.state.loading) {
      return (
        <React.Fragment>
          <CircularProgress color="white" size={400} className={styles.buttonStyle} />;
          <div id="loading-text" className={styles.loadingStyle}>
            <h4>
              This may take a while. You can find your results when they're
              available on the dashboard.
            </h4>
            <Link to="/" style={{ textDecoration: "underline" }}>
              Return to the homepage
            </Link>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h3 style={{ flex: 1, color: "white", marginTop: 35 }}>
            Keywords You Should Use:
          </h3>
          <ul
            style={{ listStyle: "none", fontStyle: "italic", color: "white" }}
          >
            {this.printKeywords()}
          </ul>
          <section
            style={{
              clear: "both",
              display: "flex",
              margin: "5vl",
              textAlign: "center"
            }}
          >
            <article className={styles.articleStyle}>
              <h3 className={styles.headingStyle}>
                Confidence: {this.state.confidence} %
              </h3>
              <div>{this.getReaction(this.state.confidence)}</div>
            </article>
            <article className={styles.articleStyle}>
              <h3 className={styles.headingStyle}>
                Accuracy: {this.state.accuracy} %
              </h3>
              <div>{this.getReaction(this.state.confidence)}</div>
            </article>
          </section>
        </React.Fragment>
      );
    }
  }
  //Display headings and body
  render() {
    if(!this.state.loading){
      return (
        <div className={styles.container} style={{}}>
          <h1 style={{ marginTop: 20, color: 'white', fontSize: 120 }}>Stutter.</h1>
          <Link to="/" style={{ textDecoration: "underline" }}>
              Return to the homepage
          </Link>
          <h1 style={{ flex: 1, color: "white", fontSize: 40, marginTop: 5, marginBottom: 20 }}>
            Your Result:
          </h1>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
              <SimpleCard icon="UNKNOWN" description=""/>
              <SimpleCard conf={0.65} description=""/>
              <SimpleCard corrPerc={0.68} description=""/>
              <SimpleCard inCorrPerc={0.32} description=""/>
          </div>
          {/*this.printBody()*/}
          <Slides faces={this.state.faces} keywordsMissed={this.state.keywordsMissed}/>
        </div>
      );
    } else {
      return (
      <React.Fragment>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
          <div id="loading-text" className={styles.loadingStyle}>
            <h2>
              This may take a while. You can find your results when they're
              available on the dashboard.
            </h2>
            <Link to="/" style={{ textDecoration: "underline" }}>
              Return to the homepage
            </Link>
          </div>
          <div style={{ marginTop: 100}}>
            <CircularProgress size={300} className={styles.buttonStyle} />;
          </div>
          </div>
        </React.Fragment>
      )
    }
  }
}
export default ResultPage;