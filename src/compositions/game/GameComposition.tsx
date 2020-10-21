import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Header, Container, Footer, GameBoost, GameTrade, GameHistory, ConnectWalletButton } from 'components';
import { selectAccount } from 'store/account/accountSelector';
import { RootState } from 'types';
import { gameBoostApprove, gameBoostLoadAllowance, gameBoostUp, gameBoostDown, gameRebase } from 'store/game/gameActions';
import { selectGameBoostAllowed, selectGameRedTotalSupply, selectGameBlueTotalSupply, selectGameRebaseHistory } from 'store/game/gameSelector';
import { web3client } from 'lib';
import { IconButton } from '@material-ui/core';
import { numberWithDecimals } from 'utils';
import moment from 'moment';
import Config from 'config';

import BackgroundImage from 'assets/img/background.png';
import GetRedImage from 'assets/img/buttons/GetRed.png';
import GetBlueImage from 'assets/img/buttons/GetBlue.png';
import SwapRedBlueImage from 'assets/img/buttons/SwapRedBlue.png';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  boostAllowed: ReturnType<typeof selectGameBoostAllowed>;
  redTotalSupply: ReturnType<typeof selectGameRedTotalSupply>;
  blueTotalSupply: ReturnType<typeof selectGameBlueTotalSupply>;
  rebaseHistory: ReturnType<typeof selectGameRebaseHistory>;
}
interface DispatchFromProps {
  boostApprove: typeof gameBoostApprove;
  boostLoadAllowance: typeof gameBoostLoadAllowance;
  boostUp: typeof gameBoostUp;
  boostDown: typeof gameBoostDown;
  rebase: typeof gameRebase;
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const GameComposition: React.FC<Props> = ({
  account,
  boostLoadAllowance,
  boostUp,
  boostDown,
  rebase,

  redTotalSupply,
  blueTotalSupply,
  rebaseHistory,
}: Props) => {
  const [boostRate, setBoostRate] = React.useState<number>(0);
  const [rebaseLag, setRebaseLag] = React.useState<number>(0);
  const [timer, setTimer] = React.useState<number>(Config.Orchestrator.rebase.offset - moment().unix() % Config.Orchestrator.rebase.offset);

  useEffect(() => { boostLoadAllowance(); }, [account, boostLoadAllowance]);
  useEffect(() => {
    web3client.getBoostRate().then(res => setBoostRate(res));
    web3client.getRebaseLag().then(res => setRebaseLag(res));
    const timeInterval = setInterval(() => {
      web3client.getBoostRate().then(res => setBoostRate(res));
      web3client.getRebaseLag().then(res => setRebaseLag(res));
    }, 30000);
    return () => clearInterval(timeInterval);
  });
  useEffect(() => {
    const timeInterval = setInterval(() => setTimer(Config.Orchestrator.rebase.offset - moment().unix() % Config.Orchestrator.rebase.offset), 1000);
    return () => clearInterval(timeInterval);
  });

  if (!account) {
    return (
      <React.Fragment>
        <img className='img-background fit' src={BackgroundImage} alt='background' />
        <Header />
        <Container>
          <div className='screen-center flex-v'>
            <ConnectWalletButton />
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <img className='img-background' src={BackgroundImage} alt='background' />
      <Header />
      <Container>
        <div className='game-header mt-50'>
          <IconButton
            href='https://app.uniswap.org/#/swap?inputCurrency=0x96b00208911d72ea9f10c3303ff319427a7884c9&outputCurrency=0xe1240ac7bb51333510cbf37efd678ca46137f84b'
            target='_blank'
          >
            <img src={SwapRedBlueImage} height={40} alt='Swap Red/Blue' />
          </IconButton>
          <IconButton
            className='mr-20'
            href='#'
            target='_blank'
          >
            <img src={GetBlueImage} height={40} alt='Get Blue' />
          </IconButton>
          <IconButton
            className='mr-20'
            href='#'
            target='_blank'
          >
            <img src={GetRedImage} height={40} alt='Get Red' />
          </IconButton>
        </div>
        <div className='text-small mt-30'>
          <span className='text-red'>RED price: </span><b>$1.04</b> &nbsp;| &nbsp;
          <span className='text-blue'>BLUE price: </span><b>$2.04</b> &nbsp;| &nbsp;
          <span className='text-red'>RED supply: </span><b>{numberWithDecimals(redTotalSupply, 18, 3)}</b> &nbsp;| &nbsp;
          <span className='text-blue'>BLUE supply: </span><b>{numberWithDecimals(blueTotalSupply, 18, 3)}</b> &nbsp;| &nbsp;
          <span className='text-green'>Next rebase: </span><b>{(timer / 3600).toFixed()}:{((timer % 3600) / 60).toFixed()}:{timer % 60}</b>
        </div>
        <div className='flex-h mt-20'>
          <GameTrade history={rebaseHistory} />
          <GameBoost
            boostRate={boostRate}
            rebaseLag={rebaseLag}
            rebaseEnabled={timer >= (Config.Orchestrator.rebase.offset - Config.Orchestrator.rebase.length)}
            boostUp={boostUp}
            boostDown={boostDown}
            rebase={rebase}
          />
        </div>
        <div className='mt-20' />
        <GameHistory
          redSupply={redTotalSupply}
          blueSupply={blueTotalSupply}
          rebaseHistory={rebaseHistory}
        />
        <div className='mb-50' />
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
    boostAllowed: selectGameBoostAllowed(state),
    redTotalSupply: selectGameRedTotalSupply(state),
    blueTotalSupply: selectGameBlueTotalSupply(state),
    rebaseHistory: selectGameRebaseHistory(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    boostApprove: () => dispatch(gameBoostApprove()),
    boostLoadAllowance: () => dispatch(gameBoostLoadAllowance()),
    boostUp: () => dispatch(gameBoostUp()),
    boostDown: () => dispatch(gameBoostDown()),
    rebase: () => dispatch(gameRebase()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameComposition)
