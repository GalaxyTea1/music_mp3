import { postDataAPI } from '../../api/postApi';
import { GLOBALTYPES } from '../type/globalType';

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataAPI('login', data);

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
            },
        });

        localStorage.setItem('mp3 music', true);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg,
            },
        });
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg,
            },
        });
    }
};

export const refreshToken = () => async (dispatch) => {
    const mp3Music = localStorage.getItem('mp3 music');
    if (mp3Music) {
        try {
            const res = await postDataAPI('refresh_token');
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user,
                },
            });
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: err.response.data.msg,
                },
            });
        }
    }
};

export const register = (data) => async (dispatch) => {
    try {
        const res = await postDataAPI('register', data);
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
            },
        });

        localStorage.setItem('mp3 music', true);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg,
            },
        });
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.msg,
            },
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('mp3 music');
        // localStorage.removeItem(StorageKeys.TOKEN);
        await postDataAPI('/logout');
        window.location.href = '/';
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.message,
            },
        });
    }
};
