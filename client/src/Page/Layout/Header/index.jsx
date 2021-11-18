import { SearchOutlined } from '@ant-design/icons';
import React from 'react';

export default function Header() {
    // let [tenBaiHat, setTenBaiHat] = useState({
    //     value: '',
    // });

    return (
        <div className="header">
            <div className="header__content flex justify-between w-full">
                <div className="header__left">
                    <div className="header__search" style={{ left: '24px' }}>
                        <SearchOutlined
                            className="mr-5"
                            style={{ fontSize: '24px', position: 'absolute', left: '10px' }}
                        />
                        <input placeholder="Nhập tên bài hát..." name="tenBaiHat"></input>
                    </div>
                </div>
                <div className="header__right flex items-center">
                    <div className="form">
                        <form id="form">
                            <span className="hiddenFileInput">
                                <input name="theFile" type="file" />
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
