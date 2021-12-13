import Button from '@material-ui/core/Button';
import { alpha, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
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

DashCategory.propTypes = {
    onSubmit: PropTypes.func,
};

export default function DashCategory() {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState();
    const [avatar, setAvatar] = useState();
    const titleRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    const handleChange = (e) => {
        const titleChange = e.target.value;
        setTitle(titleChange);
    };

    const handleChangeAuthor = (e) => {
        const authorChange = e.target.value;
        setAuthor(authorChange);
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setImage(imageFile);

        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('image', image, image.name);
        form_data.append('title', title);
        form_data.append('author', author);
        console.log(form_data);
        let url = 'http://localhost:5001/api/category/';
        axios
            .post(url, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log(res.data);
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: {
                        success: res.data.msg,
                    },
                });
            })
            .catch((err) => console.log(err));

        setTitle('');
        setAuthor('');
        titleRef.current.focus();
    };

    return (
        <div className='main'>
            <Typography variant='h4' style={{ marginTop: '20px', color: 'black' }}>
                Thêm Thể Loại
            </Typography>
            <div
                className='add_album'
                style={{
                    margin: '40px 10px 10px 0',
                    border: '1px solid grey',
                    borderRadius: '10px',
                }}
            >
                <div className='header-form'></div>
                <form onSubmit={handleSubmit}>
                    <div className={classes.root}>
                        <TextField
                            ref={titleRef}
                            value={title}
                            onChange={handleChange}
                            required
                            id='outlined-full-width'
                            label='Tiêu đề'
                            style={{ margin: 8 }}
                            placeholder='Nhập tiêu đề'
                            fullWidth
                            margin='normal'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant='outlined'
                        />
                        <br />
                        <TextField
                            value={author}
                            onChange={handleChangeAuthor}
                            required
                            id='outlined-full-width'
                            label='Tên ca sĩ'
                            style={{ margin: 8 }}
                            placeholder='Nhập tên ca sĩ'
                            fullWidth
                            margin='normal'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant='outlined'
                        />
                    </div>

                    <br />

                    <input
                        type='file'
                        id='image'
                        name='image'
                        accept='image/png, image/jpeg, image/webp, image/jpg, image/jfif'
                        onChange={handleImageChange}
                        required
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        className='btn__control'
                    >
                        Thêm Thẻ Loại
                    </Button>
                </form>
                <br />

                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    {avatar && <img src={avatar.preview} alt='album' width='250px !important' />}
                </div>
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
