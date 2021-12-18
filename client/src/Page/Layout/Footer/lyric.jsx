import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { GLOBALTYPES } from 'Redux/type/globalType';
import bg from '../../../Page/Images/bg1.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: '9999',
    },
}));

function Lyric(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { musicDetail } = useSelector((state) => state.detailReducer);
    const { toggleLyric } = useSelector((state) => state.lyricReducer);

    return (
        <>
            <div
                className={classes.root}
                style={{ animation: toggleLyric ? 'modalFadeIn ease 3s' : 'modalFadeOut ease 3s' }}
            >
                <div className='header-lyric'>
                    <h1>Lời Bài Hát</h1>
                    <button
                        onClick={() => {
                            dispatch({
                                type: GLOBALTYPES.OPEN_LYRIC,
                                payload: { toggleLyric: false },
                            });
                        }}
                        style={{ position: 'absolute', top: '20px', right: '20px' }}
                    >
                        <i className={`fa fa-angle-down `}></i>
                    </button>
                </div>
                <Grid container className='content'>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={4}>
                        <img src={musicDetail.thumbnail} alt='image_song_lyric' />
                        <h3>{musicDetail.name}</h3>
                        <p>{musicDetail.artists_names}</p>
                    </Grid>
                    <Grid item xs={7}>
                        <div className='content-right'>{musicDetail.lyric}</div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default Lyric;
