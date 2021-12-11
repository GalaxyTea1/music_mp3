import { GLOBALTYPES } from 'Redux/type/globalType';
import { CREATE_PLAYLIST } from 'Redux/type/Music';
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from '../../api/postApi';

export const handlePlaylist =
    ({ item, authReducer }) =>
    async (dispatch) => {
        const res = await postDataAPI('playlist', item, authReducer.token);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg,
            },
        });
        // dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    };

export const getPlaylist = async (dispatch) => {
    try {
        const res = await getDataAPI('playlist');
        dispatch({ type: GLOBALTYPES.GET_PLAYLIST, payload: res });
        if (res.status === 200) {
            res.data.playlist.forEach((item) => {
                dispatch({ type: CREATE_PLAYLIST, newPlaylist: item });
            });
        }
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};

export const putPlaylist =
    ({ _id, newItem }) =>
    async (dispatch) => {
        try {
            const res = await putDataAPI(`playlist/${_id}`, newItem);
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    success: res.data.msg,
                },
            });
            // dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
        }
    };

export const removePlaylist = (_id) => async (dispatch) => {
    try {
        const res = await deleteDataAPI(`playlist/${_id}`);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg,
            },
        });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};
