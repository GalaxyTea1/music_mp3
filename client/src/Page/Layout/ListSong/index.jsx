/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RANDOM_LIST_MUSIC } from 'Redux/type/Music';
import MusicItem from '../../../Component/MusicItem/index';
import { getListAction } from '../../../Redux/action/ListMusicAction';

export default function ListSong() {
    const { listSongMusic, listRandomMusic } = useSelector((state) => state.detailReducer);
    console.log(listSongMusic);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListAction());
    }, []);
    useEffect(() => {
        if (listSongMusic.length > 0) {
            dispatch({ type: RANDOM_LIST_MUSIC });
            if (listRandomMusic.length > 0) {
                setState({
                    listNhac: listRandomMusic,
                    active: true,
                });
            }
        }
    }, [listSongMusic]);

    const [state, setState] = useState({
        listNhac: [],
        active: true,
    });
    const classDSP = state.active ? 'is-active' : '';

    const renderListNhac = () => {
        return state.listNhac?.map((item, index) => {
            return <MusicItem listSong={listRandomMusic} item={item} key={index}></MusicItem>;
        });
    };

    return (
        <div className='listSong'>
            <div className='py-4'>
                <div className='px-2 flex  items-center'>
                    <div className='listSong__tab mr-2'>
                        <div className='flex listSong__content'>
                            <div
                                className={`listSong__items ${classDSP}`}
                                onClick={() => {
                                    setState({
                                        listNhac: listSongMusic,
                                        active: true,
                                    });
                                }}
                            >
                                Danh sách phát
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='listSong__content px-2'>{renderListNhac()}</div>
        </div>
    );
}
