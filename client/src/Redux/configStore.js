import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import PlaylistReducer from './reducer/PlaylistReducer';
import SongReducer from './reducer/SongReducer';
import authReducer from './reducer/authReducer';
import alertReducer from './reducer/alertReducer';
import discoveryReducer from './reducer/discoveryReducer';
import radioReducer from './reducer/radioReducer';
import rankReducer from './reducer/rankReducer';
import radioViewReducer from './reducer/radioViewReducer';
import categoryReducer from './reducer/categoryReducer';
import songMusicReducer from './reducer/songMusicReducer';
import detailReducer from './reducer/detailReducer';
import getListReducer from './reducer/getListReducer';
import acceptReducer from './reducer/acceptReducer';
import lyricReducer from './reducer/lyricReducer';

const rootReducer = combineReducers({
    SongReducer,
    PlaylistReducer,
    authReducer,
    alertReducer,
    discoveryReducer,
    radioReducer,
    rankReducer,
    radioViewReducer,
    categoryReducer,
    songMusicReducer,
    detailReducer,
    getListReducer,
    acceptReducer,
    lyricReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
