import { getDataAPI } from 'api/postApi';
import AlbumView from 'Page/Layout/AlbumViewItem';
import ListSong from 'Page/Layout/ListSong';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Discovery } from 'Redux/action/discoveryAction';
import { getListAction } from 'Redux/action/ListMusicAction';
import { GLOBALTYPES } from 'Redux/type/globalType';

Album.propTypes = {};

function Album(props) {
    const dispatch = useDispatch();
    useEffect(async () => {
        dispatch(getListAction());
        dispatch(Discovery);
        const res = await getDataAPI('song');
        dispatch({ type: GLOBALTYPES.GET_SONG_MUSIC, payload: res });
    }, []);

    return (
        <div>
            <div className='content'>
                <AlbumView></AlbumView>
            </div>
            <div style={{ position: 'absolute !important', left: '1200px !important' }}>
                <ListSong></ListSong>
            </div>
        </div>
    );
}

export default Album;
