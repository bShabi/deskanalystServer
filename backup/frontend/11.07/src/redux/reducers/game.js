const initalState = {
    games: []
}

const gameReducer = (state = initalState, action = {}) => {
    switch (action.type) {
        case 'ADD_GAME':
            return { ...state, games: [...state.games, action.game] }
        case 'SET_GAMES':
            console.log(action)
            return { ...state, games: action.games }
        case 'REMOVE_GAME':
            return { ...state, games: state.filter(game => game._id !== action.gameId) }
        default:
            return state
    }
};
export default gameReducer