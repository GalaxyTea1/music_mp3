import { GLOBALTYPES } from "../type/globalType";
import { postDataAPI } from "../../api/postApi";
import axios from "axios";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("login", data);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem("mp3 music", true);
    // localStorage.setItem(StorageKeys.USER, res.data.user);

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

export const refreshToken = () => async (dispatch) => {
  const mp3Music = localStorage.getItem("mp3 music");
  console.log(mp3Music);
  if (mp3Music) {
    try {
      const res = await postDataAPI("refresh_token");
      console.log(res);
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
    const res = await axios.post("http://localhost:5001/api/register", data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem("mp3 music", true);
    // localStorage.setItem(StorageKeys.USER, res.data.userDefault);

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
    localStorage.removeItem("mp3 music");
    // localStorage.removeItem(StorageKeys.TOKEN);
    await postDataAPI("/logout");
    window.location.href = "/";
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.message,
      },
    });
  }
};
