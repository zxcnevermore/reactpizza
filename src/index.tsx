import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store, { peristor } from './Redux/store';
import { Provider } from 'react-redux';
import Skeleton from './assets/loader';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={<Skeleton />} persistor={peristor}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>,
);
