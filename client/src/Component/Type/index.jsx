import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Category } from '../../Redux/action/categoryAction';
import MusicItemView from '../MusicItemView/index';

Type.propTypes = {};

function Type(props) {
    const { categoryList } = useSelector((state) => state.categoryReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Category);
    }, [dispatch]);

    const renderDataView = (arr) => {
        return arr.map((item, index) => {
            return (
                <Link to={`/categoryview/${item._id}`}>
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
                </Link>
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
            style={{ marginTop: '50px' }}
        >
            <div className='ngheGanDay mt-3'>
                <h3 className='px-3 mt-4 text-xl font-bold'>MOTIVATION</h3>
                <div className='flex'>{renderDataView(categoryList.slice(0, 5))}</div>
            </div>
            <div className='ngheGanDay mt-3'>
                <h3 className='px-3 mt-4 text-xl font-bold'>TÌNH YÊU</h3>
                <div className='flex'>{renderDataView(categoryList.slice(5, 10))}</div>
            </div>
            <div className='ngheGanDay mt-3'>
                <h3 className='px-3 mt-4 text-xl font-bold'>TẬP TRUNG</h3>
                <div className='flex'>{renderDataView(categoryList.slice(10, 15))}</div>
            </div>
            <div className='ngheGanDay mt-3'>
                <h3 className='px-3 mt-4 text-xl font-bold'>NGỦ NGON</h3>
                <div className='flex'>{renderDataView(categoryList.slice(15, 20))}</div>
            </div>
            <div className='ngheGanDay mt-3'>
                <h3 className='px-3 mt-4 text-xl font-bold'>WORKOUT</h3>
                <div className='flex'> </div>
            </div>
        </div>
    );
}

export default Type;
