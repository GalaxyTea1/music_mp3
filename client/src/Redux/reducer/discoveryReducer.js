import { GLOBALTYPES } from '../type/globalType';

const initialState = [];

const discoveryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_DISCOVERY:
            return action.payload.data.discoverys;
        default:
            return state;
    }
};

export default discoveryReducer;
