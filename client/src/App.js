import Follow from 'Component/Follow';
import NewSongs from 'Component/NewSongs';
import Radio from 'Component/Radio';
import Type from 'Component/Type';
import { createBrowserHistory } from 'history';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch } from 'react-router-dom';
import './App.scss';
import Alerts from './Component/Alert/alert';
import KhamPha from './Component/KhamPha/index';
import Profile from './Component/Profile/index';
import Rank from './Component/Rank/index';
import HOCplaylist from './HOC/HOCplaylist';
import Playlist from './Page/Layout/Playlist/index';
import { refreshToken } from './Redux/action/authAction';
import { HomeTemplate } from './Template/HomeTemplate/index';

export const history = createBrowserHistory();

function App() {
    const { authReducer } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshToken());
    }, [dispatch]);

    return (
        <>
            <Alerts />

            <Router history={history}>
                <HOCplaylist></HOCplaylist>
                <Switch>
                    <HomeTemplate exact path="/playlist/:name" Component={Playlist}></HomeTemplate>
                    <HomeTemplate exact path="/type" Component={Type}></HomeTemplate>
                    <HomeTemplate exact path="/new-songs" Component={NewSongs}></HomeTemplate>
                    <HomeTemplate exact path="/follow" Component={Follow}></HomeTemplate>
                    <HomeTemplate exact path="/radio" Component={Radio}></HomeTemplate>
                    <HomeTemplate exact path="/rank" Component={Rank}></HomeTemplate>
                    <HomeTemplate exact path="/profile" Component={Profile}></HomeTemplate>
                    <HomeTemplate exact path="/discovery" Component={KhamPha}></HomeTemplate>
                    <HomeTemplate exact path="/" Component={KhamPha}></HomeTemplate>
                </Switch>
            </Router>
        </>
    );
}

export default App;
