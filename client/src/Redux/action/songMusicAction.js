import { getDataAPI } from '../../api/postApi';
import { GLOBALTYPES } from 'Redux/type/globalType';

export const SongItem = async (dispatch) => {
    try {
        const res = await getDataAPI('song');
        dispatch({ type: GLOBALTYPES.GET_SONG_MUSIC, payload: res });
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
