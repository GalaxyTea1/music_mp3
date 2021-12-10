import { GLOBALTYPES } from 'Redux/type/globalType';
import { deleteDataAPI, postDataAPI } from '../../api/postApi';

export const handleAccept =
    ({ item, token }) =>
    async (dispatch) => {
        try {
            const res = await postDataAPI('handleAccept', { item });

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

export const handleRefuse =
    ({ _id, token }) =>
    async (dispatch) => {
        try {
            const res = await deleteDataAPI(`handleSong/${_id}`);
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
