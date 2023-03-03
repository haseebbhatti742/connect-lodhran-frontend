import { Button } from '@mui/material';
import React from 'react';
import { THEME_COLOR_LIGHT } from 'utils/Constants';
import BG_IMAGE from '../../../assets/images/bg-header.jpg';
import './header.css';

function Header() {
    return (
        <div className="container">
            <img src={BG_IMAGE} alt="Header" style={{ width: '100%' }} />
            <div className="centered">
                <p className="building">
                    Building <span>Network</span> <br />
                    for the smartest
                    <br /> people
                </p>
                <p className="message">
                    Connect Lodhran delivers the best, fastest and most reliable internet service and iptv service at all time and you can
                    choose from wide range of available speeds.
                </p>
                <p style={{ textAlign: 'left' }}>
                    <Button variant="contained" className="button" sx={{ color: 'white', backgroundColor: THEME_COLOR_LIGHT }}>
                        Explore Us
                    </Button>
                </p>
            </div>
        </div>
    );
}

export default Header;
