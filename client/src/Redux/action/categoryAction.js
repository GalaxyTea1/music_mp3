import { deleteDataAPI, getDataAPI } from '../../api/postApi';
import { GLOBALTYPES } from 'Redux/type/globalType';

export const Category = async (dispatch) => {
    try {
        const res = await getDataAPI('category');

        dispatch({ type: GLOBALTYPES.GET_CATEGORY, payload: res });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};

export const handleDeleteCategoryItem = (_id) => async (dispatch) => {
    dispatch({ type: GLOBALTYPES.DELETE_CATEGORY_ITEM, payload: _id });
    try {
        const res = await deleteDataAPI(`category/${_id}`);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg,
            },
        });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { msg: 'error' } });
    }
};
