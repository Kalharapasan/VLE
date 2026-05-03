import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Organisms/Header.jsx';
import Footer from '../Organisms/Footer.jsx';

const MainLayout = () => (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
);

export default MainLayout;
