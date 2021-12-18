import { GLOBALTYPES } from '../type/globalType';

const initialState = { toggleLyric: false };

const lyricReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.OPEN_LYRIC:
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default lyricReducer;
