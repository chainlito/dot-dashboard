import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Config from 'config';

import { Container, Header, Footer } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
import PoolCard from './PoolCard';
import BackgroundImage from 'assets/img/background.png';

import Farm1Icon from 'assets/img/token-uni.png';
import Farm2Icon from 'assets/img/token-uni.png';
import Farm3Icon from 'assets/img/token-yfi.png';
import Farm4Icon from 'assets/img/token-link.png';
import Farm5Icon from 'assets/img/token-uni.png';
import Farm6Icon from 'assets/img/token-ytsla.png';
import Farm7Icon from 'assets/img/token-meme.png';
import Farm8Icon from 'assets/img/token-core.png';
import { coingeckoclient, web3client, dexclient } from 'lib';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const FarmComposition = () => {
  const [redPrice, setRedPrice] = React.useState<number>(0);
  const [tokenPrice, setTokenPrice] = React.useState<number>(0);
  const [pool1APY, setPool1APY] = React.useState<number>(0);
  const [pool2APY, setPool2APY] = React.useState<number>(0);
  const [pool3APY, setPool3APY] = React.useState<number>(0);
  useEffect(() => {
    coingeckoclient.getYtslaPrice().then(res => setTokenPrice(res));
  });
  useEffect(() => {
    if (tokenPrice > 0) {
      coingeckoclient.getMemePrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool1Contract).then(res => {
            const roi = res * tokenPrice / Math.pow(10, 28) / price * 86400 * 365 * 100;
            setPool1APY(roi);
        });
      });

      coingeckoclient.getUniPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool2Contract).then(res => {
            const roi = res * tokenPrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
            setPool2APY(roi);
        });
      });

      dexclient.getRedLpTokenPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool3Contract).then(res => {
          const roi = res * tokenPrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
          setPool3APY(roi);
        });
      });
    }
  }, [tokenPrice]);

  return (
    <React.Fragment>
      <img className='img-background' src={BackgroundImage} alt='background' />
      <Header />
      <Container>
        <div className='flex-v'>
          <div className='mb-20'>
            <div className='center-h text-medium mt-30 mb-10'>
              Select a farm
            </div>
            <div className='center-h text-small text-gray'>
              Earn BLUE tokens by providing liquidity
            </div>
          </div>
          <div className='center-h wp-100 mt-30 home-container'>
            <PoolCard
              stakingToken={Config.BlueLpToken}
              picture={Farm1Icon} poolUrl='/farm-bluelp'
              apy={pool2APY}
              isRed={false}
              isHigh />
            <PoolCard
              stakingToken={Config.UniToken}
              picture={Farm2Icon}
              poolUrl='/farm-uni'
              apy={pool1APY}
              isRed={false}
            />
          </div>
          <div className='center-h wp-100 mt-30 home-container'>
            <PoolCard
              stakingToken={Config.YfiToken}
              picture={Farm3Icon}
              poolUrl='/farm-yfi'
              apy={pool1APY}
              isRed={false}
            />
            <PoolCard
              stakingToken={Config.LinkToken}
              picture={Farm4Icon}
              poolUrl='/farm-link'
              apy={pool1APY}
              isRed={false}
            />
          </div>


          <div className='center-h text-small text-gray mt-100 mb-50'>
            Earn RED tokens by providing liquidity
          </div>
          <div className='center-h wp-100 mt-30 home-container'>
            <PoolCard
              stakingToken={Config.BlueLpToken}
              picture={Farm5Icon}
              poolUrl='/farm-bluelp'
              apy={pool1APY}
              isRed={true}
              isHigh />
            <PoolCard
              stakingToken={Config.YtslaToken}
              picture={Farm6Icon}
              poolUrl='/farm-ytsla'
              apy={pool1APY}
              isRed={true}
            />
          </div>
          <div className='center-h wp-100 mt-30 home-container'>
            <PoolCard
              stakingToken={Config.MemeToken}
              picture={Farm7Icon}
              poolUrl='/farm-meme'
              apy={pool1APY}
              isRed={true}
            />
            <PoolCard
              stakingToken={Config.CoreToken}
              picture={Farm8Icon}
              poolUrl='/farm-core'
              apy={pool1APY}
              isRed={true}
            />
          </div>
        </div>
        <div className='mb-100' />
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
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FarmComposition)
