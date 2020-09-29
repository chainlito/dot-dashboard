import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Header, Container, Footer, GameBoost, GameTrade, GameStats, ConnectWalletButton } from 'components';
import { selectAccount } from 'store/account/accountSelector';
import { RootState } from 'types';
import { gameBoostApprove, gameBoostLoadAllowance, gameBoostUp, gameBoostDown } from 'store/game/gameActions';
import { selectGameBoostAllowed, selectGameRedTotalSupply, selectGameBlueTotalSupply } from 'store/game/gameSelector';
import { web3client } from 'lib';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  boostAllowed: ReturnType<typeof selectGameBoostAllowed>;
  redTotalSupply: ReturnType<typeof selectGameRedTotalSupply>;
  blueTotalSupply: ReturnType<typeof selectGameBlueTotalSupply>;
}
interface DispatchFromProps {
  boostApprove: typeof gameBoostApprove;
  boostLoadAllowance: typeof gameBoostLoadAllowance;
  boostUp: typeof gameBoostUp;
  boostDown: typeof gameBoostDown;
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const GameComposition: React.FC<Props> = ({
  account,
  boostAllowed,
  boostApprove,
  boostLoadAllowance,
  boostUp,
  boostDown,

  redTotalSupply,
  blueTotalSupply,
}: Props) => {
  const [boostRate, setBoostRate] = React.useState<number>(0);

  useEffect(() => { boostLoadAllowance(); }, [account, boostLoadAllowance]);
  useEffect(() => {
    web3client.getBoostRate().then(res => setBoostRate(res));
  })

  if (!account) {
    return (
      <React.Fragment>
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
      <Header />
      <Container>
        <div className='flex-h mt-50'>
          <GameTrade />
          <GameBoost
            allowed={boostAllowed}
            boostRate={boostRate}
            onApprove={boostApprove}
            boostUp={boostUp}
            boostDown={boostDown}
          />
        </div>
        <div className='mt-20' />
        <GameStats
          redSupply={redTotalSupply}
          blueSupply={blueTotalSupply}
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
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    boostApprove: () => dispatch(gameBoostApprove()),
    boostLoadAllowance: () => dispatch(gameBoostLoadAllowance()),
    boostUp: () => dispatch(gameBoostUp()),
    boostDown: () => dispatch(gameBoostDown()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameComposition)
