import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

DashKhamPha.propTypes = {
    onSubmit: PropTypes.func,
};

export default function DashKhamPha() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState();

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
    };

    return (
        <div className="main">
            <div className="add_album" style={{ margin: '40px 10px 10px 0' }}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        id="title"
                        value={title}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <br />

                    <input
                        type="text"
                        placeholder="Author"
                        id="author"
                        value={author}
                        onChange={handleChangeAuthor}
                        required
                    />
                    <br />
                    <br />

                    <input
                        type="file"
                        id="image"
                        name="photo"
                        fieldname="photo"
                        filename="photo"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleImageChange}
                        required
                    />

                    <button type="submit">Thêm Album</button>
                </form>
            </div>
        </div>
    );
}
