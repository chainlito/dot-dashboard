import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Config from 'config';

import { Container, Header, Footer } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
import PoolCard from './PoolCard';
import BackgroundImage from 'assets/img/background.png';

import Farm1Icon from 'assets/img/token-blue.png';
import Farm2Icon from 'assets/img/token-uni.png';
import Farm3Icon from 'assets/img/token-yfi.png';
import Farm4Icon from 'assets/img/token-link.png';
import Farm5Icon from 'assets/img/token-red.png';
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
  const [bluePrice, setBluePrice] = React.useState<number>(0);
  const [pool1APY, setPool1APY] = React.useState<number>(0);
  const [pool2APY, setPool2APY] = React.useState<number>(0);
  const [pool3APY, setPool3APY] = React.useState<number>(0);
  const [pool4APY, setPool4APY] = React.useState<number>(0);
  const [pool5APY, setPool5APY] = React.useState<number>(0);
  const [pool6APY, setPool6APY] = React.useState<number>(0);
  const [pool7APY, setPool7APY] = React.useState<number>(0);
  const [pool8APY, setPool8APY] = React.useState<number>(0);
  useEffect(() => {
    
  });
  useEffect(() => {
    if (bluePrice > 0) {
      dexclient.getRedLpTokenPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool1Contract).then(res => {
          const roi = res * bluePrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
          setPool1APY(roi);
        });
      });

      coingeckoclient.getUniPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool2Contract).then(res => {
          const roi = res * bluePrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
          setPool2APY(roi);
        });
      })
      coingeckoclient.getYfiPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool3Contract).then(res => {
          const roi = res * bluePrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
          setPool3APY(roi);
        });
      });

      coingeckoclient.getLinkPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool4Contract).then(res => {
            const roi = res * bluePrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
            setPool4APY(roi);
        });
      });
    }

    if (redPrice > 0) {
      dexclient.getRedLpTokenPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool5Contract).then(res => {
          const roi = res * redPrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
          setPool5APY(roi);
        });
      });

      coingeckoclient.getYtslaPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool6Contract).then(res => {
          const roi = res * redPrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
          setPool6APY(roi);
        });
      })
      coingeckoclient.getMemePrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool7Contract).then(res => {
          const roi = res * redPrice / Math.pow(10, 28) / price * 86400 * 365 * 100;
          setPool7APY(roi);
        });
      });

      coingeckoclient.getCorePrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool8Contract).then(res => {
            const roi = res * redPrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
            setPool8APY(roi);
        });
      });
    }
  }, [redPrice, bluePrice]);

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
              Stake your “Blue chip” tokens to Choose & Earn Blue
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


          <div className='center-h text-small text-gray mt-100'>
            Stake your “Red Hot” tokens to Choose & Earn Red
          </div>
          <div className='center-h wp-100 mt-50 home-container'>
            <PoolCard
              stakingToken={Config.RedLpToken}
              picture={Farm5Icon}
              poolUrl='/farm-redlp'
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
