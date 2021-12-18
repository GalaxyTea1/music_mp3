import React, { useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from 'Redux/type/globalType';

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
    snack: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Notistack = ({ msg, handleShow, bgColor }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
            setOpen(false);
        }, 4000);
    }, [dispatch]);
    return (
        <div className={classes.snack}>
            <Snackbar
                open={open}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <Alert onClose={handleShow} severity={bgColor}>
                    {msg.body}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Notistack;
