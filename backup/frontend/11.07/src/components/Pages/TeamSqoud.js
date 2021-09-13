
import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router";
import FilterableTable from 'react-filterable-table';
import ShowSpecificPlayer from './ShowSpecificPlayer'
import {
  DataGrid,
} from "@material-ui/data-grid";
import axios from 'axios'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import { Button } from '@material-ui/core';
import { getPlayers } from '../until/httpService'
import Spiiner from '../layout/Spinner';


class _TeamSqoud extends Component {
  constructor(props) {
    super(props)
    const user = JSON.parse(sessionStorage.getItem("loginUser"))
    if (!user) {
      this.props.history.push('/')
    }
    const teamId = user ? user.teamid : " "
    this.state = {
      teamID: teamId,
      playersBeforeSort: [],
      players: [],
      showPlayerDialog: false,
      selecetGamesID: null,
      loading: true
    }
    this.setID = this.setID.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    // this.progressPlayer = this.progressPlayer.bind(this)
  }

  async componentDidMount() {
    const { teamID } = this.state
    const tempPlayer = [];
    const map = new Map();
    getPlayers(teamID).then((result) => {
      if (result) {
        for (const item of result.data) {
          if (!map.has(`${item.firstName}+${item.lastName}`)) {
            map.set(`${item.firstName}+${item.lastName}`, true);    // set any value to Map
            item.allGame = [item.gameId]
            item.numGame = item.allGame.length
            tempPlayer.push(item);

          }
          else {
            var playerIndex = tempPlayer.findIndex(x => x.firstName === item.firstName && x.lastName === item.lastName)
            tempPlayer[playerIndex].goals += item.goals
            tempPlayer[playerIndex].allGame.push(item.gameId)
            tempPlayer[playerIndex].numGame = tempPlayer[playerIndex].allGame.length

          }
        }
        this.setState({ players: tempPlayer, loading: false, playersBeforeSort: result.data })
      }
    }).catch((err) => {
      console.log(err)
    })
  }



  handleClickOpen() {
    this.setState({ showPlayerDialog: true })
  };

  handleClose() {
    this.setState({ showPlayerDialog: false })

  };


  setID(players) {
    players.forEach(player => (
      player.id = player._id
    ))
  }


  render() {
    const { players, selecetGamesID, loading } = this.state
    this.setID(players)

    const columns = [
      { field: 'firstName', headerName: 'First Name', width: 150 },
      { field: 'lastName', headerName: 'Last Name', width: 200 },
      { field: 'numGame', headerName: 'Games', width: 150 },
      { field: 'position', headerName: 'Position', width: 180 },
      { field: 'goals', headerName: 'Goals', width: 130 },
      {
        field: 'action', headerName: 'Show Game', width: 150, renderCell: (params) => (

          <VisibilityIcon
            variant="contained"
            color='secondary'
            size="small"
            style={{ marginLeft: 30 }}
            onClick={() => {
              var gameId = params.row.allGame
              this.setState({ selecetGamesID: gameId })
              this.setState({ showPlayerDialog: true })

            }}
          >


          </VisibilityIcon>
        )
      },
    ]
    if (loading)
      return <Spiiner />;
    return (
      <Fragment>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid id={Math.random()} rows={players} columns={columns}
          />
        </div>
        <Dialog
          fullScreen
          open={this.state.showPlayerDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Game iinfo"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <ShowSpecificPlayer games={selecetGamesID} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>

          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}
export const TeamSqoud = withRouter(_TeamSqoud)
