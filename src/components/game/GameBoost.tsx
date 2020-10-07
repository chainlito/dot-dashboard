import React from 'react';
import { Button } from '@material-ui/core';

enum BOOST {
  REDUCE = -1,
  RAISE = 1,
  NOBOOST = 0,
};

interface Props {
  boostRate: number;
  rebaseLag: number;
  boostUp: () => void;
  boostDown: () => void;
}

const GameBoost: React.FC<Props> = ({ boostRate, rebaseLag, boostUp, boostDown }: Props) => {
  const [boost, setBoost] = React.useState<BOOST>(BOOST.NOBOOST);

  const handleClickBoostUp = () => {
    console.log(rebaseLag);
    if (rebaseLag >= 15) {
      alert('Boost rate is over max.');
    } else {
      setBoost(BOOST.RAISE);
    }
  }

  const handleClickBoostDown = () => {
    if (rebaseLag <= 5) {
      alert('Boost rate is under min.');
    } else {
      setBoost(BOOST.REDUCE);
    }
  }

  return (
    <div className='game-boost'>
      <div className='center-h text-medium mb-30'>Make Your Rate</div>
      <div className='flex-h center-h mb-20'>
        <div className={`game-boost__select${boost === BOOST.REDUCE ? ' selected' : ''}`} onClick={handleClickBoostDown}>
          <div className='text-center text-medium mt-40'>- 1</div>
          <div className='text-center text-tiny op-50 mt-10'>Reduce the bid</div>
        </div>
        <div className={`game-boost__select${boost === BOOST.RAISE ? ' selected' : ''}`} onClick={handleClickBoostUp}>
          <div className='text-center text-medium mt-40'>+ 1</div>
          <div className='text-center text-tiny op-50 mt-10'>Raise the bid</div>
        </div>
      </div>
      <div className='mt-30 game-boost__rate'>Current rebase % is {rebaseLag}%</div>
      <div className='mt-10 game-boost__rate'>Max rebase % is 15%</div>
      <div className='mt-10 game-boost__rate'>Min rebase % is 5%</div>
      <div className='mt-20 game-boost__rate'>Current rate is {(boostRate * 0.1).toFixed(1)}ETH</div>
      <div className='mt-10 game-boost__rate'>Next rate is {((boostRate + 1) * 0.1).toFixed(1)}ETH</div>
      
      <Button
        variant='contained'
        className='btn-primary game-boost__pay mt-20'
        onClick={() => {
          if (boost === BOOST.REDUCE) boostDown();
          else if (boost === BOOST.RAISE) boostUp();
          setBoost(BOOST.NOBOOST);
        }}
        disabled={boost === BOOST.NOBOOST}
      >
        Pay
      </Button>
      
      <div className='mb-50' />
    </div>
  )
}

export default GameBoost;
