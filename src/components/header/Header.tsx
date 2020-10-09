import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import { Container } from 'components';
import { selectAccount } from 'store/account/accountSelector';
import { RootState } from 'types';
import { truncateAddress } from 'utils';
import Config from 'config';
import Logo from 'assets/img/logo.png';
import { loadAccount } from 'store/account/accountActions';
import ConnectWalletImage from 'assets/img/buttons/ConnectWallet.png';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
}
interface DispatchFromProps {
  loadAccount: typeof loadAccount;
}
type Props = StateFromProps & DispatchFromProps & RouteComponentProps;

const Header: React.FC<Props> = ({ account, history, loadAccount }: Props) => {
  return (
    <Container>
      <div className="nav-header">
        <div className="center-v">
			    <img className='nav-header__logo' src={Logo} width='175' alt='DOT' onClick={() => history.push('/')} />
        </div>
        <div className="flex-h">
          <Button className='btn-text' onClick={() => history.push('/')} >HOMEPAGE</Button>
          <Button className='btn-text' onClick={() => history.push('/rules')} >RULES</Button>
          <Button className='btn-text' onClick={() => history.push('/about')} >FAQ</Button>
        </div>
        {account ? (
          <Button
            variant='contained'
            className='btn-header'
            href={`${Config.etherscan}${account.address}`}
            target='_blank'
          >{truncateAddress(account.address)}</Button>
        ) : (
          <IconButton onClick={loadAccount} >
            <img src={ConnectWalletImage} alt='button' />
          </IconButton>
        )}
      </div>
    </Container>
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
    loadAccount: () => dispatch(loadAccount()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));
