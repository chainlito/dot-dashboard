import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
interface OwnProps {
  percent: number;
}
type Props = OwnProps & RouteComponentProps;

const TeamSelectButton: React.FC<Props> = ({ percent, history }: Props) => {

  return (
    <div className='team-button' onClick={() => history.push('/game')}>
      <div className='team-button__text'>{percent}%</div>
      <div className='team-button__percent' style={{ height: `${percent}%` }}></div>
    </div>
  )
}


export default withRouter(TeamSelectButton);
