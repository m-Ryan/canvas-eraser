import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Routes from './router/router';
import './public.scss';

render(

    <BrowserRouter basename={process.env.WEB_PATH}>
        <Routes/>
    </BrowserRouter>, document.getElementById('root'))
