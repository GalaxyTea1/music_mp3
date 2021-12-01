import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SONG_MUSIC_DETAIL } from 'Redux/type/Music';
import { getSongAction } from '../../Redux/action/ListMusicAction';

export default function MusicItem(props) {
    const { musicDetail, typeSongMusic } = useSelector((state) => state.detailReducer);
    const dispatch = useDispatch();
    const { item, index, listSong } = props;

    useEffect(() => {
        if (item?._id === listSong[0]?._id) {
            dispatch(getSongAction(listSong[0]));
        }
    }, []);
    let classActive = '';
    if (musicDetail?._id === item?._id) {
        classActive = 'activeBgPink';
    }
    return (
        <div
            className={`flex items-center rounded-md p-2 cursor-pointer media  ${classActive}`}
            key={index}
            onClick={() => {
                dispatch({
                    type: SONG_MUSIC_DETAIL,
                    musicDetail: item,
                    typeSongMusic: true,
                });
            }}
        >
            <div className='flex items-center'>
                <div>
                    <img
                        style={{ width: '40px', height: '40px' }}
                        src={item?.thumbnail}
                        alt={item?.title}
                    ></img>
                </div>
                <div className='ml-2'>
                    <p className='opacity-80 media__text'>{item?.name}</p>
                    <p className='opacity-60 text-xs hover:text-pink-500 hover:opacity-100'>
                        {item?.artists_names}
                    </p>
                </div>
            </div>
        </div>
    );
}
