import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IconButton } from '@material-ui/core';

import { Container, Header, Footer } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
import { selectGameBlueTotalSupply, selectGameRedTotalSupply } from 'store/game/gameSelector';
import BackgroundImage from 'assets/img/background.png';
import ChooseRedImage from 'assets/img/buttons/ChooseRed.png';
import ChooseBlueImage from 'assets/img/buttons/ChooseBlue.png';
import StartRacingImage from 'assets/img/buttons/StartRacing.png';
import StartFarmingImage from 'assets/img/buttons/StartFarming.png';
import RectChooseImage from 'assets/img/layouts/RectChoose.png';
import SEO1Image from 'assets/img/seo/SEO1.png';
import SEO2Image from 'assets/img/seo/SEO2.png';
import SEO3Image from 'assets/img/seo/SEO3.png';
//import { web3client } from 'lib';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  redTotalSupply: ReturnType<typeof selectGameRedTotalSupply>;
  blueTotalSupply: ReturnType<typeof selectGameBlueTotalSupply>;
}
interface DispatchFromProps {
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps & RouteComponentProps;

export const HomeComposition = ({ account, redTotalSupply, blueTotalSupply, history }: Props) => {
  const [totalSupply, setTotalSupply] = React.useState<number>(0);
  useEffect(() => setTotalSupply(redTotalSupply + blueTotalSupply), [redTotalSupply, blueTotalSupply]);

  return (
    <React.Fragment>
      <img className='img-background' src={BackgroundImage} alt='background' />
      <Header />
	    <Container>
        <div className='home-start'>
          <div className='home-start__left'>
            <div className='text-large'>Baseball’s famous “Dot Race”</div>
            <div className='text-medium text-red mb-30'>Now on Defi</div>
            <div className='text-small mb-50'>
              <span>Two teams:   RED and BLUE.    Each team starts with a Total Supply of 1,000,000 Tokens.  No More can be minted, combined supply will always be exactly 2,000,000,  however </span>
              <b>the supplies can be “re-balanced”  every 4 hours by anybody that calls the BATTLE function.</b>
            </div>
            <div className='home-start__button-group'>
              <IconButton className='mr-30' onClick={() => history.push('/dashboard')}>
                <img className='home-start__button' src={StartRacingImage} alt='button' />
              </IconButton>
              <IconButton onClick={() => history.push('/farm')}>
                <img className='home-start__button' src={StartFarmingImage} alt='button' />
              </IconButton>
            </div>
          </div>
          <div className='home-start__right'>
            <img src={SEO3Image} alt='desktop' width='100%' />
          </div>
        </div>
        <br/>
        <div className='home-stats'>
          <div className='home-stats__info'>
            <div className='text-small text-gray mb-5'>Game Started:</div>
            <div className='text-medium'>--:--:----</div>
          </div>
          <div className='home-stats__info'>
            <div className='text-small text-gray mb-5'>Days to End Game:</div>
            <div className='text-medium'>---</div>
          </div>
          <div className='home-stats__info'>
            <div className='text-small text-gray mb-5'>Blue's Rate:</div>
            <div className='text-medium text-blue'>{(blueTotalSupply / totalSupply * 100).toFixed(2)}%</div>
          </div>
          <div className='home-stats__info'>
            <div className='text-small text-gray mb-5'>Red's Rate:</div>
            <div className='text-medium text-red'>{(redTotalSupply / totalSupply * 100).toFixed(2)}%</div>
          </div>
        </div>
        <div className='home-seo'>
          <div className='home-seo__left'>
            <div className='text-large mb-30'>A Race for Glory</div>
            <div className='text-small'>When I was a child and we would go to the baseball games, the famous “dot races” on the JumboTron  would rule the 7th inning where  red and blue race around the “track”  with color commentary by the announcer.    Bets were places,  hearts were broken and  new lives were forged. </div>
          </div>
          <div className='home-seo__right'>
            <img src={SEO1Image} alt='SEO' width='100%' />
          </div>
        </div>
        <div className='home-seo'>
          <div className='home-seo__left'>
            <img src={SEO2Image} alt='SEO' width='100%' />
          </div>
          <div className='home-seo__right'>
            <div className='text-large mb-30'>What is the Dots game?</div>
            <div className='text-small'>Now in the age of Defi, Ethereum & Rebasing, we are able to find new life in the ever so famous Dot Race with the ultimate on-chain game of Skill.    It is very simple:</div>
            <div className='text-small mt-20 mb-20'>We start with the mechanics above and allow for Battle every 4 hours</div>
            <div className='text-small'>the BATTLE function does the following: </div>
            <div className='text-small'>1 – Checks  the current market price of RED and BLUE</div>
            <div className='text-small'>2 – Determines the % discrepancy in price between RED and BLUE</div>
            <div className='text-small'>3 – REBASE dynamically at 10% of the price discrepancy between RED and BLUE.</div>
          </div>
        </div>

        <div className='home-guide'>
          <div className='mb-30'>
            <div className='text-large'>BUT The Players Influence the Game!</div>
          </div>
          <div className='flex-h mb-30'>
            <div className='home-guide__left'>
              <div className='text-small'>What makes the game interesting is that any player can MODIFY the Boost Rate. The Boost rate can be modified by pressing +/- & interacting with the contract through Metamask. It is set to a range of 5%-15% with infinite up & down moves possible by the players</div>
            </div>
            <div className='home-guide__right'>
              <div className='text-small mb-10'>There are two ways to play the game:</div>
              <div className='text-small'>1. Pick a side and watch the race  Choose Red/Choose Blue (links to farms)</div>
              <div className='text-small'>2. Trade, Boost & Modify to WIN!</div>
            </div>
          </div>
        </div>

        <div className='home-team mt-100'>
          <img className='home-team__background' src={RectChooseImage} alt='rectangle' />
          <div className='center-h'>
            <IconButton className='home-team__button' onClick={() => history.push('/dashboard')}>
              <img src={ChooseBlueImage} alt='ChooseBlue' />
            </IconButton>
            <IconButton className='home-team__button' onClick={() => history.push('/dashboard')}>
              <img src={ChooseRedImage} alt='ChooseRed' />
            </IconButton>
          </div>
          <div className='center-h text-small op-50 mt-20'>*You can rechoose the team in any time</div>
        </div>
        <div className='mb-100' />
        <br />
      </Container>
      <Footer />
    </React.Fragment>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    account: selectAccount(state),
    redTotalSupply: selectGameRedTotalSupply(state),
    blueTotalSupply: selectGameBlueTotalSupply(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(HomeComposition))
