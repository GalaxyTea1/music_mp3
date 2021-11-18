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
    const dispatch = useDispatch();

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
        // dispatch(addRank(form_data))
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
                            accept="image/png, image/jpeg"
                            onChange={handleImageChange}
                            required
                        />
                   
                    <button type="submit">Thêm Album</button>
                </form>
            </div>
        </div>
    );
}
