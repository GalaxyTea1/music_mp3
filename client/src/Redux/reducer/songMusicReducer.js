import { GLOBALTYPES } from '../type/globalType';

const initialState = [];

const songMusicReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_SONG_MUSIC:
            return action.payload.data.songs;
        default:
            return state;
    }
};

export default songMusicReducer;
