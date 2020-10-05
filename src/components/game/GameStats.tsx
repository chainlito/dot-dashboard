import React from 'react';
import { VictoryPie } from 'victory';
import { RebaseHistory } from 'types';
import moment from 'moment';
import {
  TableContainer,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { numberWithDecimals } from 'utils';
import Config from 'config';

interface Props {
  redSupply: number;
  blueSupply: number;
  rebaseHistory: Array<RebaseHistory>;
}

const GameStats: React.FC<Props> = ({
  redSupply,
  blueSupply,
  rebaseHistory,
}: Props) => {
  return (
    <div className='flex-h'>
      <div className='game-history center-v'>
        {rebaseHistory && rebaseHistory.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Round</TableCell>
                  <TableCell>Round Time (UTC)</TableCell>
                  <TableCell>Rebase Percentage</TableCell>
                  <TableCell># of user modifications</TableCell>
                  <TableCell>Supply Red</TableCell>
                  <TableCell>Supply Blue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rebaseHistory.map((history, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                    <TableCell>{moment.unix(parseInt(history.timestamp)).format('YYYY/MM/DD HH:MM')}</TableCell>
                    <TableCell>{/*history.percent*/}-%</TableCell>
                    <TableCell>{history.boostCount}</TableCell>
                    <TableCell>{/*numberWithDecimals(history.redSupply, Config.RedToken.decimals, Config.Utils.decimals)*/}-</TableCell>
                    <TableCell>{/*numberWithDecimals(history.blueSupply, Config.BlueToken.decimals, Config.Utils.decimals)*/}-</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className='center-h'>
            <div className='text-center text-small op-50'>
              Loading...
            </div>
          </div>
        )}
      </div>
      <div className='game-graph center-v'>
        <div className='center-h'>
          <VictoryPie
            data={[
              {x: 1, y: (redSupply / (redSupply + blueSupply)) * 100, l: 'Red'},
              {x: 2, y: (blueSupply / (redSupply + blueSupply)) * 100, l: 'Blue'}
            ]}
            labels={({ datum }) => `${datum.l}: ${datum.y.toFixed(2)}%`}
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
