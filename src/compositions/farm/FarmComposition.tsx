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
import { formatPrice } from 'utils';

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
  const [pool1TVL, setPool1TVL] = React.useState<number>(0);
  const [pool2TVL, setPool2TVL] = React.useState<number>(0);
  const [pool3TVL, setPool3TVL] = React.useState<number>(0);
  const [pool4TVL, setPool4TVL] = React.useState<number>(0);
  const [pool5TVL, setPool5TVL] = React.useState<number>(0);
  const [pool6TVL, setPool6TVL] = React.useState<number>(0);
  const [pool7TVL, setPool7TVL] = React.useState<number>(0);
  const [pool8TVL, setPool8TVL] = React.useState<number>(0);
  useEffect(() => {
    dexclient.getBlueTokenPrice().then(res => setBluePrice(res));
    dexclient.getRedTokenPrice().then(res => setRedPrice(res))
  });
  useEffect(() => {
    if (bluePrice > 0) {
      dexclient.getRedLpTokenPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool1Contract).then(res => {
          const roi = res * bluePrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
          setPool1APY(roi);
        });
        web3client.getTotalSupply(web3client.pool1Contract).then(amount => {
          setPool1TVL(price * amount / Math.pow(10, Config.RedLpToken.decimals));
        });
      });

      coingeckoclient.getUniPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool2Contract).then(res => {
          const roi = res * bluePrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
          setPool2APY(roi);
        });
        web3client.getTotalSupply(web3client.pool2Contract).then(amount => {
          setPool2TVL(price * amount / Math.pow(10, Config.UniToken.decimals));
        });
      })
      coingeckoclient.getYfiPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool3Contract).then(res => {
          const roi = res * bluePrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
          setPool3APY(roi);
        });
        web3client.getTotalSupply(web3client.pool3Contract).then(amount => {
          setPool3TVL(price * amount / Math.pow(10, Config.YfiToken.decimals));
        });
      });

      coingeckoclient.getLinkPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool4Contract).then(res => {
            const roi = res * bluePrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
            setPool4APY(roi);
        });
        web3client.getTotalSupply(web3client.pool4Contract).then(amount => {
          setPool4TVL(price * amount / Math.pow(10, Config.LinkToken.decimals));
        });
      });
    }

    if (redPrice > 0) {
      dexclient.getRedLpTokenPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool5Contract).then(res => {
          const roi = res * redPrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
          setPool5APY(roi);
        });
        web3client.getTotalSupply(web3client.pool5Contract).then(amount => {
          setPool5TVL(price * amount / Math.pow(10, Config.BlueLpToken.decimals));
        });
      });

      coingeckoclient.getYtslaPrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool6Contract).then(res => {
          const roi = res * redPrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
          setPool6APY(roi);
        });
        web3client.getTotalSupply(web3client.pool6Contract).then(amount => {
          setPool6TVL(price * amount / Math.pow(10, Config.YtslaToken.decimals));
        });
      })
      coingeckoclient.getMemePrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool7Contract).then(res => {
          const roi = res * redPrice / Math.pow(10, 28) / price * 86400 * 365 * 100;
          setPool7APY(roi);
        });
        web3client.getTotalSupply(web3client.pool7Contract).then(amount => {
          setPool7TVL(price * amount / Math.pow(10, Config.MemeToken.decimals));
        });
      });

      coingeckoclient.getCorePrice().then(price => {
        web3client.poolGetRewardRate(web3client.pool8Contract).then(res => {
            const roi = res * redPrice / Math.pow(10, 18) / price * 86400 * 365 * 100;
            setPool8APY(roi);
        });
        web3client.getTotalSupply(web3client.pool8Contract).then(amount => {
          setPool8TVL(price * amount / Math.pow(10, Config.CoreToken.decimals));
        });
      });
    }
  }, [redPrice, bluePrice]);

  const totalValueLocked = () => pool1TVL + pool2TVL + pool3TVL + pool4TVL + pool5TVL + pool6TVL + pool7TVL + pool8TVL;

  return (
    <React.Fragment>
      <img className='img-background' src={BackgroundImage} alt='background' />
      <Header />
      <Container>
        <div className='flex-v'>
          <div className='center-h mt-30'>
            <img src={Farm1Icon} width={150} alt='red' />
            <img src={Farm5Icon} width={150} alt='blue' />
          </div>
          <div className='center-h mt-30 mb-20'>
            <div className='center-v text-normal'>
              <span>Our Community Currently Has </span>&nbsp;&nbsp;
              <b className='text-medium text-green'>{formatPrice(totalValueLocked(), 2)}</b>&nbsp;&nbsp;
              <span>Of Total Value Locked</span>
            </div>
          </div>
          <div className='mb-20'>
            <div className='center-h text-small text-gray'>
              Stake your “Blue chip” tokens to Choose & Earn Blue
            </div>
          </div>
          <div className='center-h wp-100 mt-30 home-container'>
            <PoolCard
              stakingToken={Config.BlueLpToken}
              picture={Farm1Icon} poolUrl='/farm-bluelp'
              apy={pool1APY}
              isRed={false}
              isHigh />
            <PoolCard
              stakingToken={Config.UniToken}
              picture={Farm2Icon}
              poolUrl='/farm-uni'
              apy={pool2APY}
              isRed={false}
            />
          </div>
          <div className='center-h wp-100 mt-30 home-container'>
            <PoolCard
              stakingToken={Config.YfiToken}
              picture={Farm3Icon}
              poolUrl='/farm-yfi'
              apy={pool3APY}
              isRed={false}
            />
            <PoolCard
              stakingToken={Config.LinkToken}
              picture={Farm4Icon}
              poolUrl='/farm-link'
              apy={pool4APY}
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
              apy={pool5APY}
              isRed={true}
              isHigh />
            <PoolCard
              stakingToken={Config.YtslaToken}
              picture={Farm6Icon}
              poolUrl='/farm-ytsla'
              apy={pool6APY}
              isRed={true}
            />
          </div>
          <div className='center-h wp-100 mt-30 home-container'>
            <PoolCard
              stakingToken={Config.MemeToken}
              picture={Farm7Icon}
              poolUrl='/farm-meme'
              apy={pool7APY}
              isRed={true}
            />
            <PoolCard
              stakingToken={Config.CoreToken}
              picture={Farm8Icon}
              poolUrl='/farm-core'
              apy={pool8APY}
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
