import React from 'react';
import { Button, Card, CardContent, Fab } from '@material-ui/core';
import Config from 'config';
import { numberWithDecimals } from 'utils';
import { StakeDialog, UnstakeDialog } from 'components';

interface OwnProps {
  stakeTokenInfo: any;
  rewardTokenInfo: any;
  allowed: boolean;
  started: boolean;
  staked: number;
  totalStaked: number;
  balance: number;
  rewardBalance: number;
  onApprove: () => void;
  onStake: (amount: number) => void;
  onUnstake: (amount: number) => void;
}

type Props = OwnProps;

export const StakeAsset = ({ totalStaked, staked, allowed, onApprove, onStake, onUnstake, balance, rewardBalance, stakeTokenInfo, rewardTokenInfo, started }: Props) => {
  const [stakeDialogOpen, setStakeDialogOpen] = React.useState<boolean>(false);
  const [unstakeDialogOpen, setUnstakeDialogOpen] = React.useState<boolean>(false);

  return (
    <Card className='card card-h medium transparent'>
      <CardContent>
        <div className='section'>
          <div className='center-h'>
            <h2>{stakeTokenInfo.name}</h2>
          </div>
          <div className='circle'>
            <img className="logo-image" src={stakeTokenInfo.image} alt={stakeTokenInfo.name} />
          </div>
          <div className='center-h mt-50'>
            <span className='text-number'>
              {numberWithDecimals(staked, stakeTokenInfo.decimals, Config.Utils.decimals)}
            </span>
          </div>
          <div className='center-h mb-30'>
            <span className='text-small'>{`${stakeTokenInfo.symbol} Staked`}</span>
          </div>
        </div>
        {!allowed ? (
          <React.Fragment>
            <div className='section'>
              <div className='mt-20' />
              <div className='center-h'>
                <Button
                  variant='contained'
                  className='btn-primary'
                  onClick={onApprove}
                >
                  {`Approve ${stakeTokenInfo.symbol}`}
                </Button>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className='section'>
            <div className='center-h mt-20'>
              <Fab className='btn-fab mr-20' disabled={staked <= 0} onClick={() => setUnstakeDialogOpen(true)}>-</Fab>
              <Fab className='btn-fab' disabled={!started} onClick={() => setStakeDialogOpen(true)}>+</Fab>
            </div>
          </div>
        )}
      </CardContent>

      <StakeDialog
        open={stakeDialogOpen}
        poolBalance={rewardBalance}
        stakeToken={stakeTokenInfo}
        rewardToken={rewardTokenInfo}
        totalStaked={totalStaked}
        userBalance={balance}
        dialogTitle={(
          <div className='center-v'>
            <img src={stakeTokenInfo.image} alt={stakeTokenInfo.name} width={35} />
            <span className="logo-text">{`Stake ${stakeTokenInfo.symbol}`}</span>
          </div>
        )}
        onStake={onStake}
        onClose={() => setStakeDialogOpen(false)}
      />
      <UnstakeDialog
        open={unstakeDialogOpen}
        stakeToken={stakeTokenInfo}
        totalStaked={totalStaked}
        staked={staked}
        userBalance={balance}
        dialogTitle={(
          <div className="center-v">
            <img className="logo-image" src={stakeTokenInfo.image} alt={stakeTokenInfo.name} />
            <span className="logo-text">{`Withdraw ${stakeTokenInfo.symbol}`}</span>
          </div>
        )}
        onUnstake={onUnstake}
        onClose={() => setUnstakeDialogOpen(false)}
      />
    </Card>
  )
}

export default StakeAsset;

