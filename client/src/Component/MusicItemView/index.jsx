import React from 'react'

export default function MusicItemView(props) {
    const {item} = props
    return (
        <div className='musicItemView'>
           <img src={item.image} alt={''} className='w-full'></img>
           <div className='musicItemOverlay'></div>
           <div className='musicItemBtn'>
                <span><i className="fa fa-heart"></i></span>
                <span><i className="fa fa-play"></i></span>
                <span><i className="fa fa-ellipsis-h"></i></span>
           </div>
        </div>
    )
}
