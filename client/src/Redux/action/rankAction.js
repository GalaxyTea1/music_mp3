import { deleteDataAPI, getDataAPI, postDataAPI } from '../../api/postApi';
import { GLOBALTYPES } from 'Redux/type/globalType';

export const RankItem = async (dispatch) => {
    try {
        const res = await getDataAPI('rank');

        dispatch({ type: GLOBALTYPES.GET_RANK, payload: res });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};

// export const addRank = (form_data) => async (dispatch) => {
//     const data = { form_data };
//     console.log(data);
//     try {
//         const res = await postDataAPI('rank', data);
//         console.log('123', res);
//     } catch (error) {
//         console.log(error);
//     }
// };

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
