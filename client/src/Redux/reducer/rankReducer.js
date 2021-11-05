import { GLOBALTYPES } from '../type/globalType';

const initialState = [];

const rankReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_RANK:
            return action.payload.data.ranks;
        default:
            return state;
    }
};

export default rankReducer;
