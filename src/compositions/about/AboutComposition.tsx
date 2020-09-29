import React from 'react';
import { Header, Container, Footer } from 'components';
import AboutBackgrounImage from 'assets/img/about.png';

const AboutComposition: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <br/>
        <div className='center-h text-large mt-50 mb-50'>About Game</div>
        <div className='text-small op-75 mb-30'>Search engine optimization (SEO) is the process of growing the quality and quantity of website traffic by increasing the visibility of a website or a web page to users of a web search engine.[1] SEO refers to the improvement of unpaid results (known as "natural" or "organic" results) and excludes direct traffic and the purchase of paid placement. Additionally, it may target different kinds of searches, including image search, video search, academic search,[2] news search, and industry-specific vertical search engines. Promoting a site to increase the number of backlinks, or inbound links, is another SEO tactic. By May 2015, mobile search had surpassed desktop search.[3]<br/></div>
        <div className='center-h'><img src={AboutBackgrounImage} alt='about' /></div>
        <div className='text-small op-75 mt-30'>
          As an Internet marketing strategy, SEO considers how search engines work, the computer-programmed algorithms that dictate search engine behavior, what people search for, the actual search terms or keywords typed into search engines, and which search engines are preferred by their targeted audience. SEO is performed because a website will receive more visitors from a search engine when websites rank higher in the search engine results page (SERP). These visitors can then potentially be converted into customers.[4]
          <br/><br/>
          SEO differs from local search engine optimization in that the latter is focused on optimizing a business' online presence so that its web pages will be displayed by search engines when a user enters a local search for its products or services. The former instead is more focused on national or international searches.
        </div>
        <div className='mb-50' />
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default AboutComposition;
