import { makeStyles, Typography, useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
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
       margin: theme.spacing(12, 0 , 10, 70),
        width: '100px',
        height: '100px',
    },

    tabsRoot: {
        width: 1150,
        marginLeft: '80px',
    },

    appBar: {
        backgroundColor: 'black'
    },

    swiper: {
        backgroundColor: '#bcc5d4',
        height: '300px',
    },

    tabpanels: {
       color: 'black'
    },
   
}));

export default function Profile() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.container} >
            <div className={classes.root}>
                <Avatar className={classes.avatar} alt="User" src="" />
            </div>
            <div className={classes.tabsRoot}>
                <AppBar position="static" color="default" style={{backgroundColor:'#a0aaba'}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Bài hát" {...a11yProps(0)} />
                        <Tab label="Playlist" {...a11yProps(1)} />
                        <Tab label="Tải lên" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews className={classes.swiper}
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel className={classes.tabpanels} value={value} index={0} dir={theme.direction}>
                        Bài hát
                    </TabPanel>
                    <TabPanel className={classes.tabpanels} value={value} index={1} dir={theme.direction}>
                        Playlist
                    </TabPanel>
                    <TabPanel className={classes.tabpanels} value={value} index={2} dir={theme.direction}>
                        Tải lên
                    </TabPanel>
                </SwipeableViews>
            </div>
           
        </div>
    );
}
