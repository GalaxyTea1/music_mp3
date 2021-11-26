import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { getSongDetailAction } from '../../../Redux/action/ListMusicAction';
import { useSpring, animated } from 'react-spring';
import moment from 'moment';

export default function Footer(props) {
    const [volume, setVolume] = useState(50);
    const audioRef = useRef(null);
    const myInput = useRef(null);
    const [timeSong, setTimeSong] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loop, setLoop] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const dispatch = useDispatch();

    let { listSong, songDetail, typeSong } = useSelector((state) => state.SongReducer);
    const { listPlaylist } = useSelector((state) => state.PlaylistReducer);
    const changeSong = (thamSo, list = listSong) => {
        if (typeSong === false) {
            const path = props.computedMatch.params.name;
            const index = listPlaylist.findIndex((item) => item.name === path);
            if (index !== -1) {
                list = listPlaylist[index].listBaiHat;
            }
        }
        const lastSong = list[list.length - 1];
        //tim bai dang phat (songDetail) trong list;
        //neu nhu bai nay la index thu = (index = 0) return; ko lam gi ca
        const index = list.findIndex((item) => item.id === songDetail.id);
        let nowSong = {};
        if (index !== -1) {
            if (thamSo === 1) {
                if (list[index].id === lastSong.id) {
                    return dispatch(getSongDetailAction(list[0], typeSong));
                } else {
                    nowSong = list[index + thamSo];
                }
            } else if (thamSo === -1) {
                if (index === 0) {
                    // console.log('Day la bai dau tien');
                    return dispatch(getSongDetailAction(list[99], typeSong));
                } else {
                    nowSong = list[index + thamSo];
                }
            } else {
                return;
            }
        }
        dispatch(getSongDetailAction(nowSong, typeSong));
    };

    useEffect(() => {
        audioRef.current.volume = volume / 100;
    });

    useEffect(() => {
        if (songDetail.source !== undefined) {
            updateSong(`https://vnso-qt-3-tf-${songDetail.source['128']?.slice(2)}`);
            audioRef.current.play();
        }
    }, [songDetail]);

    // useEffect(() => {
    //     updateSong(`${songDetail.audio}`);
    //     audioRef.current.play();
    // }, [songDetail]);

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
        // audioRef.current.play()
    };
    const handleEnded = () => {
        let list = listSong;
        setAudio({
            ...audio,
            play: false,
        });
        audioRef.current.pause();
        if (typeSong === false) {
            const path = props.computedMatch.params.name;
            const index = listPlaylist.findIndex((item) => item.name === path);
            if (index !== -1) {
                list = listPlaylist[index].listBaiHat;
            }
        }
        const lastSong = list[list.length - 1];
        let index = list.findIndex((item) => item.id === songDetail.id);
        if (index !== -1) {
            if (shuffle) {
                const random = Math.floor(Math.random() * 100);
                dispatch(getSongDetailAction(list[random], typeSong));
            } else if (list[index].id === lastSong.id) {
                console.log('Day la bai hat cuoi cung');
                return;
            } else {
                dispatch(getSongDetailAction(list[index + 1], typeSong));
            }
        }
    };

    const handleChangeVolume = (e) => {
        setVolume(e.target.value);
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
                        src={songDetail?.thumbnail}
                        alt=''
                        style={audio.play ? spring : {}}
                    ></animated.img>
                </div>
                <div className='ml-3'>
                    <p className='text-white font-semibold'>{songDetail?.name}</p>
                    <p className='text-white opacity-60 hover:text-pink-500 hover:opacity-100'>
                        {songDetail?.artists_names}
                    </p>
                </div>
            </div>
            <div className='footer__center flex flex-col flex-grow'>
                <div className='flex text-white footer__button justify-center'>
                    <button
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
                            let list = listSong;
                            if (shuffle === true) {
                                const random = Math.floor(Math.random() * 100);
                                dispatch(getSongDetailAction(list[random], typeSong));
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
                <button className='footer__right__button'>
                    <i className='fa fa-film '></i>
                </button>

                <div>
                    <input
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
