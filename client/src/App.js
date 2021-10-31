import Follow from 'Component/Follow';
import Mv from 'Component/Mv';
import NewSongs from 'Component/NewSongs';
import Radio from 'Component/Radio';
import Top from 'Component/Top100';
import Type from 'Component/Type';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router-dom';
import './App.scss';
import Alerts from './Component/Alert/alert';
import KhamPha from './Component/KhamPha/index';
import Profile from './Component/Profile/index';
import Rank from './Component/Rank/index';
import HOCplaylist from './HOC/HOCplaylist';
import Playlist from './Page/Layout/Playlist/index';
import { HomeTemplate } from './Template/HomeTemplate/index';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from './Redux/action/authAction';
import PacmanLoader from 'react-spinners/PacmanLoader';

export const history = createBrowserHistory();

function App() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 0);
    }, []);

    const { authReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(refreshToken(authReducer));
    }, [dispatch]);

    return (
        <>
            <Alerts />
            {loading ? (
                <div className="loading">
                    <PacmanLoader color={'#1CA72E'} loading={loading} size={50} />
                </div>
            ) : (
                <Router history={history}>
                    <HOCplaylist></HOCplaylist>
                    <Switch>
                        <HomeTemplate
                            exact
                            path="/playlist/:name"
                            Component={Playlist}
                        ></HomeTemplate>
                        <HomeTemplate exact path="/mv" Component={Mv}></HomeTemplate>
                        <HomeTemplate exact path="/top-100" Component={Top}></HomeTemplate>
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
            )}
        </>
    );
}

export default App;
