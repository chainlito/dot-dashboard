import React from 'react';
import { Card, CardContent, Button } from '@material-ui/core';
import Config from 'config';
import { numberWithDecimals } from 'utils';

interface OwnProps {
  rewardToken: any;
  earned: number;
  percent: number;
  onHarvest: () => void;
}

type Props = OwnProps;

export const RewardAsset = ({ earned, onHarvest, percent, rewardToken }: Props) => {
  return (
    <Card className='card card-h medium transparent'>
      <CardContent>
        <div className='section'>
          <div className='center-h'>
            <h2>{rewardToken.name}</h2>
          </div>
          <div className='circle'>
            <img className="logo-image" src={rewardToken.image} alt={rewardToken.name} />
          </div>
          <div className='center-h'>
            <span className='text-tiny text-gray'>{`Low estimated ${rewardToken.symbol} earned`}</span>
          </div>
          <div className='center-h mb-10'>
            <span className='text-number'>
              {numberWithDecimals(earned * (1 - percent), rewardToken.decimals, Config.Utils.decimals)}
            </span>
          </div>
          <div className='center-h'>
            <span className='text-tiny text-gray'>{`High estimated ${rewardToken.symbol} earned`}</span>
          </div>
          <div className='center-h'>
            <span className='text-number'>
              {numberWithDecimals(earned * (1 + percent), rewardToken.decimals, Config.Utils.decimals)}
            </span>
          </div>
        </div>
        <div className='section'>
          <div className='mt-20' />
          <div className='center-h'>
            <Button
              variant='contained'
              className='btn-primary'
              onClick={onHarvest}
              disabled={earned <= 0}
            >
              Harvest
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RewardAsset;

