import React from 'react';
import {Route} from 'react-router';
import Home from '../page/home/Home';

function RouterConfig() {
    return (
        <React.Fragment>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/index.html" exact={true} component={Home}/>
        </React.Fragment>
    );
}

export default RouterConfig;
