// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import MusicItem from '../../../Component/MusicItem/index';
// import { getListSongAction } from '../../../Redux/action/ListMusicAction';
// import { getListAction } from '../../../Redux/action/ListMusicAction';

// export default function ListMusic() {
//     const { listSong } = useSelector((state) => state.SongReducer);
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(getListSongAction());
//     }, []);
//     useEffect(() => {
//         dispatch(getListAction());
//     }, []);
//     useEffect(() => {
//         if (listSong.length > 0) {
//             setState({
//                 listNhac: listSong,
//                 active: true,
//             });
//         }
//     }, [listSong]);

//     const [state, setState] = useState({
//         listNhac: listSong,
//         active: true,
//     });
//     const classDSP = state.active ? 'is-active' : '';
//     const classDSNGD = state.active ? '' : 'is-active';
//     const renderListNhac = () => {
//         return state.listNhac?.map((item, index) => {
//             return <MusicItem listSong={listSong} item={item} key={index}></MusicItem>;
//         });
//     };
//     return (
//         <div className='listMusic' style={{ color: 'black' }}>
//             <div className='py-4'>
//                 <div className='px-2 flex  items-center'>
//                     <div className='listMusic__tab mr-2'>
//                         <div className='flex listMusic__content'>
//                             <div
//                                 className={`listMusic__items ${classDSP}`}
//                                 onClick={() => {
//                                     setState({
//                                         listNhac: listSong,
//                                         active: true,
//                                     });
//                                 }}
//                             >
//                                 Danh sách phát
//                             </div>
//                             <div
//                                 className={`listMusic__items ${classDSNGD}`}
//                                 onClick={() => {
//                                     setState({
//                                         listNhac: [],
//                                         active: false,
//                                     });
//                                 }}
//                             >
//                                 Nghe gần đây
//                             </div>
//                         </div>
//                     </div>
//                     <button className='rounded-full w-8 h-8 flex justify-center items-center bg-pink-500 text-white mr-2'>
//                         <i className='fa fa-clock'></i>
//                     </button>
//                     <button className='button__vip rounded-full w-8 h-8 flex justify-center items-center  text-white'>
//                         <i className='fa fa-align-justify'></i>
//                     </button>
//                 </div>
//             </div>
//             <div className='listMusic__content px-2'>{renderListNhac()}</div>
//         </div>
//     );
// }
