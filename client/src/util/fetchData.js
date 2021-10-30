import axios from 'axios';

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`/api/auth/${url}`, {
        headers: { Authorization: token },
    });
    return res;
};

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`/api/auth/${url}`, post, {
        headers: { Authorization: token },
    });
    return res;
};

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`/api/auth/${url}`, post, {
        headers: { Authorization: token },
    });
    return res;
};

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`/api/auth/${url}`, post, {
        headers: { Authorization: token },
    });
    return res;
};

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`/api/auth/${url}`, {
        headers: { Authorization: token },
    });
    return res;
};
