import React from 'react';
import { Header, Container, Footer } from 'components';
import BackgroundImage from 'assets/img/background.png';
import Rule1Image from 'assets/img/rules/Rule1.png';
import Rule2Image from 'assets/img/rules/Rule2.png';
import Rule3Image from 'assets/img/rules/Rule3.png';

const RulesComposition: React.FC = () => {
  return (
    <React.Fragment>
    <img className='img-background' src={BackgroundImage} alt='background' />
      <Header />
      <Container>
        <div className='center-h text-large rules-title'>Rules</div>
        <div className='rules-container'>
          <div className='rules-item'>
            <div className='rules-item__left'>
              <div className='text-large text-red mb-20'>Rule №1</div>
              <div className='text-small text-gray'>
                <b className='text-normal'>Supply will always be Equal 2,000,000.<br/></b>
                <span>
                  Within the game, we expect supply to go radically up and down while touching equilibrium every once in a while.  How long will it take and how high/low will it go before reaching equilibrium?  Only the game and players know!
                </span>
              </div>
            </div>
            <div className='rules-item__right'>
              <img src={Rule1Image} alt='rule1' width='100%' />
            </div>
          </div>
          <div className='rules-item'>
            <div className='rules-item__left'>
              <img src={Rule2Image} alt='rule2' width='100%' />
            </div>
            <div className='rules-item__right'>
              <div className='text-large text-red mb-20'>Rule №2</div>
              <div className='text-small text-gray'>
                <b className='text-normal'>A Rebase is possible every 4 hours<br/></b>
                Although the total supply of RED and BLUE will always be exactly 2,000,000,  <b>the supplies can be “re-balanced”  every 4 hours by anybody that calls the BATTLE function. </b><br/>
                The Players Call the Battleshots!
              </div>
            </div>
          </div>
          <div className='rules-item'>
            <div className='rules-item__left'>
              <div className='text-large text-red mb-20'>Rule №3</div>
              <div className='text-small text-gray'>
                <b className='text-normal'>YOU influence the game<br/></b>
                What makes the game interesting is that any player can MODIFY the Boost Rate<br/>
                The Boost rate can be modified by pressing +/- & interacting with the contract through Metamask<br/>
                It is set to a range of 5%-15% with infinite up & down moves possible by the players<br/>
                The first move after a rebase wil cost .1eth, with each additional move .1eth additional
              </div>
            </div>
            <div className='rules-item__right'>
              <img src={Rule3Image} alt='rule3' width='100%' />
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default RulesComposition;
