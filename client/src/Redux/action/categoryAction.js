import { getDataAPI } from '../../api/postApi';
import { GLOBALTYPES } from 'Redux/type/globalType';

export const Category = async (dispatch) => {
    try {
        const res = await getDataAPI('category');

        dispatch({ type: GLOBALTYPES.GET_CATEGORY, payload: res });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};
