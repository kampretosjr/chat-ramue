import {combineReducers} from 'redux';

import reLeaderboard from './leaderboard';
import rePlayer from './player';
import reConfig from './gameconfig';

const appReducer = combineReducers({
  reLeaderboard,
  rePlayer,
  reConfig
});

export default appReducer;
