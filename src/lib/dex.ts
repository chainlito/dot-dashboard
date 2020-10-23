import axios from 'axios';
import Config from 'config';
import web3client from './web3client';
import coingecko from './coingecko';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaXNzIjoiZGV4dG9vbHMuaW8iLCJzdWIiOiJhbnlvbmUiLCJyZWYiOiI1MC43LjE1OS4zNCIsImlhdCI6MTU5OTQ5MjEzMH0.VKcBB6v3pspBu4QMzQIk5nV5MGZHoAKDG4Hhkv5dC1E';
const API_URL = 'https://www.dextools.io/api';
const PROXY = 'https://cors-anywhere.herokuapp.com/'


const getEthPrice = async () => {
  const response = await axios({
    method: 'GET',
    url: `${PROXY}${API_URL}/common/ethPrice`,
    headers: {
      authorization: `Bearer ${API_KEY}`
    }
  });
  if (response.data.message !== 'OK') return 0;
  return response.data.result.ethusd;
}

const getRedTokenPrice = async () => {
  const redSupply = await web3client.getBalance(web3client.redTokenContract, Config.RedLpToken.address);
  const wethBalance = await web3client.getBalance(web3client.wethTokenContract, Config.RedLpToken.address);
  const ethPrice = await coingecko.getEthPrice();
  return ethPrice * wethBalance / redSupply;
};

const getBlueTokenPrice = async () => {
  const blueSupply = await web3client.getBalance(web3client.blueTokenContract, Config.BlueLpToken.address);
  const wethBalance = await web3client.getBalance(web3client.wethTokenContract, Config.BlueLpToken.address);
  const ethPrice = await coingecko.getEthPrice();
  return ethPrice * wethBalance / blueSupply;
};

const getRedLpTokenPrice = async () => {
  const totalSupply = await web3client.getTotalSupply(web3client.redLpTokenContract);
  const wethBalance = await web3client.getBalance(web3client.wethTokenContract, Config.RedLpToken.address);
  const ethPrice = await coingecko.getEthPrice();
  return 2 * ethPrice * wethBalance / totalSupply;
}

const getBlueLpTokenPrice = async () => {
  const totalSupply = await web3client.getTotalSupply(web3client.blueLpTokenContract);
  const wethBalance = await web3client.getBalance(web3client.wethTokenContract, Config.BlueLpToken.address);
  const ethPrice = await coingecko.getEthPrice();
  return 2 * ethPrice * wethBalance / totalSupply;
}

export default {
  getRedTokenPrice,
  getBlueTokenPrice,
  getEthPrice,
  getRedLpTokenPrice,
  getBlueLpTokenPrice,
};
