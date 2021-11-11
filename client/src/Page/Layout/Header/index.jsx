import { SearchOutlined } from '@ant-design/icons';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import React, { useEffect, useState } from 'react';
import { storage } from '../../../firebase';

export default function Header() {
    // let [tenBaiHat, setTenBaiHat] = useState({
    //     value: '',
    // });


    const [progress, setProgress] = useState(0);

    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        uploadFiles(file);
    };

    useEffect(() => {
        if (progress === 100)
        setTimeout(() => {
            setProgress(0);
        }, 3000);
    })

    const uploadFiles = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                setProgress(prog);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
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
                        <input placeholder="Nhập tên bài hát..." name="tenBaiHat"></input>
                    </div>
                </div>
                <div className="header__right flex items-center">
                    <div className="form">
                        <form id="form">
                            <span className="hiddenFileInput">
                                <input name="theFile" type="file" onChange={formHandler} />
                            </span>
                        </form>
                        { progress !== 0 &&
                        <h3>
                            Uploaded {progress} %
                        </h3>
                        }
                    </div> 
                </div>
            </div>
        </div>
    );
}
