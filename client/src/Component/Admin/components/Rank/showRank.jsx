import Button from '@material-ui/core/Button';
import { alpha, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RankItem } from 'Redux/action/rankAction';
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

export default function ShowRank() {
    const classes = useStyles();
    const [avatar, setAvatar] = useState();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState();
    const [value, setValue] = useState([]);

    const handleChange = (e) => {
        const titleChange = e.target.value;

        setTitle(titleChange);
    };

    const handleChangeAuthor = (e) => {
        const authorChange = e.target.value;
        setAuthor(authorChange);
    };

    const { rankReducer } = useSelector((state) => state);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(RankItem);
    }, [dispatch]);

    useEffect(() => {
        //Clean up
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    const handlePreviewAvatar = (e) => {
        const imageFile = e.target.files[0];
        setImage(imageFile);

        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };

    const changeValueHandle = (e) => {
        const inputValue = e.target.value;
        const checkValue = rankReducer.map((item) => {
            if (item._id === inputValue) {
                return item;
            }
        });
        setValue(checkValue);
    };

    const filterArr = value.filter(function (item) {
        return item;
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('title', title);
        form_data.append('author', author);
        form_data.append('image', image, image.name);
        console.log(image);
        console.log(form_data);
        let url = `http://localhost:5001/api/rank/${idFilter}`;
        axios
            .put(url, form_data, {
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
    };

    const idFilter = filterArr.map((item) => item._id);
    const titleFilter = filterArr.map((item) => item.title);
    const authorFilter = filterArr.map((item) => item.author);

    return (
        <div className='main'>
            <Typography variant='h4' style={{ marginTop: '20px', color: 'black' }}>
                Sửa Album
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
                    <select onChange={changeValueHandle}>
                        {rankReducer?.map((option) => (
                            <option value={option._id} key={option._id}>
                                {option.title}
                            </option>
                        ))}
                    </select>{' '}
                    <br />
                    <br />
                    <div className={classes.root}>
                        <TextField
                            value={title}
                            onChange={handleChange}
                            required
                            id='outlined-full-width'
                            label='Tiêu đề'
                            style={{ margin: 8 }}
                            placeholder={titleFilter}
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
                            placeholder={authorFilter}
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
                        label='image'
                        placeholder='Thêm Ảnh'
                        onChange={handlePreviewAvatar}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        className='btn__control'
                        style={{ margin: '330px' }}
                    >
                        Sửa Album
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
