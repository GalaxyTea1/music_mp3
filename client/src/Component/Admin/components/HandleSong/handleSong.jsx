import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSongAccept, handleAccept, handleRefuse } from 'Redux/action/handleAcceptAction';

export default function HandleSong() {
    const dispatch = useDispatch();
    const { authReducer, acceptReducer } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getSongAccept());
    }, [dispatch]);

    const handleSubmit = (item) => {
        dispatch(handleAccept({ item, authReducer }));
    };

    const handleDeny = (_id) => {
        dispatch(handleRefuse({ _id, authReducer }));
    };

    return (
        <div className='' style={{ backgroundColor: '#e6e1d5', color: 'black', marginTop: '40px' }}>
            <table className='table_check'>
                <tr>
                    <th>Tên bài hát</th>
                    <th>Tên ca sĩ</th>
                    <th>Đường dẫn</th>
                    <th>Thời lượng</th>
                    <th>Chấp nhận</th>
                    <th>Từ chối</th>
                </tr>
                {acceptReducer &&
                    acceptReducer.getSongAccept.map((item) => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.artists_names}</td>
                            <td>{item.audio}</td>
                            <td>{item.duration}</td>
                            <td>
                                <button onClick={() => handleSubmit(item)}>Chấp nhận</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeny(item._id)}>Từ chối</button>
                            </td>
                        </tr>
                    ))}
            </table>
        </div>
    );
}
