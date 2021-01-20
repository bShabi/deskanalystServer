import React, { Fragment, useState } from 'react';
import { withRouter } from "react-router";
import { Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../css/CreateMatch.css";
import FileReader from './FileReader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
import Stepper from 'react-stepper-horizontal'


class _CreateMatch extends React.Component {
  constructor(props) {
    super(props)
    // const user = JSON.parse(sessionStorage.getItem("loginUser"))
    // const teamName = user ? user.teamName : null;

    this.state = {
      teamid: null,
      myTeamName: "",
      opponentTeam: "null",
      gameDate: null,
      myTeamHalfScore: 2,
      anotherHalfScore: 2,
      myTeamFinalScore: 2,
      anotherFinalScore: 2,
      shotOnTargetHalfOne: 2,
      shotOnTargetHalfTwo: 2,
      shotOFFTargetHalfOne: 2,
      shotOFFTargetHalfTwo: 2,
      corrnerHalfOne: 2,
      corrnerHalfTwo: 2,
      offsidesHalfOne: 2,
      offsidesHalfTwo: 2,
      tackelsHalfOne: 2,
      tackelsHalfTwo: 2,
      stealHalfOne: 2,
      stealHalfTwo: 2,
      lostPossessionHalfOne: 2,
      lostPossessionHalfTwo: 2,
      validData: false,
      dialogMsg: false

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.insertDeitals = this.insertDeitals.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this)

  }

  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem("loginUser"))
    if (!user) {
      this.props.history.push('/')
    } else {
      this.setState({ myTeamName: user.teamName, teamid: user.teamid })
      console.log(this.state.myTeamName)
    }
    toast.configure()

    var date = moment().format('MM/DD/yyyy')
    // const newDate = Date.parse(new Date(Date.now()).toLocaleString());
    console.log(date)
    this.setState({ gameDate: date })
  }

  insertDeitals(name, value) {
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    var gameData = this.state;
    var arrData = []
    Object.entries(gameData).map(([key, value]) => {
      arrData.push(value)
    })
    console.log(this.state)
    let isValidData = true;
    for (let value of Object.values(arrData)) {
      if (value == null || String(value).length === 0) {
        isValidData = false;
        toast.error("Please inert a value ")
        return
      }
    }
    if (isValidData)
      this.handleClickOpen()

  }
  handleClickOpen() {
    this.setState({ dialogMsg: true })
  };

  handleClose() {
    this.setState({ dialogMsg: false })

  };

  render() {
    const matchDictionary = {
      "Shot ON Target": ["shotOnTargetHalfOne", "shotOnTargetHalfTwo"],
      "Shot OFF Target": ["shotOFFTargetHalfOne", "shotOFFTargetHalfTwo"],
      "Corrner": ["corrnerHalfOne", "corrnerHalfTwo"],
      "Offside": ["offsidesHalfOne", "offsidesHalfTwo"],
      "Tackels": ["tackelsHalfOne", "tackelsHalfTwo"],
      "Steal": ["stealHalfOne", "stealHalfTwo"],
      "Lost Possession": ["lostPossessionHalfOne", "lostPossessionHalfTwo"]
    }

    return (
      <Fragment>
        <div>
          <Stepper steps={[{ title: 'Insert deitals form Game' }, { title: 'Upload csv File' }, { title: 'Insert player deitals ' }]} activeStep={0} />

        </div>

        <h1>Create Match
       <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={new Date(this.state.gameDate)}
            onChange={date => {
              console.log(moment(date).format('MM/DD/yyyy'))
              this.setState({ gameDate: moment(date).format('MM/DD/yyyy') })
            }}
          />
        </h1>
        <label >
          {/* Game information */}
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th></th>
                <th> {this.state.myTeamName}</th>
                <th> VS </th>
                <th> <input type="text" name="opponentTeam" size="8" placeholder="Example:Macbi tel aviv" onChange={(e) => this.insertDeitals(e.target.name, e.target.value)}></input> </th>
              </tr>
            </thead>


            <tbody>
              <tr>
                <td></td>
                <td> <input type="number" defaultValue={0} name="myTeamHalfScore" min="0" max="10" onChange={(e) => this.insertDeitals(e.target.name, e.target.value)}></input></td>
                <td>Half Score</td>
                <td> <input type="number" defaultValue={0} name="anotherHalfScore" min="0" max="10" onChange={(e) => this.insertDeitals(e.target.name, e.target.value)}></input> </td>
              </tr>
              <tr>
                <td></td>
                <td> <input type="number" defaultValue={0} name="myTeamFinalScore" min="0" max="10" onChange={(e) => this.insertDeitals(e.target.name, e.target.value)}></input> </td>
                <td>Final Score</td>
                <td> <input type="number" defaultValue={0} name="anotherFinalScore" min="0" max="10" onChange={(e) => this.insertDeitals(e.target.name, e.target.value)} ></input> </td>
              </tr>
            </tbody>
          </table>

          {/* Static Game */}
          <table style={{ width: '100%' }} >

            <thead>
              <tr>
                <th></th>
                <th>Half 1</th>
                <th></th>
                <th>Half 2</th>
              </tr>

            </thead>

            <tbody>
              {Object.entries(matchDictionary)
                .map(([key, value]) =>
                (
                  <tr key={key}>
                    <td></td>
                    <td><input type="number" defaultValue={0} name={value[0]} min="0" max="30" onChange={(e) => this.insertDeitals(e.target.name, e.target.value)}></input></td>
                    <td>{key}</td>
                    <td><input type="number" defaultValue={0} name={value[1]} min="0" max="30" onChange={(e) => this.insertDeitals(e.target.name, e.target.value)}></input></td>
                  </tr>
                ))}
            </tbody>

          </table>
          <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>

        </label>
        <Dialog
          open={this.state.dialogMsg}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Upload CSV From Game"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FileReader gameInformation={this.state} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>

          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
};
export const CreateMatch = withRouter(_CreateMatch);
