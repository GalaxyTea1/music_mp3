import { GLOBALTYPES } from 'Redux/type/globalType';
import { postDataAPI } from '../../api/postApi';

export const handlePlaylist =
    ({ item }) =>
    async (dispatch) => {
        console.log(item);
        try {
            const res = await postDataAPI('playlist', { item });
            console.log(res);
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
        }
    };
