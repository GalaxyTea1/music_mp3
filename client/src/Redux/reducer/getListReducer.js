import { GLOBALTYPES } from 'Redux/type/globalType';
const initialState = {
    getList: [],
};
const getListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_PLAYLIST:
            return { ...state, getList: action.payload.data.playlist };
        default:
            return state;
    }
};

export default getListReducer;
