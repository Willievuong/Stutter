import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Axios from "axios";
import DoneIcon from "@material-ui/icons/Done";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { Container } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(2),
    background: "linear-gradient(to right bottom, #FFFFFF, #EDEDED)"
  }
}));
function getLoadingIcon(completed) {
  if (completed) {
    return <DoneIcon className={styles.iconGreenStyle} />;
  } else {
    return <ScheduleIcon className={styles.iconOrangeStyle} />;
  }
}
function getPercentageScore(score) {
  const percentageScore = score.toFixed(2) * 100;
  let percentageStyle = {};
  if (percentageScore > 59) percentageStyle = { color: "Green" };
  else if (percentageScore > 24) percentageStyle = { color: "Orange" };
  else percentageStyle = { color: "Red" };
  return (
    <Typography variant="h5" component="h3" style={percentageStyle}>
      {" "}
      {percentageScore}% Correct
    </Typography>
  );
}
function Session(props) {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <Link to="/result" className={styles.linkStyle}>
          <div className={styles.containerStyle}>
            <Typography
              variant="h3"
              component="h1"
              className={styles.textStyle}
            >
              Session {props.id}
            </Typography>
            <div>
              <Typography component="p">
                {props.status
                  ? `Finished Processing at ${props.time} PDT`
                  : "Results Processing"}
              </Typography>
              {getPercentageScore(props.score)}
            </div>
            {getLoadingIcon(props.status)}
          </div>
        </Link>
      </Paper>
    </div>
  );
}
class Dashboard extends Component {
  state = {
    array: [0, 1, 2],
    collection: {},
    ids: [],
    titles: [],
    userIds: [],
    loaded: false,
    keywords_correct: ["a", "b", "c", "d"],
    keywords_used: ["b", "c", "d"],
    time: ""
  };
  componentDidMount() {
    setTimeout(() => this.getData(), 1000);
  }
  async getData() {
    const response = await Axios.get("http://83147b49.ngrok.io/session/");
    //const response = await Axios.get(
    //"https://jsonplaceholder.typicode.com/users/1/albums"
    //);
    const collection = await response.data;
    console.log(collection);
    const ids = collection.map(obj => obj.id);
    const titles = collection.map(obj => obj.title);
    const userIds = collection.map(obj => obj.user_id);
    console.log(titles);
    const d = new Date();
    const time =
      d.getHours() +
      ":" +
      (d.getMinutes().toString().length > 1
        ? d.getMinutes()
        : "0" + d.getMinutes()) +
      ":" +
      (d.getSeconds().toString().length > 1
        ? d.getSeconds()
        : "0" + d.getSeconds());
    this.setState({ collection, ids, titles, userIds, time, loaded: true });
  }
  oldcalculateScore = (used, correct) => {
    return used.length / (correct.length + used.length);
  };
  calculateScore() {
    const common = this.state.keywords_correct.filter(value =>
      this.state.keywords_used.includes(value)
    );
    let score = common.length / this.state.keywords_correct.length;
    return score;
  }
  makeIdArrays() {
    Object.keys(this.state.collection).map(obj => console.log(obj));
  }
  render() {
    const keywords_correct = ["a", "b", "c", "d"];
    const keywords_used = ["b", "c", "d"];
    return (
      <React.Fragment>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "white", fontSize: 90 }}>Stutter</h1>
          <h1
            style={{
              flex: 1,
              color: "white",
              display: "inline-block",
              fontSize: 40,
              marginTop: 35
            }}
          >
            Dashboard
          </h1>
        </div>
        {Object.keys(this.state.collection).map((id, index) => (
          <Session
            key={index}
            id={this.state.titles[index] + this.state.ids[index]}
            status={this.state.loaded}
            time={this.state.time}
            score={this.calculateScore()}
          />
        ))}{" "}
      </React.Fragment>
    );
  }
}
export default Dashboard;