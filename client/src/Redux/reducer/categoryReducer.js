import { GLOBALTYPES } from '../type/globalType';

const initialState = [];

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_CATEGORY:
            return action.payload.data.categories;
        default:
            return state;
    }
};

export default categoryReducer;
