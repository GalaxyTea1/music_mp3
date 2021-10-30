import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../Redux/type/globalType';
import Notistack from './notiStack';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Alerts() {
    const classes = useStyles();

    const { alertReducer } = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            {alertReducer.error && (
                <Notistack
                    msg={{ title: 'Error', body: alertReducer.error }}
                    handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
                    bgColor="error"
                />
            )}
            {alertReducer.success && (
                <Notistack
                    msg={{ title: 'Success', body: alertReducer.success }}
                    handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
                    bgColor="success"
                />
            )}
        </div>
    );
}
