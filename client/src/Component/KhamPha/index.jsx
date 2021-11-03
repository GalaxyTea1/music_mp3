import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import MusicItemView from '../MusicItemView/index';
import MusicRadio from '../MusicRadio/index';
import { useDispatch, useSelector } from 'react-redux';
import { Discovery } from '../../Redux/action/discoveryAction';

export default function KhamPha() {
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
        // dataView: [
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/f/4/6/3/f4634af49ba3d2e92b5f0bd3c89cd64f.jpg',
        //         title: 'Thanh Âm Indie Buồn',
        //         author: 'Duongg, buitruonglinh, Changg...',
        //     },
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/c/8/e/4/c8e443a2298cdc1fbeaf1283df27fc90.jpg',
        //         title: 'Tâm Trạng Tan Chậm',
        //         author: 'Phùng Khánh Linh, Orange...',
        //     },
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/e/f/5/b/ef5b1c4ed2643a2d463ed1299548aa2c.jpg',
        //         title: 'Playlist Này Chill Phết',
        //         author: 'Hoàng Tôn, Kha, Mỹ Anh...',
        //     },
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/a/9/3/5/a935203c7dfbb0a374adf1b55b107e2a.jpg',
        //         title: 'Giữ Không Được Thì...',
        //         author: 'Châu Khải Phong, Nhật Phong...',
        //     },
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/3/1/f/f/31ff5e4f3b3ac3723322c1ba441c28cf.jpg',
        //         title: 'Nhạc Việt Hôm Nay Nghe Gì',
        //         author: 'Quân A.P, Orange...',
        //     },

        //     // ===========================================================================

        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/6/b/d/6/6bd6e4c8aec5a99e762710a78f920e8a.jpg',
        //         title: 'Nam Thần Nhạc Việt',
        //         author: 'Quân A.P, Soobin, Khải Đăng...',
        //     },
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/a/0/1/5/a0150a1805d78013821afbf3b0df570d.jpg',
        //         title: 'Những Bản Hit Chậm Nhưng Mà Chắc',
        //         author: 'Hoàng Thùy Linh, Phan Mạnh Quỳnh...',
        //     },
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/3/4/2/f/342f0d0021cf866a111fa31d6e4931aa.jpg',
        //         title: 'Everyday EDM',
        //         author: 'Khởi động mỗi ngày với những ca khúc EDM...',
        //     },
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/0/d/d/f/0ddf5347f0c58fd503380cef6a8b462a.jpg',
        //         title: 'K-Pop Newbie',
        //         author: 'Những hạt giống tiềm năng của K-Pop...',
        //     },
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/d/8/6/9/d8695d7d00848b058ba4ae751925a5cc.jpg',
        //         title: 'Nhạc Anime',
        //         author: 'Nhạc Anime hot nhất ở thời điểm hiện tại...',
        //     },

        //     // ===========================================================================

        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/6/8/5/0/68500d96c5bde3f947bd1f60a641a71e.jpg',
        //         title: "XONE Today's Hits",
        //         author: 'XONE RADIO',
        //     },
        //     {
        //         img: '	https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/6/a/2/f/6a2fd608cf9d65735752ea3306c77b0e.jpg',
        //         title: "XONE's Radar",
        //         author: 'XONE RADIO',
        //     },
        //     {
        //         img: '		https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/3/f/8/e/3f8e25409ad8f440ef2f2c97db0ea96d.jpg',
        //         title: "A's Flavour",
        //         author: 'XONE RADIO',
        //     },
        //     {
        //         img: '		https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/0/1/6/9/01693aa27f33675b0d1b33b77e77f243.jpg',
        //         title: 'Pop Breaker',
        //         author: 'XONE RADIO',
        //     },
        //     {
        //         img: '		https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/c/e/1/4/ce14bd1c509de4019788035dd40c9b45.jpg',
        //         title: 'Asia Tune',
        //         author: 'XONE RADIO',
        //     },

        //     // ===========================================================================
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/a/d/c/e/adce596f4171f145a41e8f18634101d1.jpg',
        //         title: 'Yêu Ai Cũng Vậy Yêu Giùm Anh Đi',
        //         author: 'Hồng Thanh, DJ Mie',
        //     },
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/5/0/f/8/50f8303c0ed3c86162c65910fb1dceec.jpg',
        //         title: 'Vâng Anh Đi Đi',
        //         author: 'Bích Phương',
        //     },
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/d/e/0/6/de06907e687e042fa25bfed0fc66c208.jpg',
        //         title: 'Ta Thương Người Người Chẳng Thương Ta',
        //         author: 'Huy Vạc',
        //     },
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/0/e/0/d/0e0d2b8985fdeb89f126b2290f7e5f47.jpg',
        //         title: 'Bao Lâu Ta Lại Yêu Một Người',
        //         author: 'Doãn Hiếu',
        //     },
        //     {
        //         img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/f/f/b/f/ffbfc53851dc56ad22f6ebb860526d66.jpg',
        //         title: 'Mây Đêm Chờ Mấy Đêm',
        //         author: 'Nguyễn Hữu Kha, CUKAK, B',
        //     },
        // ],
        dataRadio: [
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/a/7/6/2/a762aff660863c7a5ce6eae2055a2598.jpg',
                icon: '	https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/0/8/2/5/0825d8cd559dee502625a25d540c636a.jpg',
                title: 'Xone Radio',
                listen: Math.floor(Math.random() * 1000) + 100,
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/7/d/1/b/7d1b794cbab13d63bf7ac957065774e3.jpg',
                icon: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/8/5/4/0/854010f76bddeefd5f13305a1d6cc8be.jpg',
                title: 'On Air',
                listen: Math.floor(Math.random() * 1000) + 100,
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/c/8/5/b/c85b1ed67eeff74065acade8929ad4e1.jpg',
                icon: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/7/7/8/d/778d152062edfbe0e4c4abf151858bf0.jpg',
                title: 'Chạm',
                listen: Math.floor(Math.random() * 1000) + 100,
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/f/d/7/9/fd79808d2180de9a421afa6aff38953e.jpg',
                icon: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/1/4/6/b/146b49d11cc9b3bc591823bfedb8bce2.jpg',
                title: 'V-POP',
                listen: Math.floor(Math.random() * 1000) + 100,
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/4/8/c/e/48cefd41cfc03533d52303190f47e6ef.jpg',
                icon: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/1/3/0/5/1305cd954d22d89fef4354301613fd68.jpg',
                title: 'Bolero',
                listen: Math.floor(Math.random() * 1000) + 100,
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/d/4/f/f/d4ffcd5734d4dae6266fec08719324f0.jpg',
                icon: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/b/0/d/a/b0da7c8ecd6521337682f3a86fa0170f.jpg',
                title: 'US-UK',
                listen: Math.floor(Math.random() * 1000) + 100,
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/b/c/2/1/bc2115886f2e2e9f7cf2fa28a39cda12.jpg',
                icon: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/c/f/2/4/cf2428f7e56a8c2a52d84cb106891de2.jpg',
                title: 'K-POP',
                listen: Math.floor(Math.random() * 1000) + 100,
            },
        ],
        dataMix: [
            {
                img: 'https://photo-playlist-zmp3.zadn.vn/mixtape?src=HavwqN7EYmrDGr6VBegUMHOLKPiyqPa4KnLJcp_Hcnq23r2PQDF67GWB2iuoWfD83LeAp322maLG2bcJRDVPIKLRLTK-t98B36XEqZBhb41H8bk6QRsKH4DvMTiglST4G7aAn2cXaamMSrtDUVsM6q9pNCqZgyH5I748b2VynqPD8KUSPAtB01yo0CWo-vHQ8t5KoYdxY1iYVG&cv=1&size=thumb/240_240',
                title: '',
                author: 'B Ray,Han Sara,Great,...',
            },
            {
                img: 'https://photo-playlist-zmp3.zadn.vn/s2/mixtape?src=HavwqN7EYmrDGr6VBegUMHOLKPiyqSu411LMcsdHoKe63WB8EuQP6r481CanW9zD2Gu1d3RKdKrP3LQUCjFMH1jVMjXWs9q6Kcn1tsplcqqF9bIBDxcRIHrz0jPtkSr9JtrKodVtp1j8ArkTAQMM5K5u2S0jgfH1HYLSbIwhmn54S4FBRVpFLnPZ19yxgf0DBeAKdJM8W8u3GspzziQgRtq&cv=1&size=thumb/240_240',
                title: '',
                author: 'Lê Bảo Bình',
            },
            {
                img: 'https://photo-playlist-zmp3.zadn.vn/s2/mixtape?src=HavwqN7EYmrDGr6VBegUMHOLKPiyqSO41nLGcsVHnqa60mlBFjsSJmCE0ie-W9jF0WvNpZY0oKjLN06TQe-1HqC33TiuXCe52Z0Mt3Ipp4vNUWE8R-NCIaKX0zKbvSnSHJXQsopYmbX6RmYDBxAM2XTWNebzlCLR46PPYIkqg0X7RZUEBh6W3K5qPCr_lUPVKZCmcodYl7yOpw89u4fhcUzYS0jz&cv=1&size=thumb/240_240',
                title: '',
                author: 'Thương Võ, Mun Phạm,...',
            },
            {
                img: 'https://photo-playlist-zmp3.zadn.vn/s2/mixtape?src=HavwqN7EYmrDGr6VBegUMHOLKPiyqPi4N1K3csRHoH89ML-GCOEJHWmC2S5bX9182bzTpsQ6mKjUL0gVPDkAHKrN1jasqC4716GTtZhdnqnPBWYAOR77I4jrMDSZiSz8ItLGoIklcnn58WURUQoQ6aDs1iv_-Pr742OAb2ZraqSIAHETEwMV0K0wLCbjyy1RUda2oNq&cv=1&size=thumb/240_240',
                title: '',
                author: 'NAL',
            },
        ],
        dataNewMusic: [
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/d/7/9/8/d798005f023c4815333bd1e2c1f5ce54.jpg',
                title: 'Nhạc Việt Tháng 10',
                author: 'Nguyên Hà, Đức Phúc, Bích Phương...',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/2/1/2/c/212cefd459a084f980b32d779af666c3.jpg',
                title: 'Nhạc Âu Mỹ Tháng 10',
                author: 'Jeremy Zucker,Lil Nas X, Nicki Minaj...',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/3/6/0/6/360680bc357a4848cf32d913c3d20250.jpg',
                title: 'Nhạc Hàn Tháng 10',
                author: 'CL, aespa, Key...',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/9/d/7/e/9d7eefd3e30acf5a568a6206d42608c0.jpg',
                title: 'Nhạc Hoa Tháng 10',
                author: 'Trình Hưởng, PANTHEPACK, Sunnee...',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/a/e/2/d/ae2d5f1d552eee3466f5a5eeb2a1a4fc.jpg',
                title: 'Indie Việt Tháng 10',
                author: 'Duongg, Stary Night...',
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
                    <img src={item.img} alt={index} className="p-3"></img>
                </div>
            );
        });
    };
    const renderRadio = () => {
        return state.dataRadio.map((item, index) => {
            return (
                <div key={index} className="p-2">
                    <MusicRadio item={item}></MusicRadio>
                    <div className="w-full flex items-center justify-center flex-col mt-3">
                        <p className="font-bold text-lg cursor-pointer hover:text-pink-500">
                            {item.title}
                        </p>
                        <span className="text-xs opacity-60">{item.listen} đang nghe</span>
                    </div>
                </div>
            );
        });
    };
    const { discoveryReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Discovery);
    }, [dispatch]);

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
        >
            <div className="mt-14">
                <div className="gallery pt-6">
                    <div className="gallery-content flex w-full ">
                        {renderData()}
                        <button
                            className="galleryButton btn2"
                            onClick={() => {
                                changeSlide();
                            }}
                        >
                            <i className="fa fa-arrow-right"></i>
                        </button>
                        <button
                            className="galleryButton btn1"
                            onClick={() => {
                                changeSlide2();
                            }}
                        >
                            <i className="fa fa-arrow-left"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex">{discoveryReducer && renderDataView(discoveryReducer.slice(0, 5))}</div>
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">Nghe Gần Đây</h3>
                <div className="flex">{renderDataView(discoveryReducer.slice(0, 5))}</div>
            </div>
            
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">Có Thể Bạn Sẽ Thích</h3>
                <div className="flex">{renderDataView(discoveryReducer.slice(5, 10))}</div>
            </div>
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">Nhạc Hay Nghe Ngay</h3>
                <div className="flex">{renderDataView(discoveryReducer.slice(15, 20))}</div>
            </div>
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">XONE's CORNER</h3>
                <div className="flex">{renderDataView(discoveryReducer.slice(10, 15))}</div>
            </div>
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">RADIO NỔI BẬT</h3>
                <div className="flex radioContent flex-wrap">{renderRadio()}</div>
            </div>
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">Mix Riêng Cho Bạn</h3>
                <div className="flex">{renderDataView(state.dataMix.slice(0, 5))}</div>
            </div>
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">Nhạc Mới Mỗi Ngày</h3>
                <div className="flex">{renderDataView(state.dataNewMusic)}</div>
            </div>
        </div>
    );
}
