import React, { memo } from "react";
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleHeaderClick = () => {
        navigate('/movies');
    };

    return (
        <p 
            className="star-wars-header"
            onClick={handleHeaderClick}
        >
            Star Wars
        </p>
    );
}

export default memo(Header);

