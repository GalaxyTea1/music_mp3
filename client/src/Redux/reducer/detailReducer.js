/* eslint-disable import/no-anonymous-default-export */
import { GET_DETAIL, SONG_MUSIC_DETAIL, RANDOM_LIST_MUSIC } from '../type/Music';
const initialState = {
    listSongMusic: [],
    listSongRender: [],
    musicDetail: {},
    listRandomMusic: [],
    typeSongMusic: true, // true is listSong,false is playlist Song
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_DETAIL: {
            return {
                ...state,
                listSongMusic: action.listSongMusic,
            };
        }
        case 'GET_DETAIL_RENDER': {
            console.log(action.listSongMusic);
            return {
                ...state,
                listSongRender: action.listSongMusic,
            };
        }
        case SONG_MUSIC_DETAIL: {
            return {
                ...state,
                musicDetail: action.musicDetail,
                typeSongMusic: action.typeSongMusic,
            };
        }
        case RANDOM_LIST_MUSIC: {
            let randomList = [];
            function KiemTraTrung(musicRandom, randomList) {
                let index = randomList.findIndex((item) => item?._id === musicRandom?._id);
                if (index !== -1) {
                    const musicRandom2 =
                        state.listSongMusic[
                            Math.floor(Math.random() * (state.listSongMusic.length - 1))
                        ];
                    return KiemTraTrung(musicRandom2, randomList);
                }
                return musicRandom;
            }
            for (let i = 0; i < 5; i++) {
                let musicRandom =
                    state.listSongMusic[
                        Math.floor(Math.random() * (state.listSongMusic.length - 1))
                    ];
                if (musicRandom) {
                    musicRandom = KiemTraTrung(musicRandom, randomList);
                }
                randomList?.push(musicRandom);
            }
            return { ...state, listRandomMusic: [...randomList] };
        }
        default:
            return state;
    }
};
