import React from 'react';
import { VictoryPie } from 'victory';

const GameStats: React.FC = () => {
  return (
    <div className='flex-h'>
      <div className='game-graph center-v'>
        <div className='center-h'>
          <div className='text-center text-small op-50'>
            This is placeholder.
          </div>
        </div>
      </div>
      <div className='game-graph center-v'>
        <div className='center-h'>
          <div className='text-center text-small op-50'>
            This is placeholder.
          </div>
        </div>
      </div>
      <div className='game-graph center-v'>
        <div className='center-h'>
          <div className='text-center text-small op-50'>
            This is placeholder.
          </div>
        </div>
      </div>
      <div className='game-graph center-v'>
        <div className='center-h'>
          <VictoryPie
            data={[
              {x: 1, y: 50},
              {x: 2, y: 50}
            ]}
            labels={['Red', 'Blue']}
            labelRadius={50}
            style={{
              labels: {
                fill: 'white',
                fontSize: 20,
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default GameStats;
