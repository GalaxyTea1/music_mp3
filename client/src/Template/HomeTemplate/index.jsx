import { Route } from 'react-router';
import bg from '../../Page/Images/bg1.png';
import Footer from '../../Page/Layout/Footer/index';
import Header from '../../Page/Layout/Header/index';
import MenuNavBar from '../../Page/Layout/MenuNavbar/index';

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
                        <Footer {...restProps}></Footer>
                    </div>
                );
            }}
        ></Route>
    );
};
