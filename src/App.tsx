import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import FullPizza from './pages/FullPizza';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import React from 'react';

import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="wrapper">
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/pizza/:id" element={<FullPizza />}></Route>
                <Route path="/*" element={<NotFound />}></Route>
            </Routes>
        </div>
    );
}

export default App;
