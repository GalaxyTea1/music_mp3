import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Discovery } from 'Redux/action/discoveryAction';

export default function ShowDiscovery() {
    const [avatar, setAvatar] = useState();

    const { discoveryReducer } = useSelector((state) => state); 

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Discovery);
    }, [dispatch]);

    useEffect(() => {
        //Clean up
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };

    function albumHandler(album) {
        return album.title
    }

    const newAlbum = discoveryReducer.map(albumHandler)
    // console.log((newAlbum));
   
    return (
        <div className="main" >
            <div className="add_album" style={{ backgroundColor: 'green', color: 'black', marginTop:'40px' }}>
                <form >
                    <select name="albums" id="album1" >
                        <option value="">id1</option>
                        <option value="">id2</option>
                        <option value="">id3</option>
                        <option value="">id4</option>
                    </select>
                    
                    <br/>
                    <br/>
                    <input type="text" label="title" placeholder='' size="50" /> <br />
                    <br />
                    <input
                        type="text"
                        label="author"
                        placeholder="Nhập tên ca sĩ, tác giả"
                        size="50"
                    />
                    <br />
                    <br />
                    <input
                        type="file"
                        label="image"
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
                    <button type="submit" >Cập nhật Album</button>
                </form>
            </div>
        </div>
    );
}

