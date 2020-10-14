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
        <div className='home-start mt-100 mb-50'>
          <div className='wp-50 mr-70'>
            <div className='text-large'>Baseball’s famous “Dot Race”</div>
            <div className='text-medium text-red mb-30'>Now on Defi</div>
            <div className='text-small text-gray mb-50'>
              <span>Two teams:   RED and BLUE.    Each team starts with a Total Supply of 1,000,000 Tokens.  No More can be minted, combined supply will always be exactly 2,000,000,  however </span>
              <b>the supplies can be “re-balanced”  every 4 hours by anybody that calls the BATTLE function.</b>
            </div>
            <div className='flex-h'>
              <IconButton className='mr-30' onClick={() => history.push('/dashboard')}>
                <img src={StartRacingImage} alt='button' />
              </IconButton>
              <IconButton onClick={() => history.push('/dashboard')}>
                <img src={StartFarmingImage} alt='button' />
              </IconButton>
            </div>
          </div>
          <div className='wp-50'>
            <img src={SEO3Image} alt='desktop' width='100%' />
          </div>
        </div>
        <br/>
        <div className='home-stats mt-50'>
          <div className='mr-70'>
            <div className='text-small text-gray mb-5'>Game Started:</div>
            <div className='text-medium'>--:--:----</div>
          </div>
          <div className='mr-70'>
            <div className='text-small text-gray mb-5'>Days to End Game:</div>
            <div className='text-medium'>---</div>
          </div>
          <div className='mr-70'>
            <div className='text-small text-gray mb-5'>Blue's Rate:</div>
            <div className='text-medium text-blue'>{(blueTotalSupply / totalSupply * 100).toFixed(2)}%</div>
          </div>
          <div>
            <div className='text-small text-gray mb-5'>Red's Rate:</div>
            <div className='text-medium text-red'>{(redTotalSupply / totalSupply * 100).toFixed(2)}%</div>
          </div>
        </div>
        <div className='home-seo'>
          <div className='wp-50 mr-120'>
            <div className='text-large mb-30'>From idea to implementation</div>
            <div className='text-small text-gray'>Search engine optimization (SEO) is the process of growing the quality and quantity of website traffic by increasing the visibility of a website or a web page to users of a web search engine.[1] SEO refers to the improvement of unpaid results (known as "natural" or "organic" results) and excludes direct traffic and the purchase of paid placement</div>
          </div>
          <div className='wp-50'>
            <img src={SEO1Image} alt='SEO' />
          </div>
        </div>
        <div className='home-seo'>
          <div className='wp-50'>
            <img src={SEO2Image} alt='SEO' style={{ marginLeft: -150 }} />
          </div>
          <div className='wp-50 ml-120'>
            <div className='text-large mb-30'>What is the Dots game?</div>
            <div className='text-small text-gray'>Search engine optimization (SEO) is the process of growing the quality and quantity of website traffic by increasing the visibility of a website or a web page to users of a web search engine.[1] SEO refers to the improvement of unpaid results (known as "natural" or "organic" results) and excludes direct traffic and the purchase of paid placement</div>
          </div>
        </div>

        <div className='home-guide'>
          <div className='mb-30'>
            <div className='text-large'>How to play</div>
            <div className='text-large text-red'>PROJECT DOT?</div>
          </div>
          <div className='flex-h mb-30'>
            <div className='wp-50 mr-120'>
              <div className='text-small text-gray'>Search engine optimization (SEO) is the process of growing the quality and quantity of website traffic by increasing the visibility of a website or a web page to users of a web search engine.[1] SEO refers to the improvement of unpaid results.</div>
            </div>
            <div className='wp-50'>
              <div className='text-small text-gray'>Search engine optimization (SEO) is the process of growing the quality and quantity of website traffic by increasing the visibility of a website or a web page to users of a web search engine.</div>
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
