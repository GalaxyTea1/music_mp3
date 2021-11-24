import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SongItem } from 'Redux/action/songMusicAction';

export default function Header() {
    // let [tenBaiHat, setTenBaiHat] = useState({
    //     value: '',
    // });
    const [value, setValue] = useState([]);
    const { songMusicReducer } = useSelector((state) => state);
    const { authReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SongItem);
    }, [dispatch]);
    // const changeValueHandle = (e) => {
    //     const inputValue = e.target.value;
    //     const checkValue = songMusicReducer.map((item) => {
    //         if (item._id === inputValue) {
    //             return item;
    //         }
    //     });
    //     setValue(checkValue);
    // };

    // const filterArr = value.filter(function (item) {
    //     return item;
    // });
    // const nameFilter = filterArr.map((item) => item.name);
    // const titleFilter = filterArr.map((item) => item.title);
    // const authorFilter = filterArr.map((item) => item.author);

    const [audio, setAudio] = useState();
    const handleChangeAudio = (e) => {
        const audioFile = e.target.files[0];
        setAudio(audioFile);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('audio', audio, audio.name);
        console.log(audio);
        console.log(form_data);
        let url = 'http://localhost:5001/api/song/';
        axios
            .post(url, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': authReducer.token,
                },
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="header">
            <div className="header__content flex justify-between w-full">
                <div className="header__left">
                    <div className="header__search" style={{ left: '24px' }}>
                        <SearchOutlined
                            className="mr-5"
                            style={{ fontSize: '24px', position: 'absolute', left: '10px' }}
                        />
                        <input placeholder="Nhập tên bài hát..." name="tenBaiHat"></input>
                    </div>
                </div>
                <div className="header__right flex items-center">
                    <div className="form">
                        <form id="form" onSubmit={handleSubmit}>
                            <span className="hiddenFileInput">
                                <input name="audio" type="file" onChange={handleChangeAudio} />
                            </span>
                            <button
                                style={{
                                    backgroundColor: 'gray',
                                    marginLeft: '155px',
                                    // display: 'none',
                                    cursor: 'pointer'
                                }}
                                type="submit"

                            >
                                submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
