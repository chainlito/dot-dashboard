import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'types';

import Config from 'config';
import { web3client } from 'lib';
import {
  poolSetPoolInfo,
  poolSetContract,
  poolSetStakeTokenInfo,
  poolSetStakeTokenContract,
  poolLoadAllowance,
  poolGetPeriodFinish,
  poolSetRewardTokenInfo,
  poolSetRewardTokenContract,
} from 'store/pool/poolActions';
import PoolComposition from './PoolComposition';

interface StateFromProps {}
interface DispatchFromProps {
  setPoolInfo: typeof poolSetPoolInfo;
  setStakeTokenInfo: typeof poolSetStakeTokenInfo;
  setPoolContract: typeof poolSetContract;
  setStakeTokneContract: typeof poolSetStakeTokenContract;
  setRewardTokenInfo: typeof poolSetRewardTokenInfo;
  setRewardTokenContract: typeof poolSetRewardTokenContract;
  loadAllowance: typeof poolLoadAllowance;
  loadPeriodFinish: typeof poolGetPeriodFinish;
}

type Props = StateFromProps & DispatchFromProps;

const Pool8Composition: React.FC<Props> = ({
  setPoolInfo,
  setStakeTokenInfo,
  setPoolContract,
  setStakeTokneContract,
  setRewardTokenInfo,
  setRewardTokenContract,
  loadAllowance,
  loadPeriodFinish,
}) => {

  useEffect(() => {
    setPoolInfo(Config.Pool8);
    setStakeTokenInfo(Config.CoreToken);
    setPoolContract(web3client.pool8Contract);
    setStakeTokneContract(web3client.coreTokenContract);
    setRewardTokenInfo(Config.RedToken);
    setRewardTokenContract(web3client.redTokenContract);
    loadAllowance();
    loadPeriodFinish();
  });

  return (
    <PoolComposition />
  )
};

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    loadAllowance: () => dispatch(poolLoadAllowance()),
    loadPeriodFinish: () => dispatch(poolGetPeriodFinish()),
    setPoolInfo: (payload: any) => dispatch(poolSetPoolInfo(payload)),
    setStakeTokenInfo: (payload: any) => dispatch(poolSetStakeTokenInfo(payload)),
    setPoolContract: (payload: any) => dispatch(poolSetContract(payload)),
    setStakeTokneContract: (payload: any) => dispatch(poolSetStakeTokenContract(payload)),
    setRewardTokenInfo: (payload: any) => dispatch(poolSetRewardTokenInfo(payload)),
    setRewardTokenContract: (payload: any) => dispatch(poolSetRewardTokenContract(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pool8Composition);
