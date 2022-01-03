import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { SONG_MUSIC_DETAIL } from 'Redux/type/Music';
// import _ from 'lodash';
import { getListAction, getSongAction } from '../../../Redux/action/ListMusicAction';
import { GLOBALTYPES } from '../../../Redux/type/globalType';

export default function Footer(props) {
    const [volume, setVolume] = useState(50);
    const audioRef = useRef(null);
    const myInput = useRef(null);
    const [timeSong, setTimeSong] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loop, setLoop] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [like, setLike] = useState(false);
    const [download, setDownload] = useState('');

    const dispatch = useDispatch();

    const { musicDetail, listSongMusic, typeSongMusic } = useSelector(
        (state) => state.detailReducer
    );

    const { toggleLyric } = useSelector((state) => state.lyricReducer);
    const { listPlaylist } = useSelector((state) => state.PlaylistReducer);

    useEffect(() => {
        dispatch(getListAction());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getSongAction());
    }, [dispatch]);

    const changeSong = (thamSo, list = listSongMusic) => {
        const index = list.findIndex((item) => item._id === musicDetail._id);
        if (thamSo === -1) {
            //check is the first song => return ;
            //check musicDetail is the first song ?
            if (list[0]?._id === musicDetail?._id) {
                return;
            }
            const newSong = list[index + thamSo];
            dispatch({
                type: SONG_MUSIC_DETAIL,
                musicDetail: newSong,
                typeSongMusic: typeSongMusic,
            });
        } else {
            //check is the last song => return
            if (list[list.length - 1]?._id === musicDetail?._id) {
                return;
            }
            const newSong = list[index + thamSo];

            dispatch({
                type: SONG_MUSIC_DETAIL,
                musicDetail: newSong,
                typeSongMusic: typeSongMusic,
            });
        }
    };

    // const changSong2 = (thamSo, list = listSongMusic) => {
    //     // if (typeSongMusic === false) {
    //     //     const path = props.computedMatch.params.name;
    //     //     const index = listPlaylist.findIndex((item) => item.name === path);
    //     //     if (index !== -1) {
    //     //         list = listPlaylist[index].list_song;
    //     //     }
    //     // }

    //     const index = list.findIndex((item) => item._id === musicDetail._id);
    //     if (thamSo === -1) {
    //         if (list[0]?._id === musicDetail?._id) {
    //             return;
    //         }
    //         const newSong = list[index + thamSo];
    //         dispatch({
    //             type: SONG_MUSIC_DETAIL,
    //             musicDetail: newSong,
    //             typeSongMusic: typeSongMusic,
    //         });
    //     }
    // };

    useEffect(() => {
        if (musicDetail.audio) {
            updateSong(musicDetail.audio);
            audioRef.current.play();
        }
    }, [musicDetail]);

    const [audio, setAudio] = useState({
        source: '',
        play: true,
    });
    const updateSong = (source) => {
        setAudio({
            source,
            play: true,
        });
    };
    const spring = useSpring({
        loop: true,
        from: {
            transform: 'rotate(0deg)',
        },
        to: {
            transform: 'rotate(360deg)',
        },
        config: {
            duration: 3000,
        },
    });
    const handleLoadedData = () => {
        setDuration(audioRef.current.duration);
    };
    const handleEnded = () => {
        let list = listSongMusic;
        setAudio({
            ...audio,
            play: false,
        });
        audioRef.current.pause();
        if (typeSongMusic === false) {
            const path = props.computedMatch.params.name;
            const index = listPlaylist.findIndex((item) => item.name === path);
            if (index !== -1) {
                list = listPlaylist[index].list_song;
            }
        }
        const lastSong = list[list.length - 1];
        let index = list.findIndex((item) => item?._id === musicDetail?._id);
        if (index !== -1) {
            if (shuffle) {
                const random = Math.floor(Math.random() * 10);
                dispatch({
                    type: SONG_MUSIC_DETAIL,
                    musicDetail: list[random],
                    typeSongMusic: typeSongMusic,
                });
            } else if (list[index]._id === lastSong._id) {
                console.log('Day la bai hat cuoi cung');
                return;
            } else {
                dispatch({
                    type: SONG_MUSIC_DETAIL,
                    musicDetail: list[index + 1],
                    typeSongMusic: typeSongMusic,
                });
            }
        }
    };

    useEffect(() => {
        audioRef.current.volume = volume / 100;
    }, [volume]);

    const handleChangeVolume = (e) => {
        setVolume(e.target.value);
    };

    const handleDownload = () => {
        const download = musicDetail.audio.split('upload');
        const urlDownload = `${download[0]}/upload/fl_attachment${download[1]}`;
        setDownload(urlDownload);
    };

    return (
        <div
            className='footer flex px-4 justify-between w-full items-center'
            style={{
                background:
                    'url(https://i.pinimg.com/originals/aa/4a/16/aa4a16851449aa6155f36686013bbb81.png)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <div
                style={{ width: '30%' }}
                className='flex footer__left items-center transform translate-x-5 transition-all duration-500 '
            >
                <div className='rounded-full border-2 border-white'>
                    <animated.img
                        className='rounded-full imgDetails'
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '';
                        }}
                        src={musicDetail?.thumbnail}
                        alt=''
                        style={audio.play ? spring : {}}
                    ></animated.img>
                </div>
                <div className='ml-3'>
                    <p className='text-white font-semibold'>{musicDetail?.name}</p>
                    <p className='text-white opacity-60 hover:text-pink-500 hover:opacity-100'>
                        {musicDetail?.artists_names}
                    </p>
                </div>
                <div className='flex text-white footer__button justify-center'>
                    <button
                        style={{ padding: '20px' }}
                        onClick={() => {
                            setLike(!like);
                        }}
                    >
                        <i className={`fa fa-heart ${like ? 'text-pink-500' : ''}`}></i>
                    </button>
                    {!toggleLyric && (
                        <button
                            style={{ padding: '5px', fontSize: '20px' }}
                            onClick={() => {
                                dispatch({
                                    type: GLOBALTYPES.OPEN_LYRIC,
                                    payload: { toggleLyric: true },
                                });
                            }}
                        >
                            <i className={`fa fa-angle-up `}></i>
                        </button>
                    )}
                </div>
            </div>
            <div className='footer__center flex flex-col flex-grow'>
                <div className='flex text-white footer__button justify-center'>
                    <button
                        className='btn_like'
                        onClick={() => {
                            setShuffle(!shuffle);
                        }}
                    >
                        <i className={`fa fa-random ${shuffle ? 'text-pink-500' : ''}`}></i>
                    </button>
                    <button
                        onClick={() => {
                            changeSong(-1);
                        }}
                    >
                        <i className='fa fa-angle-double-left'></i>
                    </button>
                    <button
                        className='button__play'
                        onClick={() => {
                            if (audio.play) {
                                audioRef.current.pause();
                            } else {
                                audioRef.current.play();
                            }
                            setAudio({
                                ...audio,
                                play: !audio.play,
                            });
                        }}
                    >
                        {' '}
                        <i className={`fa fa-${audio.play ? 'pause' : 'play'}`}></i>{' '}
                    </button>
                    <button
                        onClick={() => {
                            let list = listSongMusic;
                            if (shuffle === true) {
                                const random = Math.floor(Math.random() * 10);
                                dispatch({
                                    type: SONG_MUSIC_DETAIL,
                                    musicDetail: list[random],
                                    typeSongMusic: typeSongMusic,
                                });
                            } else {
                                changeSong(1);
                            }
                        }}
                    >
                        <i className='fa fa-angle-double-right'></i>
                    </button>
                    <button
                        onClick={() => {
                            setLoop(!loop);
                        }}
                    >
                        <i className={`fa fa-redo ${loop ? 'text-pink-500' : ''}`}></i>
                    </button>
                </div>
                <div className='flex flex-1 text-white mt-2'>
                    <span className='cursor-default'>
                        {' '}
                        {moment.utc(timeSong * 1000).format('mm:ss')}{' '}
                    </span>

                    <input
                        ref={myInput}
                        onChange={(e) => {
                            //    duration 100% , changeValue => value = x%
                            audioRef.current.currentTime = e.target.value;
                            setTimeSong(e.target.value);
                        }}
                        type='range'
                        className='w-full mx-2'
                        id='myRange'
                        style={{
                            background: `linear-gradient(to right , white ${
                                (timeSong / duration) * 100
                            }% , hsla(0,0%,100%,0.3) ${100 % -((timeSong / duration) * 100)}%`,
                        }}
                        min={0}
                        max={duration}
                        value={timeSong}
                    ></input>
                    <span>{moment.utc(duration * 1000).format('mm:ss')}</span>
                </div>
                {loop ? (
                    <audio
                        autoPlay
                        loop
                        ref={audioRef}
                        src={audio.source}
                        onLoadedData={handleLoadedData}
                        onTimeUpdate={() => setTimeSong(audioRef.current.currentTime)}
                        onEnded={handleEnded}
                    />
                ) : (
                    <audio
                        autoPlay
                        ref={audioRef}
                        src={audio.source}
                        onLoadedData={handleLoadedData}
                        onTimeUpdate={() => setTimeSong(audioRef.current.currentTime)}
                        onEnded={handleEnded}
                    />
                )}
            </div>
            <div style={{ width: '30%' }} className='footer__right flex justify-end text-white'>
                <button onClick={() => handleDownload()}>
                    <a href={download} download>
                        <i className='fa fa-download'></i>
                    </a>
                </button>
                <button className='footer__right__button'>
                    <i className='fa fa-film '></i>
                </button>

                <div>
                    <input
                        // ref={audioRef}
                        type='range'
                        className='mx-2 mt-3'
                        id='myRange'
                        onChange={handleChangeVolume}
                        step='1'
                        value={volume}
                        min='0'
                        max='100'
                    ></input>
                </div>

                <button className='footer__right__button'>
                    <i className='fa fa-volume-up'></i>
                </button>
            </div>
        </div>
    );
}
