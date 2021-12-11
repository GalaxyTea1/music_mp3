import { makeStyles, Typography, useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { SongItem } from 'Redux/action/songMusicAction';
import { SONG_MUSIC_DETAIL } from 'Redux/type/Music';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root1: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },

    container: {
        width: '100%',
    },

    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },

    avatar: {
        margin: theme.spacing(11, 0, 10, 70),
        width: '100px',
        height: '100px',
    },

    isAvatar: {
        margin: theme.spacing(11, 0, 10, 70),
        width: '100px',
        height: '100px',
    },

    tabsRoot: {
        width: 1100,
        marginLeft: '100px',
        marginTop: '50px',
    },

    appBar: {
        backgroundColor: 'black',
    },

    swiper: {
        backgroundColor: 'rgb(179 195 222 / 50%)',
        borderRadius: '10px',
        height: '250px',
    },

    tabpanels: {
        color: 'green',
    },
}));

export default function Profile() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const { authReducer } = useSelector((state) => state);
    const { songMusicReducer } = useSelector((state) => state);
    const { getList } = useSelector((state) => state.getListReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SongItem);
    }, [dispatch]);

    let isId = authReducer?.user?._id;
    const isAvatar = authReducer?.user?.avatar;
    const isPlaylist = getList.filter((item) => item.user === isId);
    const resultValueSong = songMusicReducer.map((item) => item);

    const isSong = resultValueSong.filter(function (song) {
        return song.user === `${isId}`;
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    function ListSong() {
        return isSong?.map((item) => {
            return (
                <div
                    className='List__item'
                    onClick={() => {
                        dispatch({
                            type: SONG_MUSIC_DETAIL,
                            musicDetail: item,
                            typeSongMusic: true,
                        });
                    }}
                    style={{ color: 'white', cursor: 'pointer', padding: '3px' }}
                >
                    <div style={{ display: 'flex', padding: '5px' }}>
                        <img
                            src={item.thumbnail}
                            alt='songImage'
                            width='40px'
                            style={{ borderRadius: '50%' }}
                        />
                        <div style={{ paddingLeft: '10px', lineHeight: '40px' }}>{item.name}</div>
                    </div>
                </div>
            );
        });
    }

    function Playlist() {
        return isPlaylist?.map((item) => {
            return (
                <div
                    className='List__item'
                    style={{ color: 'white', cursor: 'pointer', padding: '3px' }}
                >
                    <NavLink
                        to={`/playlist/${item.name}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            fontSize: '14px',
                        }}
                    >
                        {' '}
                        {item.name}
                    </NavLink>
                </div>
            );
        });
    }

    return (
        <div className={classes.container}>
            {isAvatar ? (
                <div className={classes.root}>
                    <div className={classes.isAvatar}>
                        <img
                            src={isAvatar}
                            alt='user'
                            style={{ borderRadius: '50%', height: '80%' }}
                        />
                    </div>
                </div>
            ) : (
                <div className={classes.root}>
                    <Avatar className={classes.avatar} alt='User' src='' />
                </div>
            )}

            <div style={{ marginTop: '-50px', marginLeft: '49%' }}>
                <h3>{authReducer?.user?.username}</h3>
            </div>
            <div className={classes.tabsRoot}>
                <AppBar
                    position='static'
                    color='default'
                    style={{ backgroundColor: 'rgb(179 195 222 / 50%)', borderRadius: '10px' }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor='primary'
                        style={{ color: 'white' }}
                        variant='fullWidth'
                        aria-label='full width tabs example'
                    >
                        <Tab label='Tổng quan' {...a11yProps(0)} />
                        <Tab label='Bài hát' {...a11yProps(1)} />
                        <Tab label='Playlist' {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    className={classes.swiper}
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel
                        className={classes.tabpanels}
                        value={value}
                        index={0}
                        dir={theme.direction}
                    ></TabPanel>
                    <TabPanel
                        className={classes.tabpanels}
                        value={value}
                        index={1}
                        dir={theme.direction}
                    >
                        <ListSong />
                    </TabPanel>
                    <TabPanel
                        className={classes.tabpanels}
                        value={value}
                        index={2}
                        dir={theme.direction}
                    >
                        <Playlist />
                    </TabPanel>
                </SwipeableViews>
            </div>
        </div>
    );
}
