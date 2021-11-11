import { GLOBALTYPES } from '../type/globalType';

const initialState = [];

const radioViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_RADIO_VIEW:
            return action.payload.data.radioviews;
        default:
            return state;
    }
};

export default radioViewReducer;
