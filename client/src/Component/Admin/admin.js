import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import DashCategory from 'Component/Admin/components/Category/addCategory';
import DashDiscovery from 'Component/Admin/components/Discovery/addDiscovery';
import React, { useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import ShowCategory from './components/Category/showCategory';
import showDiscovery from './components/Discovery/showDiscovery';
import DashRadio from './components/Radio/addRadio';
import showRadio from './components/Radio/showRadio';
import DashRank from './components/Rank/addRank';
import showRank from './components/Rank/showRank';
import Test from './components/Category/test';

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#fff',
        maxWidth: 360,
        backgroundColor: '#c78f4a',
        height: '721px',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function DashAd() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);

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

    return (
        <div className='main'>
            <div className='navBar_left'>
                <List
                    component='nav'
                    aria-labelledby='nested-list-subheader'
                    subheader={
                        <ListSubheader component='div' id='nested-list-subheader'>
                            Hello Admin!
                        </ListSubheader>
                    }
                    className={classes.root}
                >
                    <ListItem button>
                        <ListItemText primary='Tổng quan' />
                    </ListItem>
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
                                <NavLink exact to='/admin/add-albums' activeClassName='activeLi'>
                                    <li>
                                        <ListItemText primary='Thêm Album' />
                                    </li>
                                </NavLink>
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <NavLink exact to='/admin/update-albums' activeClassName='activeLi'>
                                    <li>
                                        <ListItemText primary='Hiển Thị Các Album' />
                                    </li>
                                </NavLink>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={handleClickOpen}>
                        <ListItemText primary='Rank' />
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
                                <NavLink exact to='/admin/update-ranks' activeClassName='activeLi'>
                                    <li>
                                        <ListItemText primary='Hiển Thị Các Album' />
                                    </li>
                                </NavLink>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={handleClickOpen2}>
                        <ListItemText primary='Radio' />
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open2} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <NavLink exact to='/admin/add-radios' activeClassName='activeLi'>
                                    <li>
                                        <ListItemText primary='Thêm Album' />
                                    </li>
                                </NavLink>
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <NavLink exact to='/admin/update-radios' activeClassName='activeLi'>
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
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <NavLink exact to='/admin/add-test' activeClassName='activeLi'>
                                    <li>
                                        <ListItemText primary='Test' />
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
                    <Route path='/admin/add-test' exact component={Test} />
                </Switch>
            </div>
        </div>
    );
}
