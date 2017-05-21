import axios from 'axios';
export const FETCH_STOCK_DATA='FETCH_STOCK_DATA';
export const REMOVE_STOCK_DATA='REMOVE_STOCK_DATA';
const proxy = 'https://cors-anywhere.herokuapp.com/';
import $ from 'jquery';

export function getStockData({ticker}){
  console.log(ticker);
  var request=axios.get(
    `${proxy}http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A3650%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22${ticker}%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D`
  )
  console.log(request);

  return{
    type:FETCH_STOCK_DATA,
    payload: request

  }
  }
  export function removeStockData({ticker}){
    console.log(ticker);


    return{
      type:REMOVE_STOCK_DATA,
      payload: ticker

    }
    }
