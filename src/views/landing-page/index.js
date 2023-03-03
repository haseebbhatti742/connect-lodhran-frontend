import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Navbar from './navbar/Navbar';
import Header from './header/Header';
import Services from './services/Services';
import AboutUs from './aboutus/AboutUs';
import HelpCenter from './helpcenter/HelpCenter';

const pages = [
    { key: 'home', value: 'Home', Component: Header },
    { key: 'services', value: 'Services', Component: Services },
    { key: 'aboutus', value: 'About Us', Component: AboutUs },
    { key: 'helpcenter', value: 'Help Center', Component: HelpCenter }
];

function LandingPage() {
    const [selectedMenu, setSelectedMenu] = useState('home');
    const divRef = useRef('home');

    useEffect(() => {
        const div = document.getElementById(selectedMenu);
        div &&
            div.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
    }, [selectedMenu]);

    return (
        <>
            <Navbar pages={pages} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            <div ref={divRef}>
                {pages.map(({ key, Component }) => (
                    <div id={key} key={key}>
                        <Component />
                    </div>
                ))}
            </div>
        </>
    );
}

export default LandingPage;
