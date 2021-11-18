import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDiscovery } from 'Redux/action/discoveryAction';

DashKhamPha.propTypes = {
    onSubmit: PropTypes.func,
};

export default function DashKhamPha() {
    const [avatar, setAvatar] = useState();
    const [img, setImg] = useState();
    const initialValues = { title: '', author: '' };
    const [inputV, setInputV] = useState(initialValues);
    const { title, author } = inputV;

    const dispatch = useDispatch();

    useEffect(() => {
        //Clean up
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        // if(typeof file.preview === 'string') {
        //     setAvatar(file);
        // }
        // else {
        //     setAvatar();
        // }
        setImg(file.preview);
        setAvatar(file);
    };

    const handleChangValues = (e) => {
        const { name, value } = e.target;
        setInputV({ ...inputV, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addDiscovery(inputV, img));
    };

    return (
        <div className="main">
            <div className="add_album" style={{ margin: '40px 10px 10px 0' }}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        label="title"
                        name="title"
                        placeholder="Nhập tiêu đề"
                        size="50"
                        value={title}
                        onChange={handleChangValues}
                    />
                    <br />
                    <br />
                    <input
                        type="text"
                        label="author"
                        placeholder="Nhập tên ca sĩ, tác giả"
                        size="50"
                        name="author"
                        value={author}
                        onChange={handleChangValues}
                    />
                    <br />
                    <br />
                    <input
                        type="file"
                        label="image"
                        name="img"
                        placeholder="Thêm Ảnh"
                        onChange={handlePreviewAvatar}
                    />
                    <br />
                    <br />
                    {avatar && (
                        <img
                            src={avatar.preview}
                            alt="album"
                            width="50% !important"
                            height="200px !important"
                        />
                    )}
                    <button type="submit">Thêm Album</button>
                </form>
            </div>
        </div>
    );
}
