import { GLOBALTYPES } from '../type/globalType';

const initialState = {
    discoveryList: [],
};

const discoveryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_DISCOVERY:
            return { ...state, discoveryList: action.payload.data.discoverys };
        default:
            return state;
    }
};

export default discoveryReducer;
