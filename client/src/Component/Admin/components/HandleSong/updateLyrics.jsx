import Button from '@material-ui/core/Button';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListAction } from 'Redux/action/ListMusicAction';
import { UpdateLyric } from 'Redux/action/songMusicAction';
import { GLOBALTYPES } from 'Redux/type/globalType';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },

    root2: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function UpdateLyrics() {
    const classes = useStyles();
    const [lyric, setLyric] = useState('');
    const [value, setValue] = useState();

    const handleChange = (e) => {
        const lyricChange = e.target.value;
        setLyric(lyricChange);
    };
    const dispatch = useDispatch();
    const { listSongMusic } = useSelector((state) => state.detailReducer);
    useEffect(() => {
        dispatch(getListAction());
    }, []);

    const changeValueHandle = (e) => {
        const selectValue = e.target.value;
        setValue(selectValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(UpdateLyric(value, lyric));
        setLyric('');
    };

    return (
        <div className='main'>
            <Typography variant='h4' style={{ marginTop: '20px', color: 'black' }}>
                Cập nhật lời bài hát
            </Typography>
            <div
                className='add_album'
                style={{
                    height: '500px',
                    margin: '40px 10px 10px 0',
                    border: '1px solid grey',
                    borderRadius: '10px',
                }}
            >
                <div className='header-form'></div>
                <form onSubmit={handleSubmit}>
                    <select onChange={changeValueHandle}>
                        {listSongMusic?.map((option) => (
                            <option value={option._id} key={option._id}>
                                {option.name}
                            </option>
                        ))}
                    </select>{' '}
                    <br />
                    <br />
                    <textarea
                        name='lyric'
                        className='lyric'
                        rows='8'
                        size='large'
                        value={lyric}
                        onChange={handleChange}
                    ></textarea>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        className='btn__control'
                        style={{ margin: '330px' }}
                    >
                        Cập nhật lời bài hát
                    </Button>
                </form>
                <br />

                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        marginTop: '20px',
                    }}
                ></div>
            </div>
        </div>
    );
}
