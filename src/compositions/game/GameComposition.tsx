import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Header, Container, Footer, GameBoost, GameTrade, GameStats, ConnectWalletButton } from 'components';
import { selectAccount } from 'store/account/accountSelector';
import { RootState } from 'types';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
}
interface DispatchFromProps {
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const GameComposition: React.FC<Props> = ({ account }: Props) => {
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
          <GameBoost allowed={false} />
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
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameComposition)
