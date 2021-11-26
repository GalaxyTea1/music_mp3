/* eslint-disable import/no-anonymous-default-export */
import { GET_DETAIL, SONG_MUSIC_DETAIL } from '../type/Music';
const initialState = {
    listSongMusic: [],
    musicDetail: {},
    typeSongMusic: true, // true is listSong,false is playlist Song
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DETAIL: {
            return { ...state, listSongMusic: action.listSongMusic };
        }
        case SONG_MUSIC_DETAIL: {
            return {
                ...state,
                musicDetail: action.musicDetail,
                typeSongMusic: action.typeSongMusic,
            };
        }
        default:
            return state;
    }
};
