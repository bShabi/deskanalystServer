import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router'
import '../css/ShowPlayers.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import Stepper from 'react-stepper-horizontal'



class ShowPlayers extends Component {


  constructor(props) {
    super(props)
    if (!this.props.location.state)
      return
    console.log(this.props.location.state.gameInfo)
    this.state = {
      players: this.props.location.state.playersInGame,
      game: this.props.location.state.gameInfo,
      positions: ["DC", "RD", "LD", "DMC", "MC", "RM", "LM", "AMC", "ST", "RW", "LW"],
      avgStats: {
        distance: 0,
        sprints: 0,
        progressive_Sprints: 0,
        top_Speed: 0
      },
      maxScore: 0
    }
    this.setGoals = this.setGoals.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.insertGameDataToDB = this.insertGameDataToDB.bind(this);
    this.insertPlayersDataToDB = this.insertPlayersDataToDB.bind(this)
    this.calcStats = this.calcStats.bind(this)
    this.replaceKeys = this.replaceKeys.bind(this)
    this.savePlayer = this.savePlayer.bind(this)

    this.calcStats(this.state.players)
  }
  componentDidMount() {
    toast.configure()
    const playersInGame = this.state.players
    playersInGame.forEach(elm => {
      elm.position = "mc"
      elm.goals = 0
    });

    this.setState({ players: playersInGame })
    this.calcStats(playersInGame)
  }

  calcStats(playersInGame) {
    const avgStats = { ...this.state.avgStats }
    avgStats.distance = (playersInGame.reduce(function (acc, obj) { return acc + parseFloat(obj["Distance (km)"]) }, 0)).toFixed(2) / playersInGame.length;

    avgStats.sprints = (playersInGame.reduce(function (acc, obj) { return acc + parseFloat(obj["Sprints"]); }, 0)) / playersInGame.length;

    avgStats.progressive_Sprints = (playersInGame.reduce(function (acc, obj) { return acc + parseFloat(obj["Progressive Sprints"]); }, 0)) / playersInGame.length;

    avgStats.top_Speed = (playersInGame.reduce(function (acc, obj) { return acc + parseFloat(obj["Top Speed (km/h)"]); }, 0)) / playersInGame.length;


    this.setState(prevState => ({
      ...prevState,
      avgStats
    }), () => console.log(this.state.avgStats))
  }
  setGoals(player, numOfGoals) {
    var { players } = this.state

    player.goals = parseInt(numOfGoals)

    console.log(this.state.players)
    var summary = players.reduce(function (acc, obj) { return acc + parseInt(obj.goals); }, 0);
    console.log(summary)
    this.setState({ maxScore: summary })

  }
  handleSubmit(e) {
    var { players, game, maxScore } = this.state
    var isValid = true
    players.forEach(elm => {
      if (elm["position"] === null && isValid) {
        console.log("insert value position", elm)
        isValid = false;
        return
      }
    })
    if (!(maxScore - parseInt(game.myTeamFinalScore) === 0)) {
      toast.warning("Set goal in  match")
      isValid = !isValid
    }
    if (isValid)
      this.insertGameDataToDB()
  }

  insertGameDataToDB() {
    var { game, avgStats } = this.state
    game.gameStats = avgStats

    let body = JSON.stringify(game)
    const config = {
      headers: {
        'Content-Type': 'application/JSON'
      }
    };
    axios.post('http://localhost:5000/games/add', body, config)
      .then(
        (response) => {
          var gameIDCreate = response.data._id
          var teamID = response.data.teamid
          this.insertPlayersDataToDB(gameIDCreate, teamID)
        },
        (error) => {
          console.log(error);
        }
      );
  }
  replaceKeys(object) {
    Object.keys(object).forEach(function (key) {
      var newKey = key.replace(/\s+/g, ''); // repleace ' '
      newKey = newKey.replace(/[\(\)\/]/g, ''); // repleace ()/ \[]

      if (object[key] && typeof object[key] === 'object') {
        this.replaceKeys(object[key]);
      }
      if (key !== newKey) {
        object[newKey] = object[key];
        delete object[key];
      }
    });
  }

