import React from 'react';
import { Button } from '@material-ui/core';

enum BOOST {
  REDUCE = -1,
  RAISE = 1,
  NOBOOST = 0,
};

interface Props {
  allowed: boolean;
  onApprove: () => void;
  boostUp: () => void;
  boostDown: () => void;
}

const GameBoost: React.FC<Props> = ({ allowed, onApprove, boostUp, boostDown }: Props) => {
  const [boost, setBoost] = React.useState<BOOST>(BOOST.NOBOOST);

  return (
    <div className='game-boost'>
      <div className='center-h text-medium mb-30'>Make Your Rate</div>
      <div className='flex-h center-h mb-20'>
        <div className={`game-boost__select${boost === BOOST.REDUCE ? ' selected' : ''}`} onClick={() => setBoost(BOOST.REDUCE)}>
          <div className='text-center text-medium mt-40'>- 1</div>
          <div className='text-center text-tiny op-50 mt-10'>Reduce the bid</div>
        </div>
        <div className={`game-boost__select${boost === BOOST.RAISE ? ' selected' : ''}`} onClick={() => setBoost(BOOST.RAISE)}>
          <div className='text-center text-medium mt-40'>+ 1</div>
          <div className='text-center text-tiny op-50 mt-10'>Raise the bid</div>
        </div>
      </div>
      <div className='mt-30 game-boost__rate'>Current rate is 0.1ETH</div>
      <div className='mt-10 game-boost__rate'>Next rate is 0.1ETH</div>
      {allowed ? (
        <Button
          variant='contained'
          className='btn-primary game-boost__pay mt-20'
          onClick={() => {
            if (boost === BOOST.REDUCE) boostDown();
            else if (boost === BOOST.RAISE) boostUp();
          }}
          disabled={boost === BOOST.NOBOOST}
        >
          Pay
        </Button>
      ) : (
        <Button
          variant='contained'
          className='btn-primary game-boost__pay mt-20'
          onClick={onApprove}
        >
          Approve
        </Button>
      )}
      
      <div className='mb-50' />
    </div>
  )
}

export default GameBoost;
