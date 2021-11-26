import { Route } from 'react-router';
import MenuNavBar from '../../Page/Layout/MenuNavbar/index';
import ListMusic from '../../Page/Layout/ListMusic/index';
import ListSong from '../../Page/Layout/ListSong/index';
import Header from '../../Page/Layout/Header/index';
import Footer from '../../Page/Layout/Footer/index';
import bg from '../../Page/Images/bg1.png';

export const HomeTemplate = (props) => {
    const { Component, ...restProps } = props;
    return (
        <Route
            {...restProps}
            render={(propsRouter) => {
                return (
                    <div
                        className='flex overflow-hidden'
                        style={{
                            backgroundImage: `url(${bg})`,
                            height: '100%',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <MenuNavBar></MenuNavBar>
                        <div>
                            <Header></Header>
                            <Component {...propsRouter}></Component>
                        </div>
                        <ListMusic></ListMusic>
                        {/* <ListSong></ListSong> */}
                        <Footer {...restProps}></Footer>
                    </div>
                );
            }}
        ></Route>
    );
};
