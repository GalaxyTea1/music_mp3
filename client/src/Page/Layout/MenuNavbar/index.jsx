import {
    CustomerServiceOutlined,
    ExceptionOutlined,
    LineChartOutlined,
    WeiboOutlined,
} from '@ant-design/icons';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from 'Redux/action/authAction';
import { getPlaylist } from 'Redux/action/handlePlaylist';
import LoginForm from '../../../Component/auth/LoginForm';
import RegisterForm from '../../../Component/auth/RegisterForm';
import NewPlaylist from '../../../Component/NewPlaylist/index';
import { OPEN_MODAL } from '../../../Redux/type/Music';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4),
        position: 'relative',
    },

    title: {
        margin: theme.spacing(2, 0, 3, 0),
        textAlign: 'center',
    },

    close: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        color: theme.palette.grey[500],
        zIndex: 1,
    },
}));

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};

export default function MenuNavbar() {
    const classes = useStyles();
    const { authReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { listPlaylist } = useSelector((state) => state.PlaylistReducer);
    const { getList } = useSelector((state) => state.getListReducer);
    const namePlaylist = getList.map((item) => item.name);
    useEffect(() => {
        dispatch(getPlaylist);
    }, [dispatch]);
    const userAuth = authReducer?.user?._id;
    const check = getList.filter((item) => item.user === userAuth);

    const handleScroll = (e) => {
        e.target.classList.add('isScroll');
        if (e.target.scrollTop > 10) {
            e.target.classList.add('isScroll');
        } else {
            e.target.classList.remove('isScroll');
        }
    };
    const handleClick = () => {
        dispatch({
            type: OPEN_MODAL,
            Component: <NewPlaylist></NewPlaylist>,
        });
    };

    return (
        <div className='sideBar'>
            <div className='logoMp3'>
                <Link to=''>
                    <span className='mt-1 ml-2'>
                        <img
                            src='https://res.cloudinary.com/boo-it/image/upload/v1637924699/test/pn90mkevtweoulwpnanj.png'
                            alt='logo'
                        ></img>
                    </span>
                </Link>
            </div>
            <div className='sideBar__menu'>
                <ul>
                    <NavLink exact to='/profile' activeClassName='activeLi'>
                        <li>
                            <i>
                                <ExceptionOutlined className='block' />
                            </i>
                            Cá Nhân
                        </li>
                    </NavLink>
                    <NavLink exact to='/discovery' activeClassName='activeLi'>
                        <li>
                            <i>
                                <WeiboOutlined className='block' />
                            </i>
                            Khám Phá
                        </li>
                    </NavLink>
                    <NavLink exact to='/rank' activeClassName='activeLi'>
                        <li>
                            <i>
                                <LineChartOutlined className='block' />
                            </i>{' '}
                            Top 100
                        </li>
                    </NavLink>

                    <NavLink exact to='/type' activeClassName='activeLi'>
                        <li>
                            <i>
                                <CustomerServiceOutlined className='block' />
                            </i>
                            Thể Loại
                        </li>
                    </NavLink>
                </ul>
            </div>
            <div className='gach'></div>
            <div className='sideBar__music'>
                <div className='sideBar__menu2 mt-3' onScroll={handleScroll}>
                    <div className='sideBar__banner'>
                        {authReducer.token ? (
                            <div>
                                <p>Chào mừng bạn đến với thế giới âm nhạc đầy màu sắc</p>
                                <button onClick={() => dispatch(logout())}>Thoát</button>
                            </div>
                        ) : (
                            <div>
                                <p>Đăng nhập để trải nghiệm cảm giác mới lạ hơn</p>
                                <button onClick={handleClickOpen}>Đăng Nhập</button>
                            </div>
                        )}
                    </div>

                    <div className='sideBar__category'>
                        <div className='sideBar__text'>
                            <p>THƯ VIỆN</p>
                            <i className='fa fa-pen'></i>
                        </div>
                    </div>
                    <div className='sideBar__playlist'>
                        {check.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className='playlist_item opacity-70 hover:opacity-100'
                                >
                                    <NavLink
                                        to={`/playlist/${item.name}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            fontSize: '14px',
                                        }}
                                    >
                                        {item.name}
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Dialog
                className={classes.root}
                disableEscapeKeyDown
                onBackdropClick='false'
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogContent>
                    {mode === MODE.REGISTER && (
                        <>
                            <RegisterForm closeDialog={handleClose} />
                            <Box textAlign='center'>
                                <Button color='primary' onClick={() => setMode(MODE.LOGIN)}>
                                    Already have an account? Login here
                                </Button>
                            </Box>
                        </>
                    )}

                    {mode === MODE.LOGIN && (
                        <>
                            <LoginForm closeDialog={handleClose} />
                            <Box textAlign='center'>
                                <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>
                                    Don't have an account? Register here
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
                <IconButton onClick={handleClose} className={classes.close}>
                    <Close />
                </IconButton>
            </Dialog>

            <div className='sideBar__footer cursor-pointer' onClick={handleClick}>
                <span>
                    <i className='fa fa-plus mr-2'></i>Tạo playlist mới
                </span>
            </div>
        </div>
    );
}
