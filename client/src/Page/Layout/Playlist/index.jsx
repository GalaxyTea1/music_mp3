import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getPlaylist, handlePlaylist, removePlaylist } from 'Redux/action/handlePlaylist';
import ChangePlaylist from '../../../Component/ChangePlaylist/index';
import PlaylistItem from '../../../Component/PlaylistItem/index';
import { OPEN_MODAL, REMOVE_PLAYLIST } from '../../../Redux/type/Music';

export default function Playlist(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const { authReducer } = useSelector((state) => state);
    const { listSongMusic } = useSelector((state) => state.detailReducer);
    const { listPlaylist } = useSelector((state) => state.PlaylistReducer);
    const { getList } = useSelector((state) => state.getListReducer);
    useEffect(() => {
        dispatch(getPlaylist);
    }, [dispatch]);

    const findThisPlaylist = () => {
        let index = listPlaylist?.findIndex((item) => item.name === props.match.params.name);
        let thisPlayList;
        if (index !== -1) {
            thisPlayList = listPlaylist[index];
        }
        return thisPlayList;
    };
    const thisPlayList = findThisPlaylist();

    const newArr = listSongMusic.filter((item) => {
        return !thisPlayList?.list_song?.includes(item);
    });
    const check = thisPlayList?.list_song;
    let result = newArr.filter((o1) => !check?.some((o2) => o1.name === o2.name));
    const newList = result.filter((item) => {
        return !thisPlayList?.list_song?.includes(item);
    });

    const show = getList.filter((item) => item?.name === thisPlayList?.name);

    const renderListSongMusicRandom = () => {
        return newList?.slice(0, 6).map((item, index) => {
            return (
                <div key={index} className='baiHatGoiY_item'>
                    <PlaylistItem
                        item={item}
                        namePlaylist={props.match.params.name}
                        type={true}
                    ></PlaylistItem>
                </div>
            );
        });
    };

    const renderBaihatPlaylist = () => {
        const { list_song } = thisPlayList;
        return list_song.map((item, index) => {
            return (
                <div key={index}>
                    <PlaylistItem
                        item={item}
                        namePlaylist={props.match.params.name}
                        type={false}
                    ></PlaylistItem>
                </div>
            );
        });
    };

    const handleSubmit = (item) => {
        const result = item.list_song.map((item) => item._id);
        const newItem = {
            name: item.name,
            list_song_id: result,
        };
        const data = {
            item: newItem,
            authReducer: authReducer,
        };
        dispatch(handlePlaylist(data));
        history.push('/');
    };

    const handleRemove = (_id) => {
        dispatch(removePlaylist(_id));
        history.push('/');
    };
    return (
        <div
            className='playlist_content'
            onScroll={(e) => {
                const header = e.target.previousSibling.style;
                if (e.target.scrollTop > 80) {
                    Object.assign(header, {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
                        zIndex: '100',
                    });
                } else {
                    Object.assign(header, {
                        backgroundColor: '',
                        boxShadow: '',
                    });
                }
            }}
        >
            <div className='playlist_left'>
                <img
                    src='https://wallpaperstock.net/wallpapers/thumbs1/35827hd.jpg'
                    alt='imgDefault'
                    style={{ borderRadius: '8px' }}
                ></img>
                <div className='playlist_leftText mt-3 text-center font-semibold text-2xl'>
                    {props.match.params.name}
                </div>
                <div className='flex justify-center items-center'>
                    <p className='text-center text-xs opacity-60 mr-1'>Được tạo bởi: </p>
                    <span className='text-xs'>User {props.match.params.name}</span>
                </div>
                <p className='text-center text-xs opacity-60 mt-1'>Công khai </p>
                <div className='flex justify-between items-center playlist_btn'>
                    {show.length > 0 ? (
                        <button
                            className='mt-0 mr-2'
                            onClick={() => handleRemove(thisPlayList._id)}
                        >
                            Xóa Playlist
                        </button>
                    ) : (
                        ''
                    )}
                    {show.length > 0 ? (
                        <button
                            className='mt-0 ml-2'
                            onClick={() => {
                                dispatch({
                                    type: OPEN_MODAL,
                                    Component: (
                                        <ChangePlaylist
                                            namePlaylist={props.match.params.name}
                                        ></ChangePlaylist>
                                    ),
                                });
                            }}
                        >
                            Sửa Playlist
                        </button>
                    ) : (
                        ''
                    )}
                    {show.length <= 0 ? (
                        <button className='mt-0 ml-2' onClick={() => handleSubmit(thisPlayList)}>
                            Lưu Playlist
                        </button>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div className='playlist_right'>
                <div className='container'>
                    <div className='playlist_listBaiHat'>
                        {thisPlayList && thisPlayList.list_song.length > 0 ? (
                            renderBaihatPlaylist()
                        ) : (
                            <div className='container_listBaiHat flex items-center justify-center'>
                                <div className='text-center opacity-60'>
                                    <span className='text-6xl'>
                                        <i class='fa fa-music'></i>
                                    </span>
                                    <p className='mt-3 text-lg'>
                                        Không có bài hát trong playlist của bạn
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='playlist_goiY mt-5'>
                        <p className='text-xl font-semibold capitalize'>Bài hát gợi ý</p>
                        <p className='opacity-60 text-sm'>Random Songs</p>
                        <div className='container_listBaiHatGoiY mt-3'>
                            {renderListSongMusicRandom()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
