import { GLOBALTYPES } from 'Redux/type/globalType';
import { CREATE_PLAYLIST } from 'Redux/type/Music';
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from '../../api/postApi';

export const handlePlaylist =
    ({ item, authReducer }) =>
    async (dispatch) => {
        const res = await postDataAPI('playlist', item, authReducer.token);
        console.log(item);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
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
        // dispatch({ type: CREATE_PLAYLIST, newPlaylist: res.data.playlist });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};

export const putPlaylist =
    ({ _id, item, authReducer }) =>
    async (dispatch) => {
        try {
            const res = await putDataAPI(`playlist/${_id}`, item, authReducer.token);
            dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
        }
    };

export const removePlaylist = (_id) => async (dispatch) => {
    try {
        const res = await deleteDataAPI(`playlist/${_id}`);
        console.log(res);
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
    }
};
