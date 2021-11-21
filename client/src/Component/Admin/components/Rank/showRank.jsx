import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RankItem } from 'Redux/action/rankAction';

export default function ShowDiscovery() {
    const [avatar, setAvatar] = useState();

    const [data, setData] = useState({title: '', author: ''});
    const [value, setValue] = useState([]);

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

    const changeValueHandle = (e) => {
        const inputValue = e.target.value;
        const checkValue = rankReducer.map(item => {
            if (item._id === inputValue) {
                return item
            }
            
        })
        setValue(checkValue)
    }

    const filterArr = value.filter(function (item) {
        return item
    })

    const imageFilter =  filterArr.map(item => (item._id))
    const titleFilter =  filterArr.map(item => (item.title))
    const authorFilter =  filterArr.map(item => (item.author))

    return (
        <div className="main">
            <div
                className="add_album"
                style={{ backgroundColor: 'green', color: 'black', marginTop: '40px' }}
            >
                <form>
                    <select onChange={changeValueHandle}>
                        {rankReducer.map((option) => (
                            <option value={option._id} key={option._id}>{option.title}</option>
                        ))}
                    </select> <br/><br/>
                
                    <input type="text" label="title" placeholder={titleFilter} size="50" />
               <br/><br/>
                    <input type="text" label="author" placeholder={authorFilter} size="50" />
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
