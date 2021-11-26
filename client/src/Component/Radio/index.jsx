import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from '../../Redux/action/radioAction';
import { radioView } from '../../Redux/action/radioViewAction';
import MusicItemView from '../MusicItemView/index';
import MusicRadio from '../MusicRadio/index';

RadioPage.propTypes = {};

function RadioPage(props) {
    const { radioReducer } = useSelector((state) => state);
    const { radioViewReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Radio);
    }, [dispatch]);

    useEffect(() => {
        dispatch(radioView);
    }, [dispatch]);

    const renderDataView = (arr) => {
        return arr.map((item, index) => {
            return (
                <div key={index} className='p-3'>
                    <MusicItemView item={item}></MusicItemView>
                    <div className='w-full'>
                        <p
                            className='mt-2 font-bold  hover:text-pink-500'
                            style={{ fontSize: '15px' }}
                        >
                            {item.title}
                        </p>
                        <p
                            className=' hover:text-pink-500 opacity-60 hover:opacity-100'
                            style={{ fontSize: '13px', marginTop: '2px' }}
                        >
                            {item.author}
                        </p>
                    </div>
                </div>
            );
        });
    };

    const renderRadio = (arr) => {
        return arr.map((item, index) => {
            return (
                <div key={index} className='p-2'>
                    <MusicRadio item={item}></MusicRadio>
                    <div className='w-full flex items-center justify-center flex-col mt-3'>
                        <p className='font-bold text-lg cursor-pointer hover:text-pink-500'>
                            {item.title}
                        </p>
                        <span className='text-xs opacity-60'>{item.listen} đang nghe</span>
                    </div>
                </div>
            );
        });
    };

    return (
        <div
            className='khamPhaContent'
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
            <div className='ngheGanDay mt-3' style={{ marginTop: '100px' }}>
                <h3 className='px-3 mt-4 text-xl font-bold'>RADIO NỔI BẬT</h3>
                <div className='flex radioContent flex-wrap'>{renderRadio(radioReducer)}</div>

                <div className='ngheGanDay mt-3'>
                    <h3 className='px-3 mt-4 text-xl font-bold'>XONE Radio</h3>
                    <div className='flex'>{renderDataView(radioViewReducer.slice(0, 5))}</div>
                </div>
                <div className='ngheGanDay mt-3'>
                    <h3 className='px-3 mt-4 text-xl font-bold'>Vietcetera</h3>
                    <div className='flex'>{renderDataView(radioViewReducer.slice(5, 10))}</div>
                </div>
                <div className='ngheGanDay mt-3'>
                    <h3 className='px-3 mt-4 text-xl font-bold'>On Air</h3>
                    <div className='flex'>{renderDataView(radioViewReducer.slice(10, 15))}</div>
                </div>
                <div className='ngheGanDay mt-3'>
                    <h3 className='px-3 mt-4 text-xl font-bold'>XONE's CORNER</h3>
                    <div className='flex'>{renderDataView(radioViewReducer.slice(15, 20))}</div>
                </div>
            </div>
        </div>
    );
}

export default RadioPage;
