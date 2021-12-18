import axios from 'axios';

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: token },
    });
    return res;
};

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`/api/${url}`, post, {
        headers: { Authorization: token },
        body: post,
    });
    return res;
};

export const putDataAPI = async (url, put, token) => {
    const res = await axios.put(`/api/${url}`, put, {
        headers: { Authorization: token },
        body: put,
    });
    return res;
};

export const patchDataAPI = async (url, data, token) => {
    const res = await axios.patch(`/api/${url}`, data, {
        headers: { Authorization: token },
    });
    return res;
};

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`/api/${url}`, {
        headers: { Authorization: token },
    });
    return res;
};
