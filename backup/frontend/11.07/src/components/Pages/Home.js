
import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router";
import GameReport from '../Reports/GamesReports'
import { getGamesByTeamId } from '../until/httpService'

class _Home extends Component {

  constructor(props) {
    super(props)
    const user = JSON.parse(sessionStorage.getItem("loginUser"))
    const teamId = user ? user.teamid : null;
    if (!user) {
      this.props.history.push('/')
    }
    this.state = {
      user: user ? user : null,
      teamID: teamId,
      winLoseDict: [],
      sprints: [],
      distance: []
    }
    // this.getReportWinLose = this.getReportWinLose.bind(this)
  }
  componentDidCatch() {

  }
  componentDidMount() {
    console.log(this.props)
    // const { teamID } = this.state
    // // getGamesByTeamId(teamID).then((result) => {
    // //   this.getReport(result.data)

    // // })


  }
  doMakeReport(games) {
    const { winLoseDict, sprints, distance } = this.state
    if (!games)
      return
    var statusGames = 0
    console.log(games)
    games.sort(function (a, b) {
      return new Date(a.gameDate) - new Date(b.gameDate)
    })
    games.forEach(game => {
      if (game.myTeamFinalScore > game.anotherFinalScore)
        statusGames++
      else if (game.myTeamFinalScore < game.anotherFinalScore)
        statusGames--

      console.log(game.gameStats.sprints)
      distance.push({ x: new Date(game.gameDate), y: game.gameStats.distance })
      winLoseDict.push({ x: new Date(game.gameDate), y: statusGames })
      sprints.push({ x: new Date(game.gameDate), y: game.gameStats.sprints })
    });

    this.setState(prevState => ({
      ...prevState,
      winLoseDict, sprints, distance
    }))
  }

  render() {
    const { user, sprints, winLoseDict, distance } = this.state
    return (
      <Fragment>


        <div class="container">
          <section>
            <div class="row ">
              <div class="col-6">
                <GameReport title={'Win/Lose Progress'} data={winLoseDict} />
              </div>
              <div class="col-6">
                <GameReport title={"Sprints"} data={sprints} />
              </div>
            </div>
          </section>
          <section style={{ padding: "70px" }}>
            <div class="row ">
              <div className="col-6">
                <GameReport title={"Distance"} data={distance} />

              </div>
            </div>
          </section>
        </div>
      </Fragment>
    )
  }
}

export const Home = withRouter(_Home)
