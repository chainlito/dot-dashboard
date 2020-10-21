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
            <Button className='btn-text' href='https://etherscan.io/token/0xe1240ac7bb51333510cbf37efd678ca46137f84b' >RED CONTRACT</Button>
            <Button className='btn-text' href='https://etherscan.io/token/0x96B00208911d72eA9f10c3303fF319427A7884C9' >BLUE CONTRACT</Button>
            <Button className='btn-text' href='https://info.uniswap.org/pair/0x85256d98f126be819cb3a5395fdbf130f11fdd93' >UNISWAP</Button>
            <Button className='btn-text' href='https://t.me/DotsFinance' >TELEGRAM</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer;
