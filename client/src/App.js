import DashAd from 'Component/Admin/admin';
import Category2 from 'Component/CategoryView';
import Radio from 'Component/Radio';
import Top from 'Component/TopView';
import Type from 'Component/Type';
import { createBrowserHistory } from 'history';
import NotFound from 'NotFound';
import Lyric from 'Page/Layout/Footer/lyric';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router';
import { Router, Switch } from 'react-router-dom';
import './App.scss';
import Album from './Component/AlbumView/index';
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
    const { lyricReducer } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(refreshToken());
    }, [dispatch]);

    return (
        <>
            {lyricReducer.toggleLyric && <Lyric />}
            <Alerts />
            <Router history={history}>
                <HOCplaylist></HOCplaylist>
                <Switch>
                    <Route path='/admin' component={DashAd}></Route>
                    <HomeTemplate exact path='/playlist/:name' Component={Playlist}></HomeTemplate>
                    <HomeTemplate exact path='/albumview/:id' Component={Album}></HomeTemplate>
                    <HomeTemplate exact path='/topview/:id' Component={Top}></HomeTemplate>
                    <HomeTemplate
                        exact
                        path='/categoryview/:id'
                        Component={Category2}
                    ></HomeTemplate>
                    <HomeTemplate exact path='/type' Component={Type}></HomeTemplate>
                    <HomeTemplate exact path='/radio' Component={Radio}></HomeTemplate>
                    <HomeTemplate exact path='/rank' Component={Rank}></HomeTemplate>
                    <HomeTemplate exact path='/profile' Component={Profile}></HomeTemplate>
                    <HomeTemplate exact path='/discovery' Component={KhamPha}></HomeTemplate>
                    <HomeTemplate exact path='/' Component={KhamPha}></HomeTemplate>
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
