import React from "react";
import { useNavigate } from "react-router-dom";
import tick from '../assets/tick.png';
import './password-change-success-page.pages.scss';

const PasswordChangeSuccess = () => {
    let navigate = useNavigate();

    function navigateToHomePage() {
        navigate('/');
    }

    return (<div className="success-page">
        <div className="success-page-div">
            <img className="tick-image" src={tick} alt="Tick" />
            <div className="success-page-text">Password Was Changed</div>
            <button type="submit" onClick={() => { navigateToHomePage() }}>Go to HomePage</button>
        </div>
    </div>)
}

export default PasswordChangeSuccess;