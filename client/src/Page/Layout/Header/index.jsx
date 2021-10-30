import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function Header() {
    // let [tenBaiHat, setTenBaiHat] = useState({
    //     value: '',
    // });
    // const [baseAudio, setBaseAudio] = useState('');

    const uploadAudio = async (e) => {
        console.log(e.target.files);
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        // setBaseAudio(base64);
        console.log(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <div className="header">
            <div className="header__content flex justify-between w-full">
                <div className="header__left">
                    <div className="header__search" style={{ left: '24px' }}>
                        <SearchOutlined
                            className="mr-5"
                            style={{ fontSize: '24px', position: 'absolute', left: '10px' }}
                        />
                        <input
                            placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
                            name="tenBaiHat"
                        ></input>
                    </div>
                </div>
                <div className="header__right flex items-center">
                    <button className="w-10 h-10 flex items-center mx-2 rounded-full justify-center hover:opacity-80">
                        <i className="fa fa-upload"></i>
                    </button>
                    <input
                        type="file"
                        onChange={(e) => {
                            uploadAudio(e);
                        }}
                    />

                    <button className="w-10 h-10 flex items-center mx-2 rounded-full justify-center hover:opacity-80">
                        <i className="fa fa-cog"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
