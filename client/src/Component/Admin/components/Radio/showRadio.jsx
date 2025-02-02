import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { radioView } from 'Redux/action/radioViewAction';
import { GLOBALTYPES } from 'Redux/type/globalType';

export default function ShowRadio() {
    const [avatar, setAvatar] = useState();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState();

    const [value, setValue] = useState([]);

    const handleChange = (e) => {
        const titleChange = e.target.value;

        setTitle(titleChange);
    };

    const handleChangeAuthor = (e) => {
        const authorChange = e.target.value;
        setAuthor(authorChange);
    };

    const { radioViewReducer } = useSelector((state) => state);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(radioView);
    }, [dispatch]);

    useEffect(() => {
        //Clean up
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    const handlePreviewAvatar = (e) => {
        const imageFile = e.target.files[0];
        setImage(imageFile);

        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };

    const changeValueHandle = (e) => {
        const inputValue = e.target.value;
        const checkValue = radioViewReducer.map((item) => {
            if (item._id === inputValue) {
                return item;
            }
        });
        setValue(checkValue);
    };

    const filterArr = value.filter(function (item) {
        return item;
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('title', title);
        form_data.append('author', author);
        form_data.append('image', image, image.name);
        console.log(form_data);
        let url = `http://localhost:5001/api/radioview/${idFilter}`;
        axios
            .put(url, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log(res.data);
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: {
                        success: res.data.msg,
                    },
                });
            })
            .catch((err) => console.log(err));
    };

    const idFilter = filterArr.map((item) => item._id);
    const titleFilter = filterArr.map((item) => item.title);
    const authorFilter = filterArr.map((item) => item.author);

    return (
        <div className='main'>
            <div
                className='add_album'
                style={{ backgroundColor: 'green', color: 'black', marginTop: '40px' }}
            >
                <form onSubmit={handleSubmit}>
                    <select onChange={changeValueHandle}>
                        {radioViewReducer.map((option) => (
                            <option value={option._id} key={option._id}>
                                {option.title}
                            </option>
                        ))}
                    </select>{' '}
                    <br />
                    <br />
                    <input
                        type='text'
                        label='title'
                        placeholder={titleFilter}
                        size='50'
                        value={title}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <input
                        type='text'
                        label='author'
                        placeholder={authorFilter}
                        size='50'
                        value={author}
                        onChange={handleChangeAuthor}
                    />
                    <br />
                    <br />
                    <input
                        type='file'
                        label='image'
                        placeholder='Thêm Ảnh'
                        onChange={handlePreviewAvatar}
                    />
                    <br />
                    <br />
                    {avatar && <img src={avatar.preview} alt='album' width='250px !important' />}
                    <button type='submit' className='btn__control'>
                        Cập nhật Album
                    </button>
                </form>
            </div>
        </div>
    );
}
