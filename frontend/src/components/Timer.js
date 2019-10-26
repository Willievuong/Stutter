import React, { Component, Fragment } from 'react';
import Display from "seven-segment-display";
import VideoRecorder from "react-video-recorder"
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            count: 5,
            recording: false,
            done: false,
            timer: false,
            readQuestion: false,
            doneReading: false,
        };
        this.startTime = this.startTime.bind(this);
        this.finishRecord = this.finishRecord.bind(this);
    }


    componentDidMount(){
        this.readingTime()
    }


    
    readingTime(){
        this.setState({ 
            timer: true 
        })
        if(!this.state.readQuestion){
            console.log("Reading time update")
            setInterval(() => {
                this.setState({ count: this.state.count - 1 });
            }, 1000);
        }

        if(this.state.count == 0){
            console.log("Done reading")
            this.setState({
                readQuestion: true,
                count: 60,
            })
        }
    }

    doneRecord(){
        console.log("Recording done")
    }

    finishRecord(){
        this.setState({ recording: false, done: true })
        return(<Link to='/result' />)
    }

    startTime(){
        this.setState({ 
            recording: true
        })
        if(this.state.recording){
            setInterval(() => {
                this.setState({ count: this.state.count - 1 });
            }, 1000);
        }
    }
    
    render() {
      return (
        <Fragment>
            <h1>Timer</h1>
                <div style={{width: "200px"}}>
                    <Display value={this.state.count} color="blue" digitCount={4} />
                </div>
                <div style={{height: "500px", width: "700px"}}>
                    {!this.state.done && this.state.doneReading? 
                    (
                    <VideoRecorder 
                        videoWidth={700} 
                        countdownTime={0}
                        isOnInitially={false}
                        timeLimit={60000}
                        onStartRecording={this.startTime}
                        onStopRecording	={this.finishRecord}
                        onRecordingComplete={this.doneRecord}/>
                    ) : (
                        this.state.doneReading ? 
                        (
                        <div>
                            <h1>You have completed this question!</h1>
                            <Link to='/result'>
                                <Button variant="outlined">
                                    Next
                                </Button>
                            </Link>
                        </div>
                        ) : (
                            <h1>Read the question carefully</h1>
                        ) 
                    )}
                </div>
            <h1>Question</h1>
        </Fragment>
      );
    }
  }
  export default Timer;
  
