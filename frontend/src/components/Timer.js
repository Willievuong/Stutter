import React, { Component, Fragment } from 'react';
import Display from "seven-segment-display";
import VideoRecorder from "react-video-recorder"
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { Player } from 'video-react';

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            count: 60,
            recording: false,
            timer: false,
            readQuestion: false,
            blobURL: ''
        };

        this.startTime = this.startTime.bind(this);
        this.finishRecord = this.finishRecord.bind(this);
        this.doneRecord = this.doneRecord.bind(this);
        this.printerr = this.printerr.bind(this);
    }

    renderVideo(){
        if(this.state.blobURL){
            return (
                <Player
                    inline
                    src={this.state.blobURL}/>
            )
        } else {
            return(
                null
            )
        }
    }

    printerr(err){
        console.log(err)
    }

    async handleBlob(blob){
        let url = URL.createObjectURL(blob);
        console.log(url)
        this.setState({ blobURL: url })
        const constraints = { audio: true, video: true }
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log(stream)
        } catch (e) {
            console.error('navigator.getUserMedia error:', e);
        }
    }

    doneRecord(blob){
        console.log("I'm done")
        //console.log(blob)
        //console.log(navigator.mediaDevices)
        this.handleBlob(blob)
    }

    finishRecord(){
        this.setState({ recording: false, done: true })
    }

    startTime(){

        this.setState({ 
            recording: true
        })

        setInterval(() => {
            if(this.state.count > 0 && this.state.recording){
                this.setState((state, props) => ({
                    count: state.count - 1,
                }));
            } else {
                this.setState((state, props) => ({
                    count: 60,
                    recording: false
                }));
            }
        }, 1000);
    }


    render() {
      return (
        <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
            <h1 style={{ color: 'white', fontSize: 90 }}>Stutter</h1>
                <div style={{width: "100px", marginTop: 15}}>
                    <Display value={this.state.count} color="red" digitCount={2} />
                </div>
                <div style={{
                    height: "400px", 
                    width: "600px",
                    border: '10px solid white',
                    borderRadius: 10,
                    marginTop: 15
                    }}>
                    
                    <VideoRecorder 
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
                    
                    {/* <Video /> */}
                </div> 
            <h1 style={{ color: 'white', marginTop: 15 }}>Question: What is a BST?</h1>
            {/* this.renderVideo() */}
        </div>
      );
    }
  }
  export default Timer;
  
