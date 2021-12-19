import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../form-controls/InputField/index';
import Avatar from '@material-ui/core/Avatar';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { LinearProgress, makeStyles } from '@material-ui/core/';
import PasswordField from '../form-controls/PasswordField/index';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/action/authAction';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4),
        position: 'relative',
    },

    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },

    title: {
        margin: theme.spacing(2, 0, 3, 0),
        textAlign: 'center',
    },

    submit: {
        margin: theme.spacing(3, 0, 2, 0),
    },

    progress: {
        position: 'absolute',
        top: theme.spacing(0),
        left: 0,
        right: 0,
    },
}));

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
    closeDialog: PropTypes.func,
};

function LoginForm(props) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const schema = yup.object().shape({
        username: yup.string().required('Please enter your username.'),

        password: yup.string().required('Please enter your password'),
    });
    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        try {
            await dispatch(login(values));
            // close dialog
            const { closeDialog } = props;
            if (closeDialog) {
                closeDialog();
            }
        } catch (error) {
            console.log({ error: error.response.data.message }, error);
        }
    };

    const { isSubmitting } = form.formState;

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress} />}
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>
            <Typography className={classes.title} components='h3' variant='h5'>
                Đăng Nhập
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name='username' label='Tên đăng nhập' form={form} />
                <PasswordField name='password' label='Mật khẩu' form={form} />
                <Button
                    disabled={isSubmitting}
                    type='submit'
                    className={classes.submit}
                    fullWidth
                    variant='contained'
                    color='primary'
                    size='large'
                >
                    Đăng Nhập
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;
