import React from 'react';
import Config from 'config';
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

interface Props {
  redSupply: number;
  blueSupply: number;
  rebaseHistory: Array<RebaseHistory>;
}

const GameHistory: React.FC<Props> = ({
  redSupply,
  blueSupply,
  rebaseHistory,
}: Props) => {
  return (
    <div className='flex-h'>
      {rebaseHistory && rebaseHistory.length > 0 ? (
        <TableContainer component={Paper} className='game-history'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Round</TableCell>
                <TableCell>Round Time (UTC)</TableCell>
                <TableCell>Rebase Percentage</TableCell>
                <TableCell># of user modifications</TableCell>
                <TableCell>Supply Red</TableCell>
                <TableCell>Supply Blue</TableCell>
                <TableCell>Price Red</TableCell>
                <TableCell>Price Blue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rebaseHistory.map((history, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">{index + 1}</TableCell>
                  <TableCell>{moment(history.date).format('YYYY/MM/DD HH:MM')}</TableCell>
                  <TableCell>{history.percentage}%</TableCell>
                  <TableCell>{history.boost_count}</TableCell>
                  <TableCell>{numberWithDecimals(history.supply_red, Config.RedToken.decimals, Config.Utils.decimals)}</TableCell>
                  <TableCell>{numberWithDecimals(history.supply_blue, Config.BlueToken.decimals, Config.Utils.decimals)}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className='game-hisotry'>
          <div className='center-h'>
            <div className='text-center text-small op-50'>
              Loading...
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameHistory;
