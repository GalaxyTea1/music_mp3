import React, { useEffect, useState } from 'react';

export default function DashRadio() {
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        //Clean up
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };

    return (
        <div className="main">
            <div className="add_album" style={{ margin: '40px 10px 10px 0' }}>
                <form>
                    <input type="text" label="title" placeholder="Nhập tiêu đề" size="50" /> <br />
                    <br />
                    <input
                        type="text"
                        label="author"
                        placeholder="Nhập tên ca sĩ, tác giả"
                        size="50"
                    />
                    <br />
                    <br />
                    <input
                        type="file"
                        label="image"
                        placeholder="Thêm Ảnh"
                        onChange={handlePreviewAvatar}
                    />
                    <br />
                    <br />
                    {avatar && (
                        <img
                            src={avatar.preview}
                            alt="album"
                            width="50% !important"
                            height="200px !important"
                        />
                    )}
                    <button type="submit">Thêm Album</button>
                </form>
            </div>
        </div>
    );
}
