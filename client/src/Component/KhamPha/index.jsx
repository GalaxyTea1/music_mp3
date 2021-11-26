import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Discovery } from '../../Redux/action/discoveryAction';
import { Radio } from '../../Redux/action/radioAction';
import MusicItemView from '../MusicItemView/index';
import MusicRadio from '../MusicRadio/index';

export default function KhamPha() {
    const { discoveryReducer } = useSelector((state) => state);
    const { radioReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Discovery);
    }, [dispatch]);

    useEffect(() => {
        dispatch(Radio);
    }, [dispatch]);

    const [state, setState] = useState({
        data: [
            {
                img: 'https://photo-zmp3.zadn.vn/banner/9/e/b/8/9eb887766e03136ef29ddfbd5ab65b3e.jpg',
            },
            {
                img: 'https://photo-zmp3.zadn.vn/banner/b/3/a/d/b3adbbe553960803f6ba9b50b546eb29.jpg',
            },
            {
                img: 'https://photo-zmp3.zadn.vn/banner/a/4/d/4/a4d4980f2f733119130b5801ce918ff7.jpg',
            },
            {
                img: 'https://photo-zmp3.zadn.vn/banner/4/b/5/4/4b549370f861cb3ec896ddd78e4da4e4.jpg',
            },
            {
                img: 'https://photo-zmp3.zadn.vn/banner/3/2/d/2/32d2b1792b994ba4d21689760fe7c48e.jpg',
            },
            {
                img: 'https://photo-zmp3.zadn.vn/banner/b/5/f/0/b5f01f1f22b937a469f23ab6c1496608.jpg',
            },
        ],

        show1Index: 1,
        show2Index: 2,
        show3Index: 3,
        none1Index: 4,
        none2Index: 5,
        none3Index: 6,
    });

    const changeSlide = () => {
        setState({
            ...state,
            show1Index: ++state.show1Index > 6 ? 1 : state.show1Index++,
            show2Index: ++state.show2Index > 6 ? 1 : state.show2Index++,
            show3Index: ++state.show3Index > 6 ? 1 : state.show3Index++,
            none1Index: ++state.none1Index > 6 ? 1 : state.none1Index++,
            none2Index: ++state.none2Index > 6 ? 1 : state.none2Index++,
            none3Index: ++state.none3Index > 6 ? 1 : state.none3Index++,
        });
    };

    const changeSlide2 = () => {
        setState({
            ...state,
            show1Index: --state.show1Index < 1 ? 6 : state.show1Index--,
            show2Index: --state.show2Index < 1 ? 6 : state.show2Index--,
            show3Index: --state.show3Index < 1 ? 6 : state.show3Index--,
            none1Index: --state.none1Index < 1 ? 6 : state.none1Index--,
            none2Index: --state.none2Index < 1 ? 6 : state.none2Index--,
            none3Index: --state.none3Index < 1 ? 6 : state.none3Index--,
        });
    };

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
    const renderData = () => {
        return state.data.map((item, index) => {
            let classActive = '';
            if (index + 1 === state.show1Index) {
                classActive = 'show1';
            } else if (index + 1 === state.show2Index) {
                classActive = 'show2';
            } else if (index + 1 === state.show3Index) {
                classActive = 'show3';
            } else if (index + 1 === state.none1Index) {
                classActive = 'hide1';
            } else if (index + 1 === state.none2Index) {
                classActive = 'hide2';
            } else if (index + 1 === state.none3Index) {
                classActive = 'hide3';
            }
            return (
                <div key={index} className={`itemGallary ${classActive}`}>
                    <img src={item.img} alt={index} className='p-3'></img>
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
            <div className='mt-14'>
                <div className='gallery pt-6'>
                    <div className='gallery-content flex w-full '>
                        {renderData()}
                        <button
                            className='galleryButton btn2'
                            onClick={() => {
                                changeSlide();
                            }}
                        >
                            <i className='fa fa-arrow-right'></i>
                        </button>
                        <button
                            className='galleryButton btn1'
                            onClick={() => {
                                changeSlide2();
                            }}
                        >
                            <i className='fa fa-arrow-left'></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className='ngheGanDay mt-3'>
                <h3 className='px-3 mt-4 text-xl font-bold'>Nghe Gần Đây</h3>
                <div className='flex'>{renderDataView(discoveryReducer.slice(0, 5))}</div>
            </div>

            <div className='ngheGanDay mt-3'>
                <h3 className='px-3 mt-4 text-xl font-bold'>Có Thể Bạn Sẽ Thích</h3>
                <div className='flex'>{renderDataView(discoveryReducer.slice(5, 10))}</div>
            </div>
            <div className='ngheGanDay mt-3'>
                <h3 className='px-3 mt-4 text-xl font-bold'>Nhạc Hay Nghe Ngay</h3>
                <div className='flex'>{renderDataView(discoveryReducer.slice(15, 20))}</div>
            </div>
            <div className='ngheGanDay mt-3'>
                <h3 className='px-3 mt-4 text-xl font-bold'>XONE's CORNER</h3>
                <div className='flex'>{renderDataView(discoveryReducer.slice(10, 15))}</div>
            </div>
            <div className='ngheGanDay mt-3'>
                <h3 className='px-3 mt-4 text-xl font-bold'>RADIO NỔI BẬT</h3>
                <div className='flex radioContent flex-wrap'>{renderRadio(radioReducer)}</div>
            </div>
            <div className='ngheGanDay mt-3'>
                <h3 className='px-3 mt-4 text-xl font-bold'>Mix Riêng Cho Bạn</h3>
                <div className='flex'>{renderDataView(discoveryReducer.slice(20, 24))}</div>
            </div>
            <div className='ngheGanDay mt-3'>
                <h3 className='px-3 mt-4 text-xl font-bold'>Nhạc Mới Mỗi Ngày</h3>
                <div className='flex'>{renderDataView(discoveryReducer.slice(24, 30))}</div>
            </div>
        </div>
    );
}
