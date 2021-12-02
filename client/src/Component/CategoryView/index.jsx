import { getDataAPI } from 'api/postApi';
import CategoryView from 'Page/Layout/CategoryViewItem';
import ListSong from 'Page/Layout/ListSong';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Category } from 'Redux/action/categoryAction';
import { getListAction } from 'Redux/action/ListMusicAction';
import { GLOBALTYPES } from 'Redux/type/globalType';

Category2.propTypes = {};

function Category2(props) {
    const dispatch = useDispatch();
    useEffect(async () => {
        dispatch(getListAction());
        dispatch(Category);
        const res = await getDataAPI('song');
        dispatch({ type: GLOBALTYPES.GET_SONG_MUSIC, payload: res });
    }, []);

    return (
        <div>
            <div className='content'>
                <CategoryView></CategoryView>
            </div>
            <div style={{ position: 'absolute !important', left: '1200px !important' }}>
                <ListSong></ListSong>
            </div>
        </div>
    );
}

export default Category2;
