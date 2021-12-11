import { GLOBALTYPES } from 'Redux/type/globalType';
import { deleteDataAPI, getDataAPI, postDataAPI } from '../../api/postApi';

export const getSongAccept = () => async (dispatch) => {
    try {
        const res = await getDataAPI('handlesong');
        dispatch({ type: GLOBALTYPES.GET_SONG_ACCEPT, payload: { ...res.data } });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};

export const handleAccept =
    ({ item, token }) =>
    async (dispatch) => {
        try {
            const res = await postDataAPI('handleAccept', { item });
            dispatch({ type: GLOBALTYPES.DELETE_SONG_ACCEPT, payload: item._id });
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
            dispatch({ type: GLOBALTYPES.DELETE_SONG_ACCEPT, payload: _id });
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
