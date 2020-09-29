import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Header, Container, Footer, GameBoost, GameTrade, GameStats, ConnectWalletButton } from 'components';
import { selectAccount } from 'store/account/accountSelector';
import { RootState } from 'types';
import { gameBoostApprove, gameBoostLoadAllowance, gameBoostUp, gameBoostDown } from 'store/game/gameActions';
import { selectGameBoostAllowed } from 'store/game/gameSelector';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  boostAllowed: ReturnType<typeof selectGameBoostAllowed>;
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
}: Props) => {
  useEffect(() => {
    boostLoadAllowance();
  }, [account, boostLoadAllowance]);

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
            onApprove={boostApprove}
            boostUp={boostUp}
            boostDown={boostDown}
          />
        </div>
        <div className='mt-20' />
        <GameStats />
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
