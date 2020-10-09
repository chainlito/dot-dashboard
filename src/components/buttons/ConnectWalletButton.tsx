import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { RootState } from 'types';
import { loadAccount } from 'store/account/accountActions';
import ConnectWalletImage from 'assets/img/buttons/ConnectWallet.png';

interface StateFromProps {}
interface DispatchFromProps {
  loadAccount: typeof loadAccount;
}
type Props = StateFromProps & DispatchFromProps;

const ConnectWalletButton: React.FC<Props> = ({ loadAccount }: Props) => {
  const [isMobile, setMobile] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(window.navigator.userAgent)) {
      setMobile(true);
    }
  }, []);

  return !isMobile ? (
    <IconButton onClick={loadAccount} >
      <img src={ConnectWalletImage} alt='button' />
    </IconButton>
  ) : (
    <div className='text-error'>
      Go to desktop and connect Metamask
    </div>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    loadAccount: () => dispatch(loadAccount()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectWalletButton);
