import { GLOBALTYPES } from 'Redux/type/globalType';
const initialState = {
    getSongAccept: [],
};

const acceptReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_SONG_ACCEPT:
            return { ...state, getSongAccept: action.payload.handlesong };
        case GLOBALTYPES.DELETE_SONG_ACCEPT:
            return {
                ...state,
                getSongAccept: state.getSongAccept.filter((item) => item._id !== action.payload),
            };
        default:
            return state;
    }
};

export default acceptReducer;
