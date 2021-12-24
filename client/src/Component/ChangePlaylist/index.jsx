import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { putPlaylist } from 'Redux/action/handlePlaylist';
import { CHANGE_PLAYLIST, CLOSE_MODAL } from '../../Redux/type/Music';

export default function ChangePlaylist(props) {
    const playlistRef = useRef(null);
    const myFormRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const [valueInput, setValue] = useState({
        tenPlaylist: props.namePlaylist,
    });
    const { listPlaylist } = useSelector((state) => state.PlaylistReducer);

    const findThisPlaylist = () => {
        let index = listPlaylist?.findIndex((item) => item.name === props.namePlaylist);
        let thisPlayList;
        if (index !== -1) {
            thisPlayList = listPlaylist[index];
        }
        return thisPlayList;
    };

    const thisPlayList = findThisPlaylist();

    const handleOutSideClick = (e) => {
        const { target } = e;
        if (playlistRef.current && !playlistRef.current.contains(target)) {
            dispatch({
                type: CLOSE_MODAL,
            });
            document.removeEventListener('mousedown', handleOutSideClick);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutSideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutSideClick);
        };
    });

    const handleSubmit = (item) => {
        const result = item.list_song.map((item) => item._id);
        const _id = item._id;
        const newItem = {
            name: valueInput.tenPlaylist,
            list_song_id: result,
        };
        dispatch(putPlaylist({ _id, newItem }));
        dispatch({
            type: CHANGE_PLAYLIST,
            newPlaylist: {
                oldName: props.namePlaylist,
                newName: valueInput.tenPlaylist,
            },
        });
        myFormRef.current.reset();
        // history.push(`/playlist/${valueInput.tenPlaylist}`);
        history.push('/');
        document.removeEventListener('mousedown', handleOutSideClick);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue({
            [name]: value,
        });
    };
    return (
        <div ref={playlistRef} className='createPlaylist'>
            <p>Sửa Playlist</p>
            <div>
                <form ref={myFormRef}>
                    <input
                        name='tenPlaylist'
                        placeholder='Nhập tên playlist'
                        onChange={handleChange}
                        value={valueInput.tenPlaylist}
                    ></input>
                </form>
            </div>
            <div>
                {valueInput.tenPlaylist === '' || valueInput.tenPlaylist.trim() === '' ? (
                    <button disabled style={{ opacity: '0.6', cursor: 'not-allowed' }}>
                        Sửa
                    </button>
                ) : (
                    <button type='submit' value='Submit' onClick={() => handleSubmit(thisPlayList)}>
                        Sửa
                    </button>
                )}
            </div>
        </div>
    );
}
