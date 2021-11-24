import { getDataAPI, postDataAPI } from '../../api/postApi';
import { GLOBALTYPES } from 'Redux/type/globalType';

export const Discovery = async (dispatch) => {
    try {
        const res = await getDataAPI('discovery');

        dispatch({ type: GLOBALTYPES.GET_DISCOVERY, payload: res });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};

// export const addDiscovery = (form-data) => async (dispatch) => {
//     const data = { form-data};
//     console.log(data);
//     try {
//         const res = await postDataAPI('discovery', data);
//         console.log(res);
//     } catch (error) {
//         console.log(error);
//     }
// };
