import React from 'react';
import { Container } from 'components';
import BackgroundImage from 'assets/img/background.png';
import Logo from 'assets/img/logo.png';
import { Button } from '@material-ui/core';

const Footer: React.FC = () => {
  return (
    <div className='footer'>
      <img className='footer-background' src={BackgroundImage} alt='background' />
      <Container>
        <div className='footer-container'>
          <div className="center-v">
            <img className='nav-header__logo' src={Logo} width='175' alt='DOT' />
          </div>
          <div className="flex-h">
            <Button className='btn-text text-gray' onClick={() => {}} >HOMEPAGE</Button>
            <Button className='btn-text' onClick={() => {}} >Rules</Button>
            <Button className='btn-text' onClick={() => {}} >FAQ</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer;
