import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Header, Container, Footer, GameBoost, GameTrade, GameHistory, ConnectWalletButton } from 'components';
import { selectAccount } from 'store/account/accountSelector';
import { RootState } from 'types';
import { gameBoostApprove, gameBoostLoadAllowance, gameBoostUp, gameBoostDown, gameRebase } from 'store/game/gameActions';
import { selectGameBoostAllowed, selectGameRedTotalSupply, selectGameBlueTotalSupply, selectGameRebaseHistory } from 'store/game/gameSelector';
import { web3client } from 'lib';

import BackgroundImage from 'assets/img/background.png';

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
        <div className='text-small mt-70'>
          <span className='text-red'>RED price: </span><b>$1.04</b> &nbsp;| &nbsp;
          <span className='text-blue'>BLUE price: </span><b>$2.04</b> &nbsp;| &nbsp;
          <span className='text-red'>RED supply: </span><b>1200000</b> &nbsp;| &nbsp;
          <span className='text-blue'>BLUE supply: </span><b>800000</b> &nbsp;| &nbsp;
          <span className='text-green'>Next rebase: </span><b>3:26:56</b>
        </div>
        <div className='flex-h mt-20'>
          <GameTrade history={rebaseHistory} />
          <GameBoost
            boostRate={boostRate}
            rebaseLag={rebaseLag}
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
