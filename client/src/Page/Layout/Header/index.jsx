import { SearchOutlined } from '@ant-design/icons';
import { getDataAPI } from 'api/postApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from 'Redux/type/globalType';
import { SONG_MUSIC_DETAIL } from 'Redux/type/Music';

export default function Header() {
    const [valueSearch, setValueSearch] = useState('');
    const [resultSearch, setResultSearch] = useState([]);
    const [close, setClose] = useState(false);
    const [upload, setUpload] = useState(false);
    const { authReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [audio, setAudio] = useState();
    useEffect(() => {
        if (audio === undefined) {
            setUpload(true);
        } else {
            setUpload(false);
        }
    }, [audio]);
    const handleChangeAudio = (e) => {
        const audioFile = e.target.files[0];
        setAudio(audioFile);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('audio', audio, audio.name);
        let url = 'http://localhost:5001/api/handlesong/';
        axios
            .post(url, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: authReducer.token,
                },
            })
            .then((res) => {
                console.log(res.data.msg);
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: {
                        success: res.data.msg,
                    },
                });
            })
            .catch((err) => console.log(err));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const res = await getDataAPI(`search?name=${valueSearch}`);
        setResultSearch(res.data.search);
    };

    return (
        <div className='header'>
            <div className='header__content flex justify-between w-full'>
                <div className='header__left'>
                    <div
                        className='header__search'
                        style={{ left: '24px' }}
                        onFocus={() => setClose(true)}
                    >
                        <SearchOutlined
                            className='mr-5'
                            style={{ fontSize: '24px', position: 'absolute', left: '10px' }}
                        />
                        <form onSubmit={handleSearch}>
                            <input
                                placeholder='Nhập tên bài hát...'
                                value={valueSearch}
                                onChange={(e) => setValueSearch(e.target.value)}
                                name='inputSearch'
                            ></input>
                        </form>

                        <div className='header__input' onInput={() => setClose(true)}>
                            {close ? (
                                <div>
                                    <h3>Từ Khóa Liên Quan</h3>
                                    <i
                                        class='fas fa-window-close'
                                        onClick={() => setClose(false)}
                                    ></i>
                                </div>
                            ) : null}

                            {close ? (
                                <div>
                                    {resultSearch.map((item) => (
                                        <div
                                            className='search__item'
                                            onClick={() => {
                                                dispatch({
                                                    type: SONG_MUSIC_DETAIL,
                                                    musicDetail: item,
                                                    typeSongMusic: true,
                                                });
                                            }}
                                        >
                                            {item.name} - {item.artists_names}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className='header__right flex items-center'>
                    <div className='form'>
                        <form onSubmit={handleSubmit}>
                            <div
                                style={{
                                    display:
                                        typeof authReducer.token === 'string' ? 'block' : 'none',
                                }}
                            >
                                <span className='hiddenFileInput'>
                                    <input name='audio' type='file' onChange={handleChangeAudio} />
                                </span>
                                {/* ref={inputRef} */}
                                <span className='isSubmit'>
                                    <input type='submit' disabled={upload} value='Tải lên' />
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
