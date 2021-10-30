import React, { useState } from 'react';
import MusicItemView from '../MusicItemView/index';
import MusicRadio from '../MusicRadio/index';

Radio.propTypes = {};

function Radio(props) {
    const [state, setState] = useState({
        dataView: [
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/f/4/6/3/f4634af49ba3d2e92b5f0bd3c89cd64f.jpg',
                title: 'Thanh Âm Indie Buồn',
                author: 'Duongg, buitruonglinh, Changg...',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/c/8/e/4/c8e443a2298cdc1fbeaf1283df27fc90.jpg',
                title: 'Tâm Trạng Tan Chậm',
                author: 'Phùng Khánh Linh, Orange...',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/e/f/5/b/ef5b1c4ed2643a2d463ed1299548aa2c.jpg',
                title: 'Playlist Này Chill Phết',
                author: 'Hoàng Tôn, Kha, Mỹ Anh...',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/a/9/3/5/a935203c7dfbb0a374adf1b55b107e2a.jpg',
                title: 'Giữ Không Được Thì...',
                author: 'Châu Khải Phong, Nhật Phong...',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/3/1/f/f/31ff5e4f3b3ac3723322c1ba441c28cf.jpg',
                title: 'Nhạc Việt Hôm Nay Nghe Gì',
                author: 'Quân A.P, Orange...',
            },

            // ===========================================================================

            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/6/b/d/6/6bd6e4c8aec5a99e762710a78f920e8a.jpg',
                title: 'Nam Thần Nhạc Việt',
                author: 'Quân A.P, Soobin, Khải Đăng...',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/a/0/1/5/a0150a1805d78013821afbf3b0df570d.jpg',
                title: 'Những Bản Hit Chậm Nhưng Mà Chắc',
                author: 'Hoàng Thùy Linh, Phan Mạnh Quỳnh...',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/3/4/2/f/342f0d0021cf866a111fa31d6e4931aa.jpg',
                title: 'Everyday EDM',
                author: 'Khởi động mỗi ngày với những ca khúc EDM...',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/0/d/d/f/0ddf5347f0c58fd503380cef6a8b462a.jpg',
                title: 'K-Pop Newbie',
                author: 'Những hạt giống tiềm năng của K-Pop...',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/d/8/6/9/d8695d7d00848b058ba4ae751925a5cc.jpg',
                title: 'Nhạc Anime',
                author: 'Nhạc Anime hot nhất ở thời điểm hiện tại...',
            },

            // ===========================================================================

            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/6/8/5/0/68500d96c5bde3f947bd1f60a641a71e.jpg',
                title: "XONE Today's Hits",
                author: 'XONE RADIO',
            },
            {
                img: '	https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/6/a/2/f/6a2fd608cf9d65735752ea3306c77b0e.jpg',
                title: "XONE's Radar",
                author: 'XONE RADIO',
            },
            {
                img: '		https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/3/f/8/e/3f8e25409ad8f440ef2f2c97db0ea96d.jpg',
                title: "A's Flavour",
                author: 'XONE RADIO',
            },
            {
                img: '		https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/0/1/6/9/01693aa27f33675b0d1b33b77e77f243.jpg',
                title: 'Pop Breaker',
                author: 'XONE RADIO',
            },
            {
                img: '		https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/c/e/1/4/ce14bd1c509de4019788035dd40c9b45.jpg',
                title: 'Asia Tune',
                author: 'XONE RADIO',
            },

            // ===========================================================================
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/a/d/c/e/adce596f4171f145a41e8f18634101d1.jpg',
                title: 'Yêu Ai Cũng Vậy Yêu Giùm Anh Đi',
                author: 'Hồng Thanh, DJ Mie',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/5/0/f/8/50f8303c0ed3c86162c65910fb1dceec.jpg',
                title: 'Vâng Anh Đi Đi',
                author: 'Bích Phương',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/d/e/0/6/de06907e687e042fa25bfed0fc66c208.jpg',
                title: 'Ta Thương Người Người Chẳng Thương Ta',
                author: 'Huy Vạc',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/0/e/0/d/0e0d2b8985fdeb89f126b2290f7e5f47.jpg',
                title: 'Bao Lâu Ta Lại Yêu Một Người',
                author: 'Doãn Hiếu',
            },
            {
                img: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/f/f/b/f/ffbfc53851dc56ad22f6ebb860526d66.jpg',
                title: 'Mây Đêm Chờ Mấy Đêm',
                author: 'Nguyễn Hữu Kha, CUKAK, B',
            },
        ],
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
    });

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
            <div className="ngheGanDay mt-3" style={{ marginTop: '100px' }}>
                <h3 className="px-3 mt-4 text-xl font-bold">RADIO NỔI BẬT</h3>
                <div className="flex radioContent flex-wrap">{renderRadio()}</div>

                <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">XONE Radio</h3>
                <div className="flex">{renderDataView(state.dataView.slice(0, 5))}</div>
            </div>
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">Vietcetera</h3>
                <div className="flex">{renderDataView(state.dataView.slice(5, 10))}</div>
            </div>
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">On Air</h3>
                <div className="flex">{renderDataView(state.dataView.slice(15, 20))}</div>
            </div>
            <div className="ngheGanDay mt-3">
                <h3 className="px-3 mt-4 text-xl font-bold">XONE's CORNER</h3>
                <div className="flex">{renderDataView(state.dataView.slice(10, 15))}</div>
            </div>
            </div>
        </div>
    );
}

export default Radio;
