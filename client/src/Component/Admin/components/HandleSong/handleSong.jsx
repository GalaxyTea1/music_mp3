import { useEffect, useState } from 'react';
import React from 'react';
import { getDataAPI } from '../../../../api/postApi';
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
        console.log(item);
    };

    const handleDeny = (_id) => {
        console.log(_id);
        dispatch(handleRefuse({ _id, authReducer }));
    };

    return (
        <div className='' style={{ backgroundColor: 'green', color: 'black', marginTop: '40px' }}>
            <table className='table_check'>
                <tr>
                    <th>Name</th>
                    <th>Artist Name</th>
                    <th>Url</th>
                    <th>Duration</th>
                    <th>Check</th>
                    <th>Refuse</th>
                </tr>
                {acceptReducer &&
                    acceptReducer.getSongAccept.map((item) => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.artists_names}</td>
                            <td>{item.audio}</td>
                            <td>{item.duration}</td>
                            <td>
                                <button onClick={() => handleSubmit(item)}>Accept</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeny(item._id)}>Refuse</button>
                            </td>
                        </tr>
                    ))}
            </table>
        </div>
    );
}
