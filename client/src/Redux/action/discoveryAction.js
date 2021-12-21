import { GLOBALTYPES } from 'Redux/type/globalType';
import { deleteDataAPI, getDataAPI } from '../../api/postApi';

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

export const handleDeleteItem = (_id) => async (dispatch) => {
    dispatch({ type: GLOBALTYPES.DELETE_DISCOVERY_ITEM, payload: _id });
    try {
        const res = await deleteDataAPI(`discovery/${_id}`);
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
