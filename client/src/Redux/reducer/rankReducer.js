import { GLOBALTYPES } from '../type/globalType';

const initialState = { rankList: [] };

const rankReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_RANK:
            return { ...state, rankList: action.payload.data.ranks };
        case GLOBALTYPES.DELETE_RANK_ITEM:
            return {
                ...state,
                rankList: state.rankList.filter((item) => item._id !== action.payload[0]),
            };
        default:
            return state;
    }
};

export default rankReducer;
