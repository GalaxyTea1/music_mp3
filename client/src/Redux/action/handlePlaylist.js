import { GLOBALTYPES } from 'Redux/type/globalType';
import { postDataAPI } from '../../api/postApi';

export const handlePlaylist =
    ({ item, id }) =>
    async (dispatch) => {
        try {
            const res = await postDataAPI('playlist', { item, id });
            console.log(res);
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
        }
    };
