import counterReducer from './counter';
import gameReducer from './game'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    games: gameReducer
});

export default allReducers