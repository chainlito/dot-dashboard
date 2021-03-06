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
  TableFooter,
  TablePagination,
  Paper,
} from '@material-ui/core';

import { numberWithDecimals } from 'utils';
import { ethscanclient } from 'lib';

interface Props {
  redSupply: number;
  blueSupply: number;
  rebaseHistory: Array<RebaseHistory>;
}

const GameHistory: React.FC<Props> = ({
  rebaseHistory,
}: Props) => {
  const [page, setPage] = React.useState<number>(0);
  const [rows, setRows] = React.useState<Array<RebaseHistory>>([]);

  React.useEffect(() => {
    const _rows = rebaseHistory.sort((a, b) => { return moment(b.date).unix() -  moment(a.date).unix() });
    ethscanclient.getTransactionsList('0x97aeF1C61940231A677f93d30D3bDFD02Cd7F151').then(txList => {
      let boostCount = 0;
  
      for (let i = 1; i < txList.length; i ++) {
        if (txList[i].input === '0xaf14052c') break;
        if (txList[i].input === '0x42fceaba' || txList[i].input === '0x496fcd3e') boostCount ++;
      }
      console.log(boostCount);
    });
    setRows(_rows);
  }, [rebaseHistory]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);

  return (
    <div className='flex-h'>
      {rebaseHistory  ? (
        <TableContainer component={Paper} className='game-history'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Round</TableCell>
                <TableCell>Round Time (UTC)</TableCell>
                <TableCell>Rebase Percentage</TableCell>
                <TableCell>Lag</TableCell>
                <TableCell># of user modifications</TableCell>
                <TableCell>Supply Red</TableCell>
                <TableCell>Supply Blue</TableCell>
                <TableCell>Price Red</TableCell>
                <TableCell>Price Blue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * 10, (page + 1) * 10).map((history, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">{history._id}</TableCell>
                  <TableCell>{moment(history.date).format('YYYY/MM/DD HH:mm')}</TableCell>
                  <TableCell>{(history.rebase_rate * 100).toFixed(2)}%</TableCell>
                  <TableCell>{history.percentage}</TableCell>
                  <TableCell>{history.boost_count}</TableCell>
                  <TableCell>{numberWithDecimals(history.supply_red, Config.RedToken.decimals, Config.Utils.decimals)}</TableCell>
                  <TableCell>{numberWithDecimals(history.supply_blue, Config.BlueToken.decimals, Config.Utils.decimals)}</TableCell>
                  <TableCell>$ {history.price_red.toFixed(3)}</TableCell>
                  <TableCell>$ {history.price_blue.toFixed(3)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  rowsPerPage={10}
                  page={page}
                  count={rebaseHistory.length}
                  onChangePage={handleChangePage}
                />
              </TableRow>
            </TableFooter>
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
