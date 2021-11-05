import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RankItem } from '../../Redux/action/rankAction';
import MusicItemView from '../MusicItemView/index';

Rank.propTypes = {};

function Rank(props) {
    const { rankReducer } = useSelector((state) => state);  
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(RankItem);
    }, [dispatch]);

    const renderDataView = (arr) => {
        return arr.map((item, index) => {
            return (
                <div key={index} className="p-3">
                    <MusicItemView item={item}></MusicItemView>
                    <div className="w-full">
                        <p
                            className="mt-2 font-bold  hover:text-pink-500"
                            style={{ fontSize: '15px' }}
                        >
                            {item.title}
                        </p>
                        <p
                            className=" hover:text-pink-500 opacity-60 hover:opacity-100"
                            style={{ fontSize: '13px', marginTop: '2px' }}
                        >
                            {item.author}
                        </p>
                    </div>
                </div>
            );
        });
    };

    return (
        <div
            className="khamPhaContent"
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
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">Top Nổi Bật</h3>
                <div className="flex">{renderDataView(rankReducer.slice(0, 5))}</div>
            </div>
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">Top V-Pop</h3>
                <div className="flex">{renderDataView(rankReducer.slice(5, 10))}</div>
            </div>
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">Top US - UK</h3>
                <div className="flex">{renderDataView(rankReducer.slice(15, 20))}</div>
            </div>
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">Top K- Pop</h3>
                <div className="flex">{renderDataView(rankReducer.slice(10, 15))}</div>
            </div>
        </div>
    );
}

export default Rank;
