import React, { Component, Fragment } from 'react'
import axios from 'axios'
import {
    DataGrid,
} from "@material-ui/data-grid";
import { getGamesByGameId, getPlayersInGame } from '../until/httpService'

export default class ShowSpecificGame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameID: this.props.selecetGameID,
            myTeam: "",
            players: [],
            gameInfo: [],
            avgStats: []
        }
        this.setIDPlayer = this.setIDPlayer.bind(this)
    }
    componentDidMount() {
        const { gameID, players } = this.state
        getPlayersInGame(gameID).then((result) => {
            if (result) {
                this.setState({ players: result.data })
            }
        }).catch((err) => {
            console.log(err)
        })
        getGamesByGameId(gameID).then((result) => {
            if (result) {
                console.log(result.data)
                this.setState({ gameInfo: result.data[0] })
                this.setState({ avgStats: result.data[0].gameStats })
            }
        }).catch((err) => {
            console.log(err)
        })

    }


    setIDPlayer(players) {
        console.log(players)
        players.forEach(player => (
            player.id = player._id
        ))
    }
    render() {
        const { players, gameInfo, avgStats } = this.state
        console.log(gameInfo)

        return (
            <>
                <Fragment>
                    <h3>
                        {gameInfo.myTeamName} - {gameInfo.opponentTeam}
                    </h3>
                    <h3>
                        {gameInfo.myTeamFinalScore} - {gameInfo.anotherFinalScore}
                    </h3>

                    <table>
                        <td>
                            {/* Players stats  */}
                            <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Last Name</th>
                                    <th>Position</th>
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

                                    <tr key={player["_id"]}>
                                        <td className="tooltip" >{player["firstName"]}</td>
                                        <td className="tooltip" > {player["lastName"]}</td>
                                        <td className="tooltip" > {player["position"]}

                                        </td>
                                        <td className="tooltip" > {player["timeOnPitch"]}</td>
                                        <td className="tooltip" > {player["distance"]} <span className="tooltiptext" > Half(1): {player["distanceHalfOne"]} Half(2) {player["distanceHalfTwo"]}</span></td>
                                        <td className="tooltip" > {player["progressiveSprints"]}<span className="tooltiptext" >Half(1): {player["progressiveSprintsHalfOne"]}  Half(2) {player["progressiveSprintsHalfTwo"]}</span></td>
                                        <td className="tooltip" > {player["sprints"]} <span className="tooltiptext" > Half(1): {player["sprintsHalfOne"]} Half(2) {player["sprintsHalfTwo"]}</span></td>
                                        <td className="tooltip" > {player["topSpeed"]}</td>
                                        <td className="tooltip" > {player["goals"]}</td>

                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="4">
                                        Avg Stats
                                    </td>
                                    <td> {avgStats.distance}</td>
                                    <td>{avgStats.progressive_Sprints}</td>
                                    <td>{avgStats.sprints}</td>
                                    <td>{avgStats.top_Speed}</td>

                                </tr>
                            </tbody>
                        </td>
                        <td>
                            <thead>
                                <tr>

                                    <th>half One</th>
                                    <th>Category</th>
                                    <th>half Two</th>
                                </tr>

                            </thead>
                            <tbody>

                                <tr >
                                    <td>{gameInfo.shotOnTargetHalfOne}</td>
                                    <td> Shot On Target</td>
                                    <td>{gameInfo.shotOnTargetHalfTwo}</td>
                                </tr>
                                <tr >
                                    <td>{gameInfo.shotOFFTargetHalfOne}</td>
                                    <td> Shot OF Target</td>
                                    <td>{gameInfo.shotOFFTargetHalfTwo}</td>
                                </tr>
                                <tr >
                                    <td>{gameInfo.corrnerHalfOne}</td>
                                    <td> Corrner</td>
                                    <td>{gameInfo.corrnerHalfTwo}</td>
                                </tr>
                                <tr >
                                    <td>{gameInfo.offsidesHalfOne}</td>
                                    <td> Offside</td>
                                    <td>{gameInfo.offsidesHalfTwo}</td>
                                </tr>
                                <tr >
                                    <td>{gameInfo.tackelsHalfOne}</td>
                                    <td> Tackels</td>
                                    <td>{gameInfo.tackelsHalfTwo}</td>
                                </tr>
                                <tr >
                                    <td>{gameInfo.stealHalfOne}</td>
                                    <td> Steal</td>
                                    <td>{gameInfo.stealHalfTwo}</td>
                                </tr>





                            </tbody>
                        </td>

                    </table>

                </Fragment>
            </>

        )
    }
}

