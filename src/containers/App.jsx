import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <div>Hello</div>
        </BrowserRouter>
    </Provider>
);

export default App;
