/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

export default function AlbumView() {
    const [item, setItem] = useState([]);
    const { discoveryList } = useSelector((state) => state.discoveryReducer);
    const { id } = useParams();

    useEffect(() => {
        const newArg = discoveryList?.filter((item) => {
            return item?._id === id;
        });
        setItem(newArg);
    }, [discoveryList]);

    return (
        <div>
            {item?.map((value) => (
                <div className='albumItem'>
                    <div className='album-image'>
                        <img src={value?.image} alt='album'></img>
                    </div>
                    <div className='item'>
                        <span>
                            <p
                                className='mt-2 font-bold  hover:text-pink-500'
                                style={{ fontSize: '15px' }}
                            >
                                {value?.title}
                            </p>
                        </span>
                        <span>
                            <p
                                className='mt-2 font-italic  hover:text-pink-500'
                                style={{ fontSize: '15px' }}
                            >
                                {value?.author}
                            </p>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
