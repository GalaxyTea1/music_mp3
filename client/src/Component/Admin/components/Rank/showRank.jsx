import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RankItem } from 'Redux/action/rankAction';

export default function ShowDiscovery() {
    const [avatar, setAvatar] = useState();

    const [dataRank, setDataRank] = useState();

    const { rankReducer } = useSelector((state) => state);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(RankItem);
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
        return album.title;
    }

    function idHandler(album) {
        return album._id;
    }

    const idAlbum = rankReducer.map(idHandler);
    console.log(idAlbum);

    const newAlbum = rankReducer.map(albumHandler);
    console.log(newAlbum);


    return (
        <div className="main">
            <div
                className="add_album"
                style={{ backgroundColor: 'green', color: 'black', marginTop: '40px' }}
            >
                <form>
                    <select>
                        {rankReducer.map((option) => (
                            <option value={option._id}>{option.title}</option>
                        ))}
                    </select> <br/><br/>
                    
                    <input type="text" label="title" placeholder="" size="50" />
               <br/><br/>
                    <input type="text" label="author" placeholder="" size="50" />
                    <br/><br/>
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
                    <button type="submit">Cập nhật Album</button>
                </form>
            </div>
        </div>
    );
}
