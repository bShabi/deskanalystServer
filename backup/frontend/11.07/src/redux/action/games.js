import axios from 'axios'

export function getGamesByTeamId(teamId) {
    return (dispatch) => {
        return axios.get('http://localhost:5000/games/find/' + teamId)
            .then((res) => {
                const action = {
                    type: 'SET_GAMES',
                    games: res.data
                }
                dispatch(action)
            })
    }
}
export function addGame(game) {
    return (dispatch) => {
        let body = JSON.stringify(game)
        console.log(game)
        const config = {
            headers: {
                'Content-Type': 'application/JSON'
            }
        };
        return axios.post('http://localhost:5000/games/add', body, config)
            .then(
                (response) => {

                    const action = {
                        type: 'ADD_GAME',
                        game: response.data
                    }
                    dispatch(action)
                    return response.data
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}
