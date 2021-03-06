import React from 'react';
import { IconButton } from '@material-ui/core';

import ModifyImage from 'assets/img/buttons/Modify.png';
import RebaseImage from 'assets/img/buttons/Rebase.png';
import BoostDownImage from 'assets/img/buttons/BoostDown.png';
import BoostUpImage from 'assets/img/buttons/BoostUp.png';

enum BOOST {
  REDUCE = -1,
  RAISE = 1,
  NOBOOST = 0,
};

interface Props {
  boostRate: number;
  rebaseLag: number;
  rebaseEnabled: boolean;
  boostUp: () => void;
  boostDown: () => void;
  rebase: () => void;
}

const GameBoost: React.FC<Props> = ({ boostRate, rebaseLag, rebaseEnabled, boostUp, boostDown, rebase }: Props) => {
  const [boost, setBoost] = React.useState<BOOST>(BOOST.NOBOOST);

  const handleClickBoostUp = () => {
    if (rebaseLag >= 15) {
      alert('The Maximum Lag is 15');
    } else {
      setBoost(BOOST.RAISE);
    }
  }

  const handleClickBoostDown = () => {
    if (rebaseLag <= 5) {
      alert('The Minimum Lag is 5');
    } else {
      setBoost(BOOST.REDUCE);
    }
  }

  return (
    <div className='game-boost'>
      <div className='game-boost__updown mt-20 mb-20'>
        <IconButton onClick={handleClickBoostDown} disabled={boost === BOOST.REDUCE}>
          <img src={BoostDownImage} alt='BoostDown' />
        </IconButton>
        <IconButton onClick={handleClickBoostUp} disabled={boost === BOOST.RAISE}>
          <img src={BoostUpImage} alt='BoostDown' />
        </IconButton>
      </div>
      <div className='mt-30 text-small'>Current Lag = {rebaseLag}</div>
      <div className='text-small text-gray'>Min 5 ~ Max 15</div>
      
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

      <div className='mt-30 text-small'>Current rate = {(boostRate * 0.1).toFixed(1)}ETH</div>
      <div className='text-small text-gray'>Next rate = {((boostRate + 1) * 0.1).toFixed(1)}ETH</div>
      <IconButton
        className='mt-20'
        onClick={() => rebase()}
        disabled={!rebaseEnabled}
      >
        <img src={RebaseImage} alt='rebase' />
      </IconButton>
      
      <div className='mb-20' />
    </div>
  )
}

export default GameBoost;
