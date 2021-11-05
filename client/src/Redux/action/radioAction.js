import { getDataAPI } from '../../api/postApi';
import { GLOBALTYPES } from 'Redux/type/globalType';

export const Radio = async (dispatch) => {
    try {
        const res = await getDataAPI('radio');
        dispatch({ type: GLOBALTYPES.GET_RADIO, payload: res });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};
