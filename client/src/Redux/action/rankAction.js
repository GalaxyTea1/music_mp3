import { deleteDataAPI, getDataAPI } from '../../api/postApi';
import { GLOBALTYPES } from 'Redux/type/globalType';

export const RankItem = async (dispatch) => {
    try {
        const res = await getDataAPI('rank');

        dispatch({ type: GLOBALTYPES.GET_RANK, payload: res });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};

export const handleDeleteRankItem = (_id) => async (dispatch) => {
    dispatch({ type: GLOBALTYPES.DELETE_RANK_ITEM, payload: _id });
    try {
        const res = await deleteDataAPI(`rank/${_id}`);
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
