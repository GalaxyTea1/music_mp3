import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { storage } from '../../../firebase';

export default function Header() {
    // let [tenBaiHat, setTenBaiHat] = useState({
    //     value: '',
    // });
    // document.getElementById('button').addEventListener('click', () => {
    //     document.getElementById('fileInput').click();
    // });

    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        uploadFiles(file);
    };

    const uploadFiles = (file) => {
        const uploadTask = storage.ref(`files/${file.name}`).put(file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => console.log(error),
            () => {
                storage
                    .ref('files')
                    .child(file.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);
                    });
            }
        );
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
                    <div className="form">
                        <form id="form">
                            <span className="hiddenFileInput">
                                <input name="theFile" type="file" onChange={formHandler} />
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
