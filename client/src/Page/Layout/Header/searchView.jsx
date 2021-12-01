import React from 'react';
import { useDispatch } from 'react-redux';

Album.propTypes = {};

function Album(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <div className='content'></div>
        </div>
    );
}

export default Album;
