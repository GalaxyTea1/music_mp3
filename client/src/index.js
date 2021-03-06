import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.scss';
import { store } from './Redux/configStore';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById('root')
);

reportWebVitals();
