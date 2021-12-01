import { useEffect, useState } from 'react';
import React from 'react';
import { getDataAPI } from '../../../../api/postApi';
import { useDispatch, useSelector } from 'react-redux';
import { handleAccept, handleRefuse } from 'Redux/action/handleAcceptAction';

export default function HandleSong() {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const { authReducer } = useSelector((state) => state);
    useEffect(async () => {
        const res = await getDataAPI('handlesong');
        setData(res.data.handlesong);
    }, []);
    const handleSubmit = (item) => {
        dispatch(handleAccept({ item, authReducer }));
    };

    const handleDeny = (_id) => {
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
                {data.map((item) => (
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
