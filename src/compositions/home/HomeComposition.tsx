import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import Config from 'config';

import { Container, Header, Timer, ConnectWalletButton, Footer, TeamSelectButton } from 'components';
import { RootState } from 'types';
import { selectAccount } from 'store/account/accountSelector';
import { selectTotalSupply } from 'store/token/tokenSelector';
import { numberWithDecimals, getTimeLeft, inWindow } from 'utils';
import { tokenRebase } from 'store/token/tokenActions';
import { stockclient, coingeckoclient } from 'lib';
//import { web3client } from 'lib';

interface StateFromProps {
  account: ReturnType<typeof selectAccount>;
  totalSupply: ReturnType<typeof selectTotalSupply>;
}
interface DispatchFromProps {
  rebase: typeof tokenRebase;
}
interface OwnProps {}

type Props = StateFromProps & DispatchFromProps & OwnProps;

export const HomeComposition = ({ account, totalSupply, rebase }: Props) => {
  const [rebaseEnable, setRebaseEnable] = React.useState<boolean>(inWindow(Config.Token.rebase.offset, Config.Token.rebase.length));
  const [tokenPrice, setTokenPrice] = React.useState<number>(0);
  const [rebaseTokenPrice, setRebaseTokenPrice] = React.useState<number>(0);

  const renderTokenInfo = () => (
    <React.Fragment>
		  <div className='flex-h'>
      <Card className='card card-v transparent homeboxspace'>
        <CardContent className='boxsize'>
          <b>{numberWithDecimals(totalSupply, Config.Token.decimals, Config.Utils.decimals)}</b>
          <Typography className='greyme'>Total supply</Typography>
        </CardContent>
      </Card>
      <Card className='card card-v transparent'>
        <CardContent className='boxsize'>
          <b>{numberWithDecimals(( account ? account.balance : 0 ), Config.Token.decimals, Config.Utils.decimals)}</b>
          <Typography className='greyme'>{Config.Token.symbol} Balance</Typography>
        </CardContent>
      </Card>
	  </div>
    </React.Fragment>
  );

  /*if (!account) {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <div className='screen-center flex-v'>
            <ConnectWalletButton />
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    )
  }*/

  return (
    <React.Fragment>
      <Header />
	    <Container>
        <React.Fragment>
          <div className='mt-50' />
          <div className='center-h text-large'>The same The Dots game</div>
          <div className='center-h text-small'>only on your computer!</div>
          <div className='mb-50' />
        </React.Fragment>
        <React.Fragment>
          <div className='center-h text-small mb-20'>Choose the team you will pay for*</div>
          <div className='center-h'>
            <TeamSelectButton percent={34} />
            <TeamSelectButton percent={66} />
          </div>
          <div className='center-h text-small op-50 mt-20'>*You can rechoose the team in any time</div>
        </React.Fragment>
        <React.Fragment>
          <div className='text-large mt-30 mb-20'>SEO text</div>
          <div className='text-small op-75'>
            Search engine optimization (SEO) is the process of growing the quality and quantity of website traffic by increasing the visibility of a website or a web page to users of a web search engine.[1] SEO refers to the improvement of unpaid results (known as "natural" or "organic" results) and excludes direct traffic and the purchase of paid placement. Additionally, it may target different kinds of searches, including image search, video search, academic search,[2] news search, and industry-specific vertical search engines. Promoting a site to increase the number of backlinks, or inbound links, is another SEO tactic. By May 2015, mobile search had surpassed desktop search.[3]
            <br/><br/>
            As an Internet marketing strategy, SEO considers how search engines work, the computer-programmed algorithms that dictate search engine behavior, what people search for, the actual search terms or keywords typed into search engines, and which search engines are preferred by their targeted audience. SEO is performed because a website will receive more visitors from a search engine when websites rank higher in the search engine results page (SERP). These visitors can then potentially be converted into customers.[4]
            <br/><br/>
            SEO differs from local search engine optimization in that the latter is focused on optimizing a business' online presence so that its web pages will be displayed by search engines when a user enters a local search for its products or services. The former instead is more focused on national or international searches.
          </div>
        </React.Fragment>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

function mapStateToProps(
  state: RootState,
): StateFromProps {
  return {
    account: selectAccount(state),
    totalSupply: selectTotalSupply(state),
  };
}
function mapDispatchToProps(dispatch: Dispatch): DispatchFromProps {
  return {
    rebase: () => dispatch(tokenRebase()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComposition)
