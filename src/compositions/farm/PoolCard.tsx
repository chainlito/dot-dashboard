import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Card, CardContent } from '@material-ui/core';
import Config from 'config';

interface OwnProps {
  stakingToken: any;
  picture: string;
  poolUrl: string;
  apy: number;
  isHigh?: boolean;
  isRed: boolean;
}

type Props = OwnProps & RouteComponentProps;

const PoolCard: React.FC<Props> = ({ stakingToken, picture, poolUrl, apy, history, isHigh = false, isRed }: Props) => {
  return (
    <Card className={`card card-h medium${isRed ? ' red' : ' blue'} transparent`}>
      <CardContent>
        {isHigh ? (
          <div className='badge'>4X</div>
        ) : null}
        <div className='section'>
          <div className='circle'>
            <img className="logo-image" src={picture} alt='icon' />
          </div>
          <div className='center-h'>
            <h2 className='mt-10 mb-10'>{`${stakingToken.name} Farm`}</h2>
          </div>
          <div className='center-h'>
            <span className='text-small'>{`Deposit ${stakingToken.symbol}`}</span>
          </div>
          <div className='center-h mb-20'>
            <span className='text-small'>{`Earn ${isRed ? Config.RedToken.symbol : Config.BlueToken.symbol}`}</span>
          </div>
          <div className='center-h'>
            {apy ? (
              <span className='text-error'>{`${apy.toFixed(2)}% APY`}</span>
            ) : (
              <span className='text-small text-gray'>Loading...</span>
            )}
          </div>
        </div>
        <div className='section'>
          <div className='mt-20' />
          <div className='center-h'>
            <Button variant='contained' className='btn-primary' onClick={() => history.push(poolUrl)}>Select</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
};

export default withRouter(PoolCard);
