import { GLOBALTYPES } from '../type/globalType';

const initialState = [];

const radioReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_RADIO:
            return action.payload.data.radios;
        default:
            return state;
    }
};

export default radioReducer;
