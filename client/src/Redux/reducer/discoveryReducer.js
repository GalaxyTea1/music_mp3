import { GLOBALTYPES } from '../type/globalType';

const initialState = {
    discoveryList: [],
};

const discoveryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_DISCOVERY:
            return { ...state, discoveryList: action.payload.data.discoverys };
        case GLOBALTYPES.DELETE_DISCOVERY_ITEM:
            console.log(action.payload);
            return {
                ...state,
                discoveryList: state.discoveryList.filter((item) => item._id !== action.payload[0]),
            };
        default:
            return state;
    }
};

export default discoveryReducer;
