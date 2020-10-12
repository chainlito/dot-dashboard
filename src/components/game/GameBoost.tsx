import React from 'react';
import { IconButton } from '@material-ui/core';

import ModifyImage from 'assets/img/buttons/Modify.png';
import RebaseImage from 'assets/img/buttons/Rebase.png';
import BoostDownImage from 'assets/img/buttons/BoostDown.png';
import BoostUpImage from 'assets/img/buttons/BoostUp.png';
import ProgressImage from 'assets/img/progress.png';

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
  rebase: () => void;
}

const GameBoost: React.FC<Props> = ({ boostRate, rebaseLag, boostUp, boostDown, rebase }: Props) => {
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
      <div className='text-medium mb-20'>Make Your Rate</div>
      <div className='text-small text-gray mb-50'>
        Use 5 points to strengthen your team or weaken the opposing team
      </div>
      <div className='flex-h center-h mb-20'>
        <IconButton onClick={handleClickBoostDown} disabled={boost === BOOST.REDUCE}>
          <img src={BoostDownImage} alt='BoostDown' />
        </IconButton>
        <div className='center-v'>
          <img src={ProgressImage} alt='progress' />
        </div>
        <IconButton onClick={handleClickBoostUp} disabled={boost === BOOST.RAISE}>
          <img src={BoostUpImage} alt='BoostDown' />
        </IconButton>
        {/*<div className={`game-boost__select${boost === BOOST.REDUCE ? ' selected' : ''}`} onClick={handleClickBoostDown}>
          <div className='text-center text-medium mt-40'>- 1</div>
          <div className='text-center text-tiny op-50 mt-10'>Reduce the bid</div>
        </div>
        <div className={`game-boost__select${boost === BOOST.RAISE ? ' selected' : ''}`} onClick={handleClickBoostUp}>
          <div className='text-center text-medium mt-40'>+ 1</div>
          <div className='text-center text-tiny op-50 mt-10'>Raise the bid</div>
        </div>*/}
      </div>
      <div className='mt-30 text-small'>Current rebase % is {rebaseLag}%</div>
      <div className='text-small text-gray'>Max rebase % is {15}%</div>
      <div className='text-small text-gray'>Min rebase % is {5}%</div>
      
      <IconButton
        className='mt-20'
        onClick={() => {
          if (boost === BOOST.REDUCE) boostDown();
          else if (boost === BOOST.RAISE) boostUp();
          setBoost(BOOST.NOBOOST);
        }}
        disabled={boost === BOOST.NOBOOST}
      >
        <img src={ModifyImage} alt='modify' />
      </IconButton>

      <div className='mt-30 text-small'>Current rate is {(boostRate * 0.1).toFixed(1)}ETH</div>
      <div className='text-small text-gray'>Next rate is {((boostRate + 1) * 0.1).toFixed(1)}ETH</div>
      <IconButton
        className='mt-20'
        onClick={() => rebase()}
      >
        <img src={RebaseImage} alt='rebase' />
      </IconButton>
      
      <div className='mb-50' />
    </div>
  )
}

export default GameBoost;
