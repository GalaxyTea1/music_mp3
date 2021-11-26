import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

Test.propTypes = {
    onSubmit: PropTypes.func,
};

export default function Test() {
    const [name, setName] = useState('');
    const [audio, setAudio] = useState('');
    const { authReducer } = useSelector((state) => state);

    const handleChange = (e) => {
        const nameChange = e.target.value;
        setName(nameChange);
    };

    const handleChangeAudio = (e) => {
        const audioFile = e.target.files[0];
        setAudio(audioFile);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('name', name);
        form_data.append('audio', audio, audio.name);
        let url = 'http://localhost:5001/api/playlist/';
        axios
            .post(url, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: authReducer.token,
                },
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));

        setName('');
        console.log(form_data);
    };

    return (
        <div className='main'>
            <div className='add_album' style={{ margin: '40px 10px 10px 0' }}>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        size='50'
                        placeholder='Name'
                        id='name'
                        value={name}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <br />
                    <input
                        name='audio'
                        type='file'
                        onChange={handleChangeAudio}
                        multiple='multiple'
                    />
                    <button type='submit'>Thêm Thể Loại</button>
                </form>
            </div>
        </div>
    );
}
