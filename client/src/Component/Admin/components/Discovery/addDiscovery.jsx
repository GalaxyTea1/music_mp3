import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

DashDiscovery.propTypes = {
    onSubmit: PropTypes.func,
};

export default function DashDiscovery() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState();

    const [avatar, setAvatar] = useState();

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    const handleChange = (e) => {
        const titleChange = e.target.value;
        setTitle(titleChange);
    };

    const handleChangeAuthor = (e) => {
        const authorChange = e.target.value;
        setAuthor(authorChange);
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setImage(imageFile);

        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('image', image, image.name);
        form_data.append('title', title);
        form_data.append('author', author);
        console.log(form_data);
        let url = 'http://localhost:5001/api/discovery/';
        axios
            .post(url, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));

        setTitle('');
        setAuthor('');
    };

    return (
        <div className='main'>
            <div className='add_album' style={{ margin: '40px 10px 10px 0' }}>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        size='50'
                        placeholder='Title'
                        id='title'
                        value={title}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <br />

                    <input
                        type='text'
                        size='50'
                        placeholder='Author'
                        id='author'
                        value={author}
                        onChange={handleChangeAuthor}
                        required
                    />
                    <br />
                    <br />

                    <input
                        type='file'
                        id='image'
                        name='image'
                        accept='image/png, image/jpeg, image/webp, image/jpg, image/jfif'
                        onChange={handleImageChange}
                        required
                    />
                    <button type='submit' className='btn__control'>
                        Thêm Album
                    </button>
                </form>
                <br />
                <br />
                {avatar && <img src={avatar.preview} alt='album' width='250px !important' />}
            </div>
        </div>
    );
}
