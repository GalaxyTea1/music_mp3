import { getDataAPI } from '../../api/postApi';
import { GLOBALTYPES } from 'Redux/type/globalType';

export const radioView = async (dispatch) => {
    try {
        const res = await getDataAPI('radioview');
        dispatch({ type: GLOBALTYPES.GET_RADIO_VIEW, payload: res });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};
