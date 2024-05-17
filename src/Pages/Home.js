import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import SliderImage from '../slider-image.png';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div class="section__container header__container">
            <div class="header__image">
                <img src={SliderImage} alt="header" />
            </div>
            <div class="header__content">
                <h1>Manage Your Tasks Effectively and Efficiently</h1>
                <p>
                   Streamline your Day with our intuitive task management tool. 
                </p>
                <div class="header__btns">
                    <Button variant='contained' style={{ borderRadius: 10 }} onClick={() => navigate('/task-list')}>
                        Get Started
                    </Button>
                    
                </div>
            </div>
        </div>
    );
}

export default Home;