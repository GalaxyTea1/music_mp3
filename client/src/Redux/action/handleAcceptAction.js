import { GLOBALTYPES } from 'Redux/type/globalType';
import { deleteDataAPI, postDataAPI } from '../../api/postApi';

export const handleAccept =
    ({ item, token }) =>
    async (dispatch) => {
        try {
            const res = await postDataAPI('handleAccept', { item });
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
        }
    };

export const handleRefuse =
    ({ _id, token }) =>
    async (dispatch) => {
        try {
            const res = await deleteDataAPI(`handleSong/${_id}`);
            console.log(res);
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { message: 'error' } });
        }
    };
