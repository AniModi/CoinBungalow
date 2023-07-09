import React from 'react';
import '../assets/styles/components/Navbar.scss';


const Navbar = () => {
    return (
        <>
            <div className="navbar_container">
                <div className="navbar_container__left">
                    Menu 
                </div>
                <div className="navbar_container__right">
                    <div className="navbar_container__right__circle">
                        <div className="navbar_container__right__circle__img">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;