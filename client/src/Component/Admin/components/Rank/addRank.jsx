import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRank } from 'Redux/action/rankAction';
import axios from 'axios';

DashRank.propTypes = {
    onSubmit: PropTypes.func,
};

export default function DashRank() {
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
    } 

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
        let url = 'http://localhost:5001/api/rank/';
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
    // const [avatar, setAvatar] = useState();
    // const [img, setImg] = useState();
    // const initialValues = { title: '', author: '' };
    // const [inputV, setInputV] = useState(initialValues);
    // const { title, author } = inputV;

    // const dispatch = useDispatch();

    // const handleChangValues = (e) => {
    //     const { name, value } = e.target;
    //     setInputV({ ...inputV, [name]: value });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(addRank(inputV, img));
    // };

    return (
        <div className="main" style={{ color: 'black' }}>
            <form onSubmit={handleSubmit}>
                <p>
                    <input
                        type="text"
                        placeholder="Title"
                        id="title"
                        value={title}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="Author"
                        id="author"
                        value={author}
                        onChange={handleChangeAuthor}
                        required
                    />
                </p>
                <p>
                    <input
                        type="file"
                        id="image"
                        name="photo"
                        accept="image/png, image/jpeg"
                        onChange={handleImageChange}
                        required
                    />
                </p>
                <input type="submit" />
            </form>
        </div>
    );
}
