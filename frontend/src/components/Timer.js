import React, { Component } from 'react';
import Display from "seven-segment-display";
import VideoRecorder from "react-video-recorder"
import {
    buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import MediaCapturer from 'react-multimedia-capture';


const MAX_TIME = 60;

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            count: MAX_TIME,
            recording: false,
            cameraOn: false,
            timer: false,
            reading: this.props.reading,
            blobURL: '',
            done: false,
            base64: ""
        };
        this.goBack = this.goBack.bind(this); // i think you are missing this
        this.startTime = this.startTime.bind(this);
        this.finishRecord = this.finishRecord.bind(this);
        this.doneRecord = this.doneRecord.bind(this);
        this.printerr = this.printerr.bind(this);
        this.handleVideoSending = this.handleVideoSending.bind(this)
        this.handleBlob = this.handleBlob.bind(this)
    }

    
    goBack(){
        this.props.history.goBack();
    }

    printerr(err){
        console.log(err)
    }

    blobToFile(theBlob, fileName){
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }
    
    convertBlobToBase64(blob){
        return new Promise((resolve, reject) => {
            const reader = new FileReader;
            reader.onerror = reject;
            reader.onload = () => {
            resolve(reader.result);
        };
            reader.readAsDataURL(blob);
        });
    }

    blobToFile(theBlob, fileName){
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }


    async handleBlob(blob){
        if(blob == null){
            return;
        }

        this.handleVideoSending(blob)
        console.log(blob)
        /*
        await this.convertBlobToBase64(blob)
        .then((b64) => {
            this.handleVideoSending(b64)
        });
        */
        
    }

    async handleVideoSending(blob){
        /*
        const obj = {
            title: this.props.title + this.props.index + 'B' + this.props.sessionID,
            sessionID: this.props.sessionID,
            video: b64
        };
        */

        var oReq = new XMLHttpRequest();
        oReq.open('POST', 'http://83147b49.ngrok.io/saveresponse/'+ this.props.title + (this.props.index+1) + 'B' + this.props.sessionID +'/', true)
        oReq.setRequestHeader('title', this.props.title + (this.props.index+1) + 'B' + this.props.sessionID)
        oReq.setRequestHeader('sessionID', this.props.sessionID)
        oReq.setRequestHeader('questionID', this.props.index + 1)
        oReq.onload = function(oEvent){
            console.log("Done Posting")
        }
        oReq.send(blob)      
        
      }

    componentDidMount(){
        if(this.state.reading){
            var refreshId = setInterval(() => {
                if(this.state.count > 0 && this.state.reading){
                    this.setState((state, props) => ({
                        count: state.count - 1,
                    }));
                } else {
                    this.setState({
                        count: MAX_TIME,  
                        reading: false,
                        recording: true,
                    });
                    clearInterval(refreshId);
                }
            }, 1000);
        }
    }


    doneRecord(blob){
        //console.log(blob)
        //console.log(navigator.mediaDevices)
        this.handleBlob(blob)
    }

    finishRecord(){
        this.setState({ 
            count: 0,
            recording: false, 
            done: true 
        })
        this.props.handler(this.props.index+1)
    }

    startTime(){

        this.setState({ 
            recording: true,
            cameraOn: true,
            count: MAX_TIME
        })

        var interval = setInterval(() => {
            if(this.state.count > 0 && this.state.recording){
                this.setState((state, props) => ({
                    count: state.count - 1,
                }));
            } else {
                this.setState((state, props) => ({
                    count: MAX_TIME,
                    recording: false,
                    done: true
                }));
                clearInterval(interval);
                this.props.handler(this.props.index+1)
            }
        }, 1000);
    }

    render() {
      return (
        <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: "200px", marginTop: 15}}>
                        <Display value={this.state.count} color="red" digitCount={2} />
                    </div>
                    <h1 style={{ marginTop: 20, marginLeft: 120, color: 'white', fontSize: 120 }}>Stutter</h1>
                    <div style={{width: "200px", marginLeft: 120, marginTop: 5}}>
                        {/*<CircularProgressbar
                            value={66}
                            text={`${66}%`}
                            strokeWidth={15}
                            styles={buildStyles({
                                strokeLinecap: "butt",
                                textSize: '20px',
                                textColor: '#23D293',
                                pathColor: '#23D293'
                            })}
                        />*/}
                        <CircularProgressbarWithChildren 
                            value={Math.round(this.props.index / 3.0 * 100.0)}
                            strokeWidth={18}
                            styles={buildStyles({
                                strokeLinecap: "butt",
                                textSize: '20px',
                                textColor: '#23D293',
                                pathColor: 'red',
                                trailColor: 'white',
                            })}>
                            <div style={{ color: 'white', fontSize: 40, marginTop: -5 }}>
                                <strong>{Math.round(this.props.index / 3 * 100.0)}%</strong>
                            </div>
                        </CircularProgressbarWithChildren>;
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    {
                    this.state.reading ? (
                        <div style={{ flex: 1}}>
                            <h1 style={{ color: 'white', marginTop: 15 }}>Question: {this.props.question} </h1>
                            <div style={{ flex: 5, marginTop: '20%'}}>
                                <h1 style={{ color: 'white'}}>Read the question carefully!</h1>
                                <h1 style={{ color: 'white'}}>After a minute, the question will disappear!</h1>
                            </div>
                        </div>
                    ) : (
                            <div style={{
                                flex: 5,
                                height: "420px", 
                                width: "700px",
                                border: '10px solid white',
                                borderRadius: 10,
                                marginTop: 5
                                }}>
                                <VideoRecorder 
                                    mimeType="video/webm;codecs=H264"
                                    //mimeType="video/mp4"
                                    dataAvailableTimeout={null}
                                    videoWidth={600} 
                                    countdownTime={0}
                                    timeLimit={60000}
                                    useVideoInput={false}
                                    isOnInitially={true}
                                    isReplayingVideo={false}
                                    onStartRecording={this.startTime}
                                    onStopRecording={this.finishRecord}
                                    onRecordingComplete={this.doneRecord}
                                    onError={this.printerr}
                                    
                                /> 
                            </div> 
                        )}
                        {/* <Video /> */}
                </div>
            {/* this.renderVideo() */}
        </div>
      );
    }
  }
  export default Timer;
  
