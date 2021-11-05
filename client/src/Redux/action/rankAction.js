import { getDataAPI } from '../../api/postApi';
import { GLOBALTYPES } from 'Redux/type/globalType';

export const RankItem = async (dispatch) => {
    try {
        const res = await getDataAPI('rank');

        dispatch({ type: GLOBALTYPES.GET_RANK, payload: res });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};
