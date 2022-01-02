import { getDataAPI } from 'api/postApi';
import ListSong from 'Page/Layout/ListSong';
import TopView from 'Page/Layout/TopViewItem';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getListAction } from 'Redux/action/ListMusicAction';
import { RankItem } from 'Redux/action/rankAction';
import { GLOBALTYPES } from 'Redux/type/globalType';

Top.propTypes = {};

function Top(props) {
    const dispatch = useDispatch();
    useEffect(async () => {
        dispatch(getListAction());
        dispatch(RankItem);
        const res = await getDataAPI('song');
        dispatch({ type: GLOBALTYPES.GET_SONG_MUSIC, payload: res });
    }, [dispatch]);

    return (
        <div>
            <div className='content'>
                <TopView></TopView>
            </div>
            <div style={{ position: 'absolute !important', left: '1200px !important' }}>
                <ListSong></ListSong>
            </div>
        </div>
    );
}

export default Top;
