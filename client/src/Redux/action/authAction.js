import { GLOBALTYPES } from '../type/globalType';
import { postDataAPI } from '../../util/fetchData';
import StorageKeys from '../../constants/storage-key';
import axios from 'axios';

export const refreshToken = (authReducer) => async (dispatch) => {
    const firstLogin = localStorage.getItem('first login');
    if (firstLogin) {
        // dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        try {
            const res = await postDataAPI('refresh_token');
            console.log(res);
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user,
                },
            });

            // dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
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

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await axios.post('http://localhost:5001/api/login', data);

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
            },
        });

        localStorage.setItem('first login', true);
        // localStorage.setItem(StorageKeys.USER, res.data.user);

        console.log(res.data.user);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.message,
            },
        });
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: error.response.data.message,
            },
        });
    }
};

export const register = (data) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:5001/api/register', data);
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user,
            },
        });

        localStorage.setItem(StorageKeys.TOKEN, res.data.access_token);
        localStorage.setItem(StorageKeys.USER, res.data.userDefault);

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
                error: error.response.data.message,
            },
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        // localStorage.removeItem(StorageKeys.USER);
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