  insertPlayersDataToDB(gameID, teamID) {


    var { players } = this.state
    players.forEach(player => {
      this.replaceKeys(player)
      player.gameID = gameID
      player.teamID = teamID
    })

    players.forEach(player => {
      let playerBody = JSON.stringify(player)
      console.log(playerBody)

      this.savePlayer(player)
        .then(
          (response) => {
            console.log(response)
            this.props.history.push('/Games')
          },
          (error) => {
            console.log(error);
          }
        );

    })

  }
  savePlayer(player) {
    const config = {
      headers: {
        'Content-Type': 'application/JSON'
      }

    };
    return axios.post('http://localhost:5000/players/add', player, config)
  };
  render() {
    if (!this.state) {
      return <Redirect to={{
        pathname: '/',
      }}
      />
    }
    var { players } = this.state
    const { myTeamName, opponentTeam, gameDate, anotherFinalScore, myTeamFinalScore } = this.state.game
    const { positions, maxScore, avgStats } = this.state
    console.log(players)

    return (
      <Fragment>
        <section>
          <Stepper steps={[{ title: 'Insert deitals form Game' }, { title: 'Upload csv File' }, { title: 'Insert player deitals ' }]} activeStep={2} />

        </section>
        <div>
          <h1>{myTeamName} - {opponentTeam} </h1> <h3>Date: {gameDate} score: {myTeamFinalScore} - {anotherFinalScore}</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Last Name</th>
              <th>Select Position</th>
              <th>Total Time</th>
              <th>Distance (km)</th>
              <th>Sprint Distance</th>
              <th> Total Sprints</th>
              <th>Sprints Avg(MP/H).</th>
              <th>Goals</th>
            </tr>


          </thead>
          <tbody>
            {players.map((player) => (

              <tr key={player["Tracker"]}>
                <td className="tooltip1 " >{player["First Name"]}</td>
                <td className="tooltip1" > {player["Last Name"]}</td>
                <td>
                  <select
                    defaultValue={"mc"}
                    id='position'
                    name={player}
                    onChange={(e) => {
                      player.position = e.target.value
                    }}>
                    <option disabled selected value>
                      Please select a permission
                    </option>
                    {positions.map((position) => (
                      <option key={position}>{position}</option>
                    ))}
                  </select>
                </td>
                <td className="tooltip1" > {player["Time on Pitch (mins)"]}</td>
                <td className="tooltip1" > {player["Distance (km)"]} <span className="tooltiptext" > Half(1): {player["Distance 1st Half (km)"]} Half(2) {player["Distance 2nd Half (km)"]}</span></td>
                <td className="tooltip1" > {player["Progressive Sprints"]}<span className="tooltiptext" >Half(1): {player["Progressive Sprints 1st Half"]}  Half(2) {player["Progressive Sprints 2nd Half"]}</span></td>
                <td className="tooltip1" > {player["Sprints"]} <span className="tooltiptext" > Half(1): {player["Sprints 1st Half"]} Half(2) {player["Sprints 2nd Half"]}</span></td>
                <td className="tooltip1" > {player["Top Speed (km/h)"]}</td>

                <td style={{ width: '20%' }}>

                  <input type="number" name="goal" defaultValue={0} size="10" min="0" max={maxScore === parseInt(myTeamFinalScore) ? 0 : myTeamFinalScore} onChange={(e) => this.setGoals(player, e.target.value)} />
                </td>

              </tr>
            ))}
            <tr>
              <td className="totalStats" colspan="4">Total AVG</td>
              <td className="totalStats">{avgStats.distance}</td>
              <td className="totalStats">{avgStats.progressive_Sprints}</td>
              <td className="totalStats">{avgStats.sprints}</td>
              <td className="totalStats">{avgStats.top_Speed}</td>
              <td>
                <button className="btn btn-primary" onClick={() => this.handleSubmit()}>Save</button>

              </td>
            </tr>
          </tbody>

        </table>
      </Fragment>
    )
  }
}
export default ShowPlayers;
