import { GLOBALTYPES } from '../type/globalType';

const initialState = {
    categoryList: [],
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.GET_CATEGORY:
            return { ...state, categoryList: action.payload.data.categories };
        case GLOBALTYPES.DELETE_CATEGORY_ITEM:
            return {
                ...state,
                categoryList: state.categoryList.filter((item) => item._id !== action.payload[0]),
            };
        default:
            return state;
    }
};

export default categoryReducer;
