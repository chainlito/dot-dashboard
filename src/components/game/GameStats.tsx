import React from 'react';
import { VictoryPie } from 'victory';

interface Props {
  redSupply: number;
  blueSupply: number;
}

const GameStats: React.FC<Props> = ({
  redSupply,
  blueSupply,
}: Props) => {
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
              {x: 1, y: (redSupply / (redSupply + blueSupply)) * 100, l: 'Red'},
              {x: 2, y: (blueSupply / (redSupply + blueSupply)) * 100, l: 'Blue'}
            ]}
            labels={({ datum }) => `${datum.l}: ${datum.y}%`}
            labelRadius={30}
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
