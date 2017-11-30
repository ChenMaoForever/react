/**
 * Created by ChenMao on 2017/6/28.
 */
import React, {Component, PropTypes} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import * as contants from '../common/Apis/constants'
import ScrollToTop from '../common/components/ScrollToTop'
/*
*实现按需加载文件
* */
import Bundle from '../views/bundle.js';


//同步载入
//import HomePage from '../containers/homePageContainer';
//异步载入
import homePageContainer from 'bundle-loader?lazy&name=[name]!../containers/homePageContainer';



const HomePage = () => (
    <Bundle load={homePageContainer}>
        {(Component) => <Component />}
    </Bundle>
)

class RouteConfig extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Router>
                <ScrollToTop>
                    <Switch>
                        <Route exact path={`${contants.commonUrl}/`} component={HomePage}></Route>
                        <Redirect to={`${contants.commonUrl}/`} />
                    </Switch>
                </ScrollToTop>
            </Router>
        )
    }
}

export default RouteConfig;