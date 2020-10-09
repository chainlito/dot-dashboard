import React from 'react';
import { Header, Container, Footer } from 'components';
import BackgroundImage from 'assets/img/background.png';
import Rule1Image from 'assets/img/rules/Rule1.png';
import Rule2Image from 'assets/img/rules/Rule2.png';
import Rule3Image from 'assets/img/rules/Rule3.png';

const RulesComposition: React.FC = () => {
  return (
    <React.Fragment>
    <img className='img-background' src={BackgroundImage} alt='background' />
      <Header />
      <Container>
        <div className='center-h text-large mt-50 mb-50'>Rules</div>
        <div className='rules-container'>
          <div className='flex-h mb-70'>
            <div className='wp-50 mr-120'>
              <div className='text-large text-red mb-20'>Rule №1</div>
              <div className='text-small text-gray'>
                Search engine optimization (SEO) is the process of growing the quality and quantity of website traffic by increasing the visibility of a website or a web page to users of a web search engine.[1] SEO refers to the improvement of unpaid results (known as "natural" or "organic" results) and excludes direct traffic and the purchase of paid placement. Additionally, it may target different kinds of searches, including image search, video search.
              </div>
            </div>
            <div className='wp-50'>
              <img src={Rule1Image} alt='rule1' />
            </div>
          </div>
          <div className='flex-h mb-70'>
            <div className='wp-50'>
              <img src={Rule2Image} alt='rule2' />
            </div>
            <div className='wp-50 ml-120'>
              <div className='text-large text-red mb-20'>Rule №2</div>
              <div className='text-small text-gray'>
                As an Internet marketing strategy, SEO considers how search engines work, the computer-programmed algorithms that dictate search engine behavior, what people search for, the actual search terms or keywords typed into search engines, and which search engines are preferred by their targeted audience. SEO is performed because a website will receive more visitors from a search engine when websites rank higher in the search engine results page (SERP). These visitors can then potentially be converted into customers.[4]
              </div>
            </div>
          </div>
          <div className='flex-h'>
            <div className='wp-50 mr-120'>
              <div className='text-large text-red mb-20'>Rule №3</div>
              <div className='text-small text-gray'>
                SEO differs from local search engine optimization in that the latter is focused on optimizing a business' online presence so that its web pages will be displayed by search engines when a user enters a local search for its products or services. The former instead is more focused on national or international searches.
              </div>
            </div>
            <div className='wp-50'>
              <img src={Rule3Image} alt='rule3' />
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default RulesComposition;
