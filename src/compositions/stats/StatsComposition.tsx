import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'types';
import { Header, Container, Footer } from 'components';

import Pool1Stats from './Pool1Stats';
import Pool2Stats from './Pool2Stats';
import Pool3Stats from './Pool3Stats';
import Pool4Stats from './Pool4Stats';
import Pool5Stats from './Pool5Stats';
import Pool6Stats from './Pool6Stats';
import Pool7Stats from './Pool7Stats';
import Pool8Stats from './Pool8Stats';
import { coingeckoclient } from 'lib';
import BackgroundImage from 'assets/img/background.png';


interface StateFromProps {}
interface DispatchFromProps {}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

const StatsComposition = () => {
  const [price, setPrice] = React.useState<number>(0);
  useEffect(() => {
    coingeckoclient.getYtslaPrice().then(res => setPrice(res));
  });

  return (
    <React.Fragment>
      <img className='img-background' src={BackgroundImage} alt='background' />
      <Header />
      <Container>
        <div className='screen-center flex-v mt-50 mb-100'>
          <div className='flex-h'>
            <div className='card halfcard mr-30'>
              <Pool1Stats tokenPrice={0} />
            </div>
            <div className='card halfcard mr-30'>
              <Pool5Stats tokenPrice={0} />
            </div>
          </div>
          <div className='flex-h mt-20'>
            <div className='card halfcard mr-30'>
              <Pool2Stats tokenPrice={0} />
            </div>
            <div className='card halfcard mr-30'>
              <Pool6Stats tokenPrice={0} />
            </div>
          </div>
          <div className='flex-h mt-20'>
            <div className='card halfcard mr-30'>
              <Pool3Stats tokenPrice={0} />
            </div>
            <div className='card halfcard mr-30'>
              <Pool7Stats tokenPrice={0} />
            </div>
          </div>
          <div className='flex-h mt-20'>
            <div className='card halfcard mr-30'>
              <Pool4Stats tokenPrice={0} />
            </div>
            <div className='card halfcard mr-30'>
              <Pool8Stats tokenPrice={0} />
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  )
};
//<div className='text-error'>The stats page is still being updated and will be ready within 48 hours. thank you for your patience</div>
function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsComposition);
