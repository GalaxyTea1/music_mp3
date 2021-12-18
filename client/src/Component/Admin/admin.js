import { AppBar, InputBase, Toolbar, Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { alpha, makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import StarBorder from '@material-ui/icons/StarBorder';
import DashCategory from 'Component/Admin/components/Category/addCategory';
import DashDiscovery from 'Component/Admin/components/Discovery/addDiscovery';
import React, { useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import ShowCategory from './components/Category/showCategory';
import showDiscovery from './components/Discovery/showDiscovery';
import HandleSong from './components/HandleSong/handleSong';
import UpdateLyrics from './components/HandleSong/updateLyrics';
import DashRadio from './components/Radio/addRadio';
import showRadio from './components/Radio/showRadio';
import DashRank from './components/Rank/addRank';
import showRank from './components/Rank/showRank';

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'black',
        maxWidth: 360,
        backgroundColor: 'rgb(213 217 234)',
        height: '770px',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    root1: {
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

export default function DashAd() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [open4, setOpen4] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickOpen = () => {
        setOpen1(!open1);
    };

    const handleClickOpen2 = () => {
        setOpen2(!open2);
    };

    const handleClickOpen3 = () => {
        setOpen3(!open3);
    };

    const handleClickOpen4 = () => {
        setOpen4(!open4);
    };

    return (
        <>
            <div className={classes.root1}>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography className={classes.title} variant='h6' noWrap>
                            Welcome Admin!
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder='Tìm kiếm…'
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>

            <div className='main_admin'>
                <div className='navBar_left'>
                    <List
                        component='nav'
                        aria-labelledby='nested-list-subheader'
                        className={classes.root}
                    >
                        <ListItem button onClick={handleClick}>
                            <ListItemText primary='Khám Phá' />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout='auto' unmountOnExit>
                            <List component='div' disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <NavLink
                                        exact
                                        to='/admin/add-albums'
                                        activeClassName='activeLi'
                                    >
                                        <li>
                                            <ListItemText primary='Thêm Album' />
                                        </li>
                                    </NavLink>
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <NavLink
                                        exact
                                        to='/admin/update-albums'
                                        activeClassName='activeLi'
                                    >
                                        <li>
                                            <ListItemText primary='Hiển Thị Các Album' />
                                        </li>
                                    </NavLink>
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem button onClick={handleClickOpen3}>
                            <ListItemText primary='Thể Loại' />
                            {open3 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open3} timeout='auto' unmountOnExit>
                            <List component='div' disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <NavLink
                                        exact
                                        to='/admin/add-categories'
                                        activeClassName='activeLi'
                                    >
                                        <li>
                                            <ListItemText primary='Thêm Thể Loại' />
                                        </li>
                                    </NavLink>
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <NavLink
                                        exact
                                        to='/admin/update-categories'
                                        activeClassName='activeLi'
                                    >
                                        <li>
                                            <ListItemText primary='Hiển Thị Các Album' />
                                        </li>
                                    </NavLink>
                                </ListItem>
                            </List>
                        </Collapse>
                        <ListItem button onClick={handleClickOpen4}>
                            <ListItemText primary='Duyệt' />
                            {open4 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open4} timeout='auto' unmountOnExit>
                            <List component='div' disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <NavLink
                                        exact
                                        to='/admin/handle-song'
                                        activeClassName='activeLi'
                                    >
                                        <li>
                                            <ListItemText primary='Duyệt bài hát' />
                                        </li>
                                    </NavLink>
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <NavLink
                                        exact
                                        to='/admin/update-lyrics'
                                        activeClassName='activeLi'
                                    >
                                        <li>
                                            <ListItemText primary='Cập nhật lời bài hát' />
                                        </li>
                                    </NavLink>
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem button onClick={handleClickOpen}>
                            <ListItemText primary='Top100' />
                            {open1 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open1} timeout='auto' unmountOnExit>
                            <List component='div' disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <NavLink exact to='/admin/add-ranks' activeClassName='activeLi'>
                                        <li>
                                            <ListItemText primary='Thêm Album' />
                                        </li>
                                    </NavLink>
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <NavLink
                                        exact
                                        to='/admin/update-ranks'
                                        activeClassName='activeLi'
                                    >
                                        <li>
                                            <ListItemText primary='Hiển Thị Các Album' />
                                        </li>
                                    </NavLink>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </div>
                <div className='navBar_right'>
                    <Switch>
                        <Route path='/admin/add-albums' exact component={DashDiscovery} />
                        <Route path='/admin/update-albums' exact component={showDiscovery} />
                        <Route path='/admin/add-categories' exact component={DashCategory} />
                        <Route path='/admin/update-categories' exact component={ShowCategory} />
                        <Route path='/admin/add-radios' exact component={DashRadio} />
                        <Route path='/admin/update-radios' exact component={showRadio} />
                        <Route path='/admin/add-ranks' exact component={DashRank} />
                        <Route path='/admin/update-ranks' exact component={showRank} />
                        <Route path='/admin/handle-song' exact component={HandleSong} />
                        <Route path='/admin/update-lyrics' exact component={UpdateLyrics} />
                    </Switch>
                </div>
            </div>
        </>
    );
}
