import React, { Component, Fragment } from 'react'
import axios from 'axios'
import {
    DataGrid,
} from "@material-ui/data-grid";
import { getGames } from '../until/httpService'

export default class ShowSpecificPlayer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gamesId: this.props.games,
            games: []

        }
        this.setID = this.setID.bind(this)
    }

    componentDidMount() {
        const { gamesId, games } = this.state
        // const allGames = []
        getGames().then(async (result) => {
            if (result) {
                var specificGame = result.data.filter((p) => gamesId.some((id) => id === p._id))
                console.log(specificGame)
                this.setState({ games: specificGame })
            }
        })

    }

    setID(games) {
        console.log(games)
        games.forEach(game => {
            game.halfScore = `${game.myTeamHalfScore} - ${game.anotherHalfScore}`;
            game.finalScore = `${game.myTeamFinalScore} - ${game.anotherFinalScore}`
            game.id = game._id
        })
    }
    render() {
        const { games, gamesId } = this.state
        this.setID(games)
        const columns = [
            { field: 'gameDate', headerName: 'Date', width: 300 },
            { field: 'myTeamName', headerName: 'My Team', width: 200 },
            { field: 'opponentTeam', headerName: 'opponent Team', width: 180 },
            { field: 'finalScore', headerName: 'Final Score', width: 130 },
        ]
        // console.log(gamesId)
        return (
            <Fragment>
                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid id={Math.random()} rows={games} columns={columns} hideFooterRowCount={false}
                    />
                </div>
            </Fragment>
        )
    }
}
