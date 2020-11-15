import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'types';
import { Button } from '@material-ui/core';

import { Container, Header, Footer, ConnectWalletButton, RewardAsset, StakeAsset } from 'components';
import {
  poolStake,
  poolWithdraw,
  poolApproveToken,
  poolHarvest,
  poolExit,
  poolGetStaked,
  poolGetEarned,
} from 'store/pool/poolActions';
import {
  selectPoolStaked,
  selectPoolEarned,
  selectPoolStakeAllowed,
  selectStakeTokenBalance,
  selectPoolTotalStaked,
  selectPoolPeriodFinish,
  selectPoolStakeTokenInfo,
  selectPoolInfo,
  selectPoolRewardTokenInfo
} from 'store/pool/poolSelector';
import { selectAccount } from 'store/account/accountSelector';
import { getDateLeft, secondsToDays, secondsToHours, secondsToMinutes, secondsToSeconds } from 'utils';
import BackgroundImage from 'assets/img/background.png';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  staked: ReturnType<typeof selectPoolStaked>;
  earned: ReturnType<typeof selectPoolEarned>;
  allowed: ReturnType<typeof selectPoolStakeAllowed>;
  totalStaked: ReturnType<typeof selectPoolTotalStaked>
  stakeTokenBalance: ReturnType<typeof selectStakeTokenBalance>;
  deadline: ReturnType<typeof selectPoolPeriodFinish>;
  stakeTokenInfo: ReturnType<typeof selectPoolStakeTokenInfo>;
  rewardTokenInfo: ReturnType<typeof selectPoolRewardTokenInfo>;
  poolInfo: ReturnType<typeof selectPoolInfo>;
}
interface DispatchFromProps {
  stake: typeof poolStake;
  unstake: typeof poolWithdraw;
  approve: typeof poolApproveToken;
  harvest: typeof poolHarvest;
  exit: typeof poolExit;
  loadStaked: typeof poolGetStaked;
  loadEarned: typeof poolGetEarned;
}

type Props = StateFromProps & DispatchFromProps;

const PoolComposition: React.FC<Props> = ({
  account,
  allowed,
  staked,
  totalStaked,
  stakeTokenBalance,
  deadline,
  approve,
  stake,
  unstake,
  earned,
  harvest,
  exit,
  loadEarned,
  loadStaked,
  stakeTokenInfo,
  rewardTokenInfo,
  poolInfo,
}) => {
  const [timeLeft, setTimeLeft] = React.useState<number>(0);
  const [estimatePercent, setEstimatePercent] = React.useState<number>(0);

  useEffect(() => setTimeLeft(getDateLeft(deadline)), [deadline]);
  useEffect(() => {
    const timeInterval = setInterval(() => setTimeLeft(getDateLeft(deadline)), 1000);
    return () => clearInterval(timeInterval);
  });
  useEffect(() => {
    loadEarned(); loadStaked();
    const timeInterval = setInterval(() => { loadEarned(); loadStaked(); }, 60000);
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

  if (!stakeTokenInfo) return <></>;

  return (
    <React.Fragment>
      <img className='img-background fit' src={BackgroundImage} alt='background' />
      <Header />
      <Container>
        <div className='flex-v screen-center'>
          <div className='mb-20'>
            <div className='center-h text-medium mb-10'>
              {`Deposit ${stakeTokenInfo.symbol} and earn ${rewardTokenInfo.symbol}`}
            </div>
            <div className={`center-h text-small text-gray`}>
              {`farm is now closed,  please withdraw your stake`}
            </div>
          </div>
          <div className='center-h wp-100 mt-30 home-container'>
            <RewardAsset
              rewardToken={rewardTokenInfo}
              earned={0}
              started={timeLeft > 0}
              percent={1}
              onHarvest={harvest}
            />
            <StakeAsset
              stakeTokenInfo={stakeTokenInfo}
              rewardTokenInfo={rewardTokenInfo}
              allowed={allowed}
              started={timeLeft > 0}
              staked={staked}
              totalStaked={totalStaked}
              balance={stakeTokenBalance}
              rewardBalance={poolInfo.balance}
              onApprove={approve}
              onStake={(amount: number) => stake(amount)}
              onUnstake={unstake}
            />
          </div>
          <div className='center-h mt-20 mb-30'>
            <Button
              variant='contained'
              className='btn-primary exit'
              disabled={staked <= 0}
              onClick={exit}
            >
              Harvest & Withdraw
            </Button>
          </div>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  )
};

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    account: selectAccount(state),
    totalStaked: selectPoolTotalStaked(state),
    staked: selectPoolStaked(state),
    allowed: selectPoolStakeAllowed(state),
    earned: selectPoolEarned(state),
    stakeTokenBalance: selectStakeTokenBalance(state),
    deadline: selectPoolPeriodFinish(state),
    stakeTokenInfo: selectPoolStakeTokenInfo(state),
    rewardTokenInfo: selectPoolRewardTokenInfo(state),
    poolInfo: selectPoolInfo(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    stake: (payload: number) => dispatch(poolStake(payload)),
    unstake: (payload: number) => dispatch(poolWithdraw(payload)),
    approve: () => dispatch(poolApproveToken()),
    harvest: () => dispatch(poolHarvest()),
    exit: () => dispatch(poolExit()),
    loadEarned: () => dispatch(poolGetEarned()),
    loadStaked: () => dispatch(poolGetStaked()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PoolComposition);
