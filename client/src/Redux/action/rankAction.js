import { getDataAPI, postDataAPI } from '../../api/postApi';
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
