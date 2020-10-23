import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Config from 'config';
import { RootState } from 'types';
import { numberWithDecimals } from 'utils';
import { coingeckoclient, web3client, dexclient } from 'lib';
import { selectAccount } from 'store/account/accountSelector';


interface StateFromProps {
	account: ReturnType<typeof selectAccount>;
}
interface DispatchFromProps {}
interface OwnProps {
	tokenPrice: number;
}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const Pool1Stats = ({ tokenPrice, account }: Props) => {
  const [token1Price, setToken1Price] = React.useState<number>(0);
  const [roiUnit, setRoiUnit] = React.useState<number>(0);
  const [rate, setRate] = React.useState<number>(0);
  const [totalStaked, setTotalStaked] = React.useState<number>(0);
  const [earned, setEarned] = React.useState<number>(0);
  const [staked, setStaked] = React.useState<number>(0);

  useEffect(() => {
    web3client.getTotalSupply(web3client.pool1Contract)
      .then(res => setTotalStaked(res));
    if (account) {
      web3client.getBalance(web3client.pool1Contract, account.address)
        .then(res => setStaked(res));
      web3client.poolGetEarned(web3client.pool1Contract, account.address)
        .then(res => setEarned(res));
    }
		dexclient.getBlueLpTokenPrice().then(res => setToken1Price(res));
  });
  useEffect(() => {
    if (token1Price > 0) {
      web3client.poolGetRewardRate(web3client.pool1Contract).then(res => {
        if (tokenPrice > 0) {
          const roi = res * tokenPrice / Math.pow(10, 18) / token1Price;
          setRoiUnit(roi);
        }
        setRate(res * staked / Math.pow(10, 36));
      });
    }
  }, [token1Price, tokenPrice, staked]);

  return (
    <React.Fragment>
      <h2 className='mb-20 text-medium text-center'>{Config.BlueLpToken.name} staking pool</h2>
	  	<div className='card card-h white'>
      	<div className='text-small mb-10'>PRICES <span className='ybullets'> • • • • • • • • • • • • • • • • • • • • • • • • • •</span></div>
	  		<div className='flex-h'>
      		<div className='text-tiny wp-50'>{`1 ${Config.BlueLpToken.symbol} =`}</div>
	  			<div className='text-tiny text-gray'> {`$ ${numberWithDecimals(token1Price, 0, 2)}`}</div>
	  		</div>
				<div className='flex-h'>
					<div className='text-tiny wp-50'>{`1 ${Config.BlueToken.symbol} = `}</div>
					<div className='text-tiny text-gray'> {`$ ${numberWithDecimals(tokenPrice, 0, 2)}`}</div>
				</div>
				<br/>
				<div className='text-small mb-10'>STAKING <span className='ybullets'> • • • • • • • • • • • • • • • • • • • • • • • • • •</span></div>	 
				<div className='flex-h'>
					<div className='text-tiny wp-50'>
						There are total &nbsp;
					</div>
					<div className='text-tiny text-gray'>
						{`${numberWithDecimals(totalStaked, Config.BlueLpToken.decimals, Config.Utils.decimals)} ${Config.BlueLpToken.symbol} staked in ${Config.BlueToken.symbol}'s ${Config.BlueLpToken.symbol} staking pool.`}
						<br/>
						{`= $ ${numberWithDecimals(totalStaked * token1Price, Config.BlueLpToken.decimals, 2)}`}
					</div>
				</div>
				<div className='flex-h'>
					<div className='text-tiny wp-50'>
						You are staking &nbsp;
					</div>
					<div className='text-tiny text-gray'>
						{`${numberWithDecimals(staked, Config.BlueLpToken.decimals, Config.Utils.decimals)} ${Config.BlueLpToken.symbol} (${(staked / totalStaked * 100).toFixed(2)}% of the pool)`}
						<br/>
						{`= $ ${numberWithDecimals(staked * token1Price, Config.BlueLpToken.decimals, 2)}`}
					</div>
				</div>
				<br/>
	  		<div className='text-small mb-10'>{Config.BlueToken.symbol} REWARDS <span className='ybullets'> • • • • • • • • • • • • • • • • • • •</span></div>
				<div className='flex-h'>
					<div className='text-tiny wp-50'>{`Claimable rewards`}</div>
					<div className='text-tiny text-gray'>
						{`${numberWithDecimals(earned, Config.BlueToken.decimals, Config.Utils.decimals)} ${Config.BlueToken.symbol} = $${numberWithDecimals(earned * tokenPrice, Config.BlueToken.decimals, 2)}`}
					</div>
				</div>
	      <div className='flex-h'>
          <div className='text-tiny wp-50'>{`Hourly estimate`}</div>
          <div className='text-tiny text-gray'>
            {`${numberWithDecimals(rate * 3600, 0, Config.Utils.decimals)} ${Config.BlueToken.symbol} = $${(rate * 3600 * tokenPrice).toFixed(2)}`}
          </div>
	      </div>	  
	      <div className='flex-h'>
          <div className='text-tiny wp-50'>{`Daily estimate`}</div>
          <div className='text-tiny text-gray'>
            {`${numberWithDecimals(rate * 3600 * 24, 0, Config.Utils.decimals)} ${Config.BlueToken.symbol} = $${(rate * 3600 * 24 * tokenPrice).toFixed(2)}`}
          </div>
	      </div>	  
	      <div className='flex-h'>
          <div className='text-tiny wp-50'>{`Weekly estimate`}</div>
          <div className='text-tiny text-gray'>
            {`${numberWithDecimals(rate * 3600 * 24 * 7, 0, Config.Utils.decimals)} ${Config.BlueToken.symbol} = $${(rate * 3600 * 24 * 7 * tokenPrice).toFixed(2)}`}
          </div>
	      </div>	  
				<br />
				<div className='flex-h'>
					<div className='text-tiny wp-50'>{`Hourly ROI in USD`}</div>
					<div className='text-tiny text-gray'> {`${numberWithDecimals(roiUnit * 3600 * 100, 0, 2)}%`}</div>
				</div>
				<div className='flex-h'>
					<div className='text-tiny wp-50'>{`Daily ROI in USD`}</div>
					<div className='text-tiny text-gray'> {`${numberWithDecimals(roiUnit * 86400 * 100, 0, 2)}%`}</div>
				</div>
				<div className='flex-h'>
					<div className='text-tiny wp-50'>{`Weekly ROI in USD`}</div>
					<div className='text-tiny text-gray'> {`${numberWithDecimals(roiUnit * 86400 * 7 * 100, 0, 2)}%`}</div>
				</div>
				<div className='flex-h'>
					<div className='text-tiny wp-50'>{`APY (unstable)`}</div>
					<div className='text-tiny text-gray'> {`${numberWithDecimals(roiUnit * 86400 * 365 * 100, 0, 2)}%`}</div>
				</div>
			</div>
    </React.Fragment>
  )
};

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
)(Pool1Stats);
