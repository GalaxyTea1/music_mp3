import { getDataAPI } from '../../api/postApi';
import { GLOBALTYPES } from 'Redux/type/globalType';

export const Discovery = async (dispatch) => {
    try {
        const res = await getDataAPI('discovery');

        dispatch({ type: GLOBALTYPES.GET_DISCOVERY, payload: res });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};
